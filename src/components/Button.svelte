<script>
  export let fullWidth = false;
</script>

<button class:full-width={fullWidth} on:click><slot /></button>

<style lang="scss">
  @use "../styles/mixins.scss" as mixins;

  button {
    border-radius: 0;
    border: calc(0.125rem * var(--scale)) var(--primary-color) solid;
    outline: none;
    background-color: var(--background-color);
    cursor: pointer;
    padding: var(--spacing-xs) var(--spacing-lg);

    &:hover {
      background-color: var(--primary-color);
      color: var(--light-text-color);
    }

    &.full-width {
      width: 100%;
    }

    @include mixins.focus;
  }
</style>
