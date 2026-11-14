# ipartnyor

Лёгкий веб-сервис на FastAPI — агрегатор-клиент над существующими сервисами парсинга и RAG,
плюс приём готовых JSON от n8n, поворот PDF и выгрузка счетов в Excel.

| Сервис | Назначение | Что используется |
|---|---|---|
| **Retrieval_Vector_RZD** (`RETRIEVAL_BASE_URL`, по умолчанию `http://10.10.250.35:7861`) | RAG-ассистент | `POST /api/search`, заголовок `X-API-Key` |
| **RST_S4ETA_Python** (`RST_BASE_URL`, по умолчанию `http://localhost:5000`) | Обработка счетов | `POST /process` (multipart, поле `pdf` или `image`) |
| **rotation-Tesseract** (`ROTATOR_BASE_URL`, по умолчанию `http://localhost:8866`) | Поворот PDF | `POST /rotate` (multipart, поле `pdf_file`) |
| **n8n** (внешний) | Парсинг PDF из IMAP → JSON | `POST /api/table/ingest` (заголовок `X-Ingest-Token`) |

Своей LLM/OCR/RAG-логики в ipartnyor нет: только прокси, пользователи, заметки, кэш счетов в SQLite,
приём JSON от n8n, поворот PDF и выгрузка в Excel.

## Запуск

