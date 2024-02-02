<script>
  export let active = false;
  export let fullWidth = false;
</script>

<button on:click class:active class:full-width={fullWidth}><slot /> </button>

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
    transition: color ease-in-out var(--hover-anim-duration);
    position: relative;

    &.full-width {
      width: 100%;
    }

    &:hover,
    &.active {
      color: var(--light-text-color);
      background-color: var(--primary-color);
    }

    &:focus-visible {
      @include mixins.focus;
    }
  }
</style>
