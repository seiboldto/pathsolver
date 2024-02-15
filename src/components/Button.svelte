<script lang="ts">
  import type { Icon } from "@tabler/icons-svelte";
  import type { ComponentType } from "svelte";

  import { persistentStore } from "~src/stores/persistent-store";

  export let fullWidth = false;
  export let icon: ComponentType<Icon> | null = null;
</script>

<button
  on:click
  class:full-width={fullWidth}
  class:hover-animations={$persistentStore.settings.hoverAnimations}
  class:without-icon={icon === null}
>
  {#if icon}
    <div class="icon"><svelte:component this={icon} /></div>
  {/if}
  <span class="text"><slot /></span>
  <div class="bg" />
  <div class="hover-anim" />
</button>

<style lang="scss">
  @use "../styles/mixins.scss" as mixins;

  button {
    --background-z-index: 1;
    --hover-anim-z-index: 2;
    --content-z-index: 3;

    border: none;
    outline: none;
    background-color: var(--border-color);
    cursor: pointer;
    height: var(--ui-size);
    position: relative;
    display: flex;
    align-items: center;

    .icon {
      position: absolute;
      left: var(--spacing-xs);
      transition: left var(--hover-anim-duration) var(--hover-anim-easing);
      display: flex;
      z-index: var(--content-z-index);
    }

    .text {
      position: absolute;
      left: calc(var(--spacing-xs) + 2rem);
      transition:
        left var(--hover-anim-duration) var(--hover-anim-easing),
        opacity calc(var(--hover-anim-duration) / 2) var(--hover-anim-easing);
      z-index: var(--content-z-index);
    }

    &.without-icon {
      justify-content: center;
      .text {
        position: unset;
      }
    }

    .bg {
      position: absolute;
      background-color: var(--background-color);
      inset: 0.125rem;
      z-index: var(--background-z-index);
    }

    .hover-anim {
      position: absolute;
      background-color: var(--primary-color);
      border: 0.125rem solid var(--primary-border-color);
      top: 0;
      bottom: 0;
      left: 0;
      right: 100%;
      visibility: hidden;
      transition: right var(--hover-anim-duration) var(--hover-anim-easing);
      z-index: var(--hover-anim-z-index);
    }

    &.hover-animations:hover {
      color: white;

      .icon {
        left: 50%;
        transform: translateX(-50%);
      }

      &:not(.without-icon) .text {
        left: calc(50% + var(--spacing-xs) + 2rem);
        transform: translateX(-50%);
        opacity: 0;
      }

      .hover-anim {
        right: 0;
        visibility: visible;
      }
    }

    &.hover-animations:active {
      .hover-anim {
        background-color: var(--primary-border-color);
        border-color: var(--primary-border-color-active);
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
