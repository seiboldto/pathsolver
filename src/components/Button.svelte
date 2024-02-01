<button on:click
  ><span><slot /></span>
  <div class="bg" /></button
>

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

    span {
      z-index: 1;
    }

    .bg {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      background-color: var(--primary-color);
      width: 0%;
      transition: width ease-out var(--hover-anim-duration);
    }

    &:hover {
      color: var(--light-text-color);

      .bg {
        width: 100%;
      }
    }

    &:focus-visible {
      @include mixins.focus;
    }
  }
</style>