```bash
python -m venv .venv
.venv\Scripts\activate          # Windows  (Linux/macOS: source .venv/bin/activate)
pip install -r requirements.txt
cp .env.example .env            # и заполнить значения
uvicorn main:app --reload
UI: http://127.0.0.1:8000/

Swagger (/docs): http://127.0.0.1:8000/docs

OpenAPI (/openapi.json): http://127.0.0.1:8000/openapi.json

Health: http://127.0.0.1:8000/health

Запуск через Docker
bash
cp .env.example .env            # заполнить значения
docker compose up -d --build
curl http://127.0.0.1:8000/health
Файл .env должен лежать на хосте рядом с docker-compose.yml. В образ он не копируется (исключён в
.dockerignore), а передаётся контейнеру при запуске через env_file: .env.

DATABASE_URL внутри контейнера задаётся в docker-compose.yml (sqlite:////app/data/ipartnyor.db, четыре
слэша — абсолютный путь) и перекрывает значение из .env. Каталог /app/data смонтирован в ./data, поэтому
база хранится на хосте в ./data/ipartnyor.db и переживает пересборку контейнера.

Внутри контейнера localhost — это сам контейнер. Если Retrieval_Vector_RZD, RST_S4ETA_Python или
rotation-Tesseract запущены на том же хосте, укажите в .env http://host.docker.internal:<порт> вместо
http://localhost:<порт>. Если они в одной Docker-сети (например, ml_network), используйте имена контейнеров:
http://retrieval_vector_rzd:7861, http://s4eta-python-ipartnyor:5000, http://rotation-Tesseract:8866.

Логи: docker compose logs -f, остановка: docker compose down.

Безопасность. Порт привязан к 127.0.0.1 (127.0.0.1:8000:8000), поэтому снаружи приложение недоступно —
только с самого хоста. Для доступа из интернета поставьте перед ним обратный прокси (Nginx/Caddy) с HTTPS.
Это сделано намеренно, чтобы API-ключи и база не были открыты наружу.

Переменные окружения (.env)
Переменная	Описание
RETRIEVAL_BASE_URL	Базовый URL Retrieval_Vector_RZD (API на порту 7861)
RETRIEVAL_API_KEY	Ключ для заголовка X-API-Key. Обязателен — RAG проверяет его, иначе 401
RETRIEVAL_PROJECT_NAME	project_name для /api/search (по умолчанию documents_RZD)
RST_BASE_URL	Базовый URL RST_S4ETA_Python
ROTATOR_BASE_URL	Базовый URL rotation-Tesseract (по умолчанию http://localhost:8866)
INGEST_TOKEN	Секрет для заголовка X-Ingest-Token при приёме JSON от n8n. Если пуст — /api/table/ingest всегда отвечает 401
JWT_SECRET	Секрет подписи JWT — обязательно сменить
JWT_EXPIRE_MINUTES	Время жизни токена (по умолчанию 720)
DATABASE_URL	sqlite:///./ipartnyor.db
HTTP_TIMEOUT	Таймаут запросов к внешним сервисам, сек (по умолчанию 120; для LLM-ответов может понадобиться 180–300)
Внешние зависимости
Retrieval_Vector_RZD — нужен для вкладки «Чат». API на порту 7861 (Gradio UI — на 7860, не используется).
Требует заголовок X-API-Key; ключ хранится в .env RAG (API_KEY=...).

RST_S4ETA_Python — нужен только для загрузки файлов во вкладке «Таблица» (кнопка «Обработать файл»).
Без него таблица и выгрузка в Excel работают по уже сохранённым данным.

rotation-Tesseract — нужен для вкладки «PDF Fixer» (кнопка «Исправить PDF»). Принимает PDF, возвращает
повёрнутый PDF + заголовки X-Rotation-Angle, X-Rotation-Confidence.

n8n (или любой другой клиент) может присылать готовые JSON счетов на POST /api/table/ingest
с заголовком X-Ingest-Token. Это основной путь наполнения таблицы в демо-режиме.

Цепочки вызовов
Сценарий	Контейнеры	Внешние
Чат (RAG по РЖД)	ipartnyor → retrieval_vector_rzd → qdrant + embedding-service	DeepSeek API (LLM)
Таблица (счета от n8n)	n8n → ipartnyor (ingest) → SQLite	IMAP (почта)
Ручная загрузка PDF	ipartnyor → s4eta	—
PDF Fixer (поворот)	ipartnyor → rotation-Tesseract	—
API
Все эндпоинты, кроме /api/register, /api/login, /api/logout, /health, / и /api/table/ingest,
требуют авторизации: JWT в httponly-cookie ipartnyor_token (ставится при логине) или заголовок
Authorization: Bearer <token>.

Swagger: /docs

OpenAPI: /openapi.json

Метод	Путь	Описание
POST	/api/register	{"email","password"} → токен + cookie
POST	/api/login	{"email","password"} → токен + cookie
POST	/api/logout	удалить cookie
GET	/api/me	текущий пользователь
POST	/api/chat	{"query","user_id"?,"thread_id"?} → ответ RAG. Прокси в POST /api/search с X-API-Key. Если improved_answer непустой — он подменяет answer (fallback). user_id по умолчанию — id авторизованного пользователя
POST	/api/chat/confirm	{"thread_id","decision"} → 501 Not Implemented (RAG не поддерживает /api/agent/confirm)
GET	/api/table/invoices	список счетов (17 полей). В демо-режиме возвращает все счета, без разграничения по пользователю
POST	/api/table/upload	multipart file → прокси в RST /process, счета сохраняются в локальную таблицу
POST	/api/table/ingest	приём JSON от n8n. Заголовок X-Ingest-Token обязателен. Тело: {"invoices": [ {...}, ... ]}. Сохраняет в системного пользователя (id=1), возвращает {"saved": N, "user_id": 1
}
GET
/api/table/export.xlsx
то же, что /api/table/invoices, в виде .xlsx (17 колонок)
POST	/api/pdf/fix	multipart file (PDF) → прокси в rotation-Tesseract /rotate, возвращает исправленный PDF + заголовки X-Rotation-Angle, X-Rotation-Confidence
GET/POST	/api/notes	список / создание заметки {"title","content"}
GET/PUT/DELETE	/api/notes/{id}	чтение / изменение / удаление заметки
RAG: /api/search (Retrieval_Vector_RZD)
retrieval_client.ask() вызывает POST {RETRIEVAL_BASE_URL}/api/search с телом:

json
{
  "query": "...",
  "user_id": "<id>",
  "project_name": "documents_RZD",
  "use_llm": true
}
Ответ (
SearchResponse
) содержит:
answer
 (сырой ответ LLM),
improved_answer
 (улучшенный, может быть
null
),
documents
, chunks, forms, hallucinated_phrases, logic_issues, logic_score,
relevance, warnings. В чат выводится improved_answer, если он непустой, иначе answer.
Под ответом показываются источники (топ-5 documents со score) и фрагменты (топ-5 chunks).

Заголовок X-API-Key обязателен (RAG проверяет его в verify_api_key, даже если в OpenAPI указано
required: false). Если ключ неверный — RAG вернёт 401 Invalid API key.

PDF Fixer: /api/pdf/fix (rotation-Tesseract)
rotation_client.rotate() отправляет multipart/form-data с полем pdf_file в
POST {ROTATOR_BASE_URL}/rotate. Сервис определяет ориентацию страниц (Tesseract OSD), поворачивает
и возвращает исправленный PDF. Заголовки ответа: X-Rotation-Angle (угол поворота), X-Rotation-Confidence
(уверенность).

Поля счёта (InvoiceRow, 17 колонок)
Номер документа, Номер счета, Дата с
чета
,
Наименование контрагента
,
ИНН контрагента
,
КПП контрагента
, Сумма к оплате, Сумма НДС, Ставка НДС, НДС_в_тч (в выводе — «Да»/«Нет»),
Номер договора, Назначение платежа, Расчетный счет, БИК банка, Наименование банка,
Корреспондентский счет, pages (список строк, в Excel — через запятую).

Наполнение таблицы: два пути
n8n → /api/table/ingest (основной для демо). n8n парсит PDF из IMAP, формирует JSON вида
{"invoices": [ {...} ]} и шлёт POST с заголовком X-Ingest-Token: <INGEST_TOKEN>. Счета сохраняются
в системного пользователя (id=1), создаётся автоматически при старте (ensure_system_user).

Ручная загрузка → /api/table/upload (кнопка «Обработать файл»). Файл уходит в RST /process,
результат сохраняется в текущего пользователя.

⚠ Демо-режим
GET /api/table/invoices и GET /api/table/export.xlsx в текущей версии показывают все счета всем
авторизованным пользователям (db.list_all_invoices), без фильтра по user_id. Это сделано для
выставочного стенда: зрители видят общий поток счетов. Для продакшена с разграничением доступа замените
_get_invoices() в routers/table.py на db.list_invoices(user["id"]) и передавайте user_id в теле
/api/table/ingest.

Хранилище файлов (вкладка «Хранилище файлов»)
В static/samples/ лежат PDF-примеры, доступные для скачивания через UI:

Счета: invoice-
1.pdf
,
invoice-2.pdf
, invoice-3.pdf — для вкладки «Таблица».

Пакеты документов на ремонт: repair-1.pdf, repair-2.pdf, repair-3.pdf — для n8n-workflow
«парсинг документов на ремонт».

Ссылки на скачивание: /static/samples/<имя>.pdf. Файлы попадают в git и будут доступны на сервере
после деплоя.

Структура
text
main.py            точка входа FastAPI (+ lifespan: init_db, ensure_system_user)
config.py          чтение .env
db.py              SQLite (users, notes, invoices) + list_all_invoices, ensure_system_user
auth.py            bcrypt + JWT, зависимость current_user
routers/           auth, chat, table (в т.ч. ingest), notes, pdf (PDF Fixer)
clients/           retrieval_client.py (/api/search + improved_answer fallback),
                   rst_client.py, rotation_client.py (/rotate)
models/schemas.py  Pydantic-схемы (InvoiceRow — 17 полей, INVOICE_COLUMNS)
templates/         index.html
static/            app.js, style.css, samples/ (PDF-примеры)
Пример вызова /api/table/ingest
bash
curl -X POST http://127.0.0.1:8000/api/table/ingest \
  -H "Content-Type: application/json" \
  -H "X-Ingest-Token: $INGEST_TOKEN" \
  -d '{
    "invoices": [{
      "Номер документа": "22817",
      "Номер счета": "22817",
      "Дата счета": "30.04.2026",
      "Наименование контрагента": "ООО \"Транс информ\"",
      "ИНН контрагента": "3666140038",
      "КПП контрагента": "366601001",
      "Сумма к оплате": 223589.4,
      "Сумма НДС": 40319.4,
      "Ставка НДС": "22%",
      "НДС_в_тч": false,
      "Номер договора": "1939/21/РСТ от 13.09.2021",
      "Назначение платежа": "Оплата по договору...",
      "Расчетный счет": "40702810911190001994",
      "БИК банка": "044525411",
      "Наименование банка": "Филиал \"Центральный\" Банка ВТБ (ПАО) г.Москва",
      "Корреспондентский счет": "30101810145250000411",
      "pages": ["1", "2"]
    }]
  }'
# → {"saved":1,"user_id":1}
Пример вызова /api/chat (RAG)
bash
# логин (получить cookie)
curl -c /tmp/c.txt -X POST http://127.0.0.1:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@demo.ru","password":"demo123"}'

# чат
curl -b /tmp/c.txt -X POST http://127.0.0.1:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"query":"какой порядок осмотра верхнего строения пути?"}'
В ответе answer будет improved_answer из RAG (если он непустой), иначе сырой answer.

Пример вызова /api/pdf/fix (PDF Fixer)
bash
curl -c /tmp/c.txt -X POST http://127.0.0.1:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@demo.ru","password":"demo123"}'

curl -b /tmp/c.txt -X POST http://127.0.0.1:8000/api/pdf/fix \
  -F "file=@static/samples/repair-1.pdf" \
  -o /tmp/fixed.pdf -D /tmp/headers.txt

cat /tmp/headers.txt | grep -i "rotation\|content-type"
# → X-Rotation-Angle: 180, X-Rotation-Confidence: 15.0, Content-Type: application/pdf
Сброс демо-данных
bash
docker exec ipartnyor python -c "
import db
with db.get_conn() as conn:
    conn.execute('DELETE FROM invoices')
print('invoices cleared')
"
## Требования к серверу (для развёртывания демо-стенда)

Полный стек для демо (чат + таблица + PDF Fixer) — **6 контейнеров** + PostgreSQL для n8n.

### Ресурсы по контейнерам

**`ipartnyor`** (UI + API + SQLite)
- RAM: 0.05 ГБ (простой) / 0.5 ГБ (пик)
- Диск: ~0.5 ГБ

**`n8n` + `postgres`** (парсинг PDF из IMAP)
- RAM: 0.5 ГБ (простой) / 1.2 ГБ (пик)
- Диск: ~3 ГБ

**`retrieval_vector_rzd`** (RAG: поиск + LLM)
- RAM: 0.25 ГБ (простой) / 1–2 ГБ (пик)
- Диск: ~7.4 ГБ

**`qdrant-ipartnyor`** (векторная БД)
- RAM: 0.05 ГБ (простой) / 0.5 ГБ (пик)
- Диск: ~0.2 ГБ + том ~1.1 ГБ

**`embedding-service-ipartnyor`** (BGE-M3, CPU)
- RAM: **1.1 ГБ** (простой) / **3 ГБ** (пик)
- Диск: 20 ГБ → **~4–5 ГБ после CPU-пересборки**

**`rotation-Tesseract`** (поворот PDF)
- RAM: 0.07 ГБ (простой) / 0.3 ГБ (пик)
- Диск: ~0.5 ГБ

**`s4eta`** (опционально — ручная загрузка PDF)
- RAM: 0.4 ГБ (простой) / 1.5 ГБ (пик)
- Диск: **~2.6 ГБ** (CPU-only, `python:3.11-slim` + `--extra-index-url` для `torch`)

### Итого

| Сценарий | RAM (простой) | RAM (пик) | Диск |
|---|---|---|---|
| **Без `s4eta`** | ~2.0 ГБ | ~6.5 ГБ | ~16–18 ГБ |
| **С `s4eta`** | ~2.4 ГБ | ~8.0 ГБ | ~19–21 ГБ |

### Рекомендуемая конфигурация сервера

С учётом ОС (~1 ГБ) и запаса на пики:

- **RAM:** 8 ГБ — минимум (впритык, swap 4 ГБ обязателен), **12 ГБ — рекомендую** (комфортный запас).
- **vCPU:** 2 — минимум, **4 — рекомендую** (чат + парсинг параллельно).
- **Диск:** 40 ГБ — минимум, **60–80 ГБ SSD — рекомендую** (образы + модели + PDF + БД + запас).
- **Swap:** 4 ГБ (обязательно).

### ⚠️ CPU-пересборка перед переносом в облако

`embedding-service` и `s4eta` **обязательно пересобрать CPU-only** (GPU на сервере нет, CUDA-библиотеки только раздувают образ):

- В `Dockerfile` заменить базовый образ `pytorch/pytorch:*-cuda*` на `python:3.11-slim`.
- Ставить `torch` из `https://download.pytorch.org/whl/cpu` (`--extra-index-url`).
- Убрать `torchvision` / `torchaudio` (для BGE-M3 не нужны).

Это срезает `embedding-service` с 20 ГБ до ~4–5 ГБ, `s4eta` — с 10 ГБ до **~2.6 ГБ** (факт).

`embedding-service` **нужен** — RAG использует его для эмбеддингов (`USE_MOCK_EMBEDDINGS=false`,
`EMBEDDING_SERVICE_URL=http://embedding-service-ipartnyor:8082`, модель BGE-M3). Без него `/api/search`
не работает.