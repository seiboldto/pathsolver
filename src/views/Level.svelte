<script lang="ts">
  import { expoOut } from "svelte/easing";
  import { slide } from "svelte/transition";

  import { type Level } from "~src/levels";

  export let level: Level;
</script>

<main transition:slide={{ easing: expoOut }}>
  <pre>{level.board.nodes}</pre>
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
