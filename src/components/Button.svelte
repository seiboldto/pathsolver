<script lang="ts">
  import type { Icon } from "@tabler/icons-svelte";
  import type { ComponentType } from "svelte";

  export let fullWidth = false;
  export let icon: ComponentType<Icon>;
</script>

<button on:click class:full-width={fullWidth}
  ><div class="icon"><svelte:component this={icon} /></div>
  <span class="text"><slot /></span>
  <div class="bg" />
  <div class="hover-anim" />
  <div class="dimming-overlay" />
</button>

<style lang="scss">
  @use "../styles/mixins.scss" as mixins;

  button {
    --background-z-index: 1;
    --hover-anim-z-index: 2;
    --dimming-overlay-z-index: 3;
    --content-z-index: 4;

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

    .dimming-overlay {
      position: absolute;
      inset: 0;
      background-color: black;
      opacity: 0;
      z-index: var(--dimming-overlay-z-index);
      pointer-events: none;
    }

    &:hover {
      color: white;

      .icon {
        left: 50%;
        transform: translateX(-50%);
      }

      .text {
        left: calc(50% + var(--spacing-xs) + 2rem);
        transform: translateX(-50%);
        opacity: 0;
      }

      .hover-anim {
        right: 0;
        visibility: visible;
      }
    }

    &:active {
      .dimming-overlay {
        opacity: 0.1;
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
