<script lang="ts">
  import { persistentStore } from "~src/stores/persistent-store";

  export let fullWidth = false;
  export let active: boolean;
</script>

<button
  on:click
  class:active
  class:full-width={fullWidth}
  class:hover-animations={$persistentStore.settings.hoverAnimations}
>
  <slot />
</button>

<style lang="scss">
  @use "../styles/mixins.scss" as mixins;

  button {
    border: 0.125rem solid var(--border-color);
    outline: none;
    background-color: var(--bg-color);
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--ui-size);

    &.active {
      color: white;
      background-color: var(--primary-color);
      border-color: var(--primary-border-color);
    }

    &.hover-animations {
      &:hover {
        border-color: var(--primary-color);
      }

      &:active {
        border-color: var(--primary-border-color);
        background-color: var(--background-color-dark);
      }

      &.active:hover {
        border-color: var(--primary-border-color-active);
      }

      &.active:active {
        border-color: var(--primary-border-color-active);
        background-color: var(--primary-border-color);
      }
    }

    &.full-width {
      width: 100%;
    }

    &:focus-visible {
      @include mixins.focus;
    }
  }
</style>
