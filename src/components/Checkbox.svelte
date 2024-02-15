<script lang="ts">
  import { IconCheck } from "@tabler/icons-svelte";

  import { persistentStore } from "~src/stores/persistent-store";

  export let checked: boolean;
</script>

<label>
  <slot />
  <input
    type="checkbox"
    bind:checked
    class:hover-animations={$persistentStore.settings.hoverAnimations}
  />
  <span>
    <IconCheck class="checkbox-icon" stroke={3} />
  </span>
</label>

<style lang="scss">
  @use "../styles/mixins.scss" as mixins;

  label {
    display: flex;
    align-items: center;
    position: relative;
    height: var(--ui-size-sm);
    cursor: pointer;
    user-select: none;

    &:has(> input:focus-visible) {
      @include mixins.focus;
    }
  }

  input {
    cursor: pointer;
    position: absolute;
    right: 0;
    height: var(--ui-size-sm);
    width: var(--ui-size-sm);
    appearance: none;
    outline: none;
  }

  span {
    position: absolute;
    right: 0;
    height: var(--ui-size-sm);
    width: var(--ui-size-sm);
    border: 0.125rem var(--border-color) solid;
    background-color: var(--background-color);
    pointer-events: none;
    color: white;

    :global(.checkbox-icon) {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transform-origin: top left;
      visibility: hidden;
    }
  }

  input.hover-animations:not(:checked) {
    &:hover + span {
      border-color: var(--primary-color);
    }

    &:active + span {
      background-color: var(--background-color-dark);
      border-color: var(--primary-border-color);
    }
  }

  input:checked {
    + span {
      background-color: var(--primary-color);
      border-color: var(--primary-border-color);

      :global(.checkbox-icon) {
        visibility: visible;
        animation: check-anim var(--hover-anim-duration)
          var(--hover-anim-easing);
      }
    }

    &.hover-animations:hover + span {
      border-color: var(--primary-border-color-active);
    }

    &.hover-animations:active + span {
      border-color: var(--primary-border-color-active);
      background-color: var(--primary-border-color);
    }
  }

  @keyframes check-anim {
    0% {
      scale: 200%;
    }

    100% {
      scale: 100%;
    }
  }
</style>
