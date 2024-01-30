<button on:click><slot /></button>

<style lang="scss">
  @use "../styles/mixins.scss" as mixins;

  button {
    border-radius: 0;
    border: 0.125rem var(--primary-color) solid;
    outline: none;
    background-color: var(--background-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--ui-size);
    padding: var(--spacing-xs) var(--spacing-lg);

    &:hover {
      background-color: var(--primary-color);
      color: var(--light-text-color);
    }

    &:focus-visible {
      @include mixins.focus;
    }
  }
</style>
