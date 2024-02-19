<script lang="ts">
  import { slide } from "svelte/transition";
  import { expoOut } from "svelte/easing";
</script>

<main transition:slide={{ easing: expoOut }}>
  <slot />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--spacing-xs);
    height: 100vh;
    width: 100vw;
    padding: 0 var(--side-padding);
    animation-duration: var(--menu-transition-duration) !important;
  }
</style>
