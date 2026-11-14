<template>
  <main class="auth-layout">
    <section
      class="auth-layout__welcome"
      aria-label="Добро пожаловать в ipartnyor"
    >
      <div class="auth-layout__welcome-copy">
        <p class="auth-layout__eyebrow">
          Добро пожаловать
        </p>
        <p class="auth-layout__brand">
          ipartnyor
        </p>
        <p class="auth-layout__description">
          Личный кабинет клиента
        </p>
      </div>
    </section>

    <section
      class="auth-layout__content"
      aria-label="Форма авторизации"
    >
      <div class="auth-layout__form-wrap">
        <slot />
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
.auth-layout {
  display: grid;
  grid-template-columns: minmax(0, 42.5%) minmax(0, 57.5%);
  min-height: 100vh;
  color: var(--color-text-01);
  background: var(--color-base-02);

  &__welcome {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    min-height: 100vh;
    padding: clamp(2rem, 5.2vw, 6rem);
    background: var(--color-primary);

    &-copy {
      width: 100%;
      max-width: 34rem;
    }
  }

  &__eyebrow {
    margin: 0 0 1.2rem;
    color: rgb(255 255 255 / 68%);
    font-size: clamp(1rem, 1.25vw, 1.3rem);
    font-weight: 500;
  }

  &__brand {
    margin: 0;
    color: #fff;
    font-size: clamp(3rem, 5.1vw, 5.8rem);
    font-weight: 600;
    letter-spacing: -0.065em;
    line-height: 1.05;
  }

  &__description {
    margin: 0.8rem 0 0;
    color: rgb(255 255 255 / 72%);
    font-size: clamp(1.3rem, 2vw, 2rem);
    font-weight: 400;
    letter-spacing: -0.035em;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 0;
    min-height: 100vh;
    padding: clamp(2rem, 5vw, 5rem);
    background: var(--color-base-02);
  }

  &__form-wrap {
    width: 100%;
    max-width: 26rem;
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;

    &__welcome {
      min-height: auto;
      padding: 2.5rem clamp(1.5rem, 7vw, 3rem);
    }

    &__eyebrow {
      margin-bottom: 0.6rem;
    }

    &__brand {
      font-size: clamp(2.6rem, 12vw, 4rem);
    }

    &__description {
      margin-top: 0.5rem;
      font-size: clamp(1.1rem, 5vw, 1.5rem);
    }

    &__content {
      align-items: flex-start;
      min-height: auto;
      padding: 2.5rem clamp(1.5rem, 7vw, 3rem) 3rem;
    }
  }
}
</style>
