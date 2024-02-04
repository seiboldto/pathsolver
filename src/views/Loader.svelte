<script lang="ts">
  import { onMount } from "svelte";

  import type { LevelType } from "~models/level";
  import Button from "~components/Button.svelte";
  import { navigate } from "~stores/router-store";

  export let level: LevelType;

  let hasError = false;

  onMount(async () => {
    level;
    return new Promise<void>((r) => {
      setTimeout(() => {
        r();
        hasError = true;
      }, 500);
    });
  });

  const loadingBars = new Array(5).fill(0).map((_, i) => i);
</script>

<main class:has-error={hasError}>
  {#if !hasError}
    {#each loadingBars as l}
      <div class="bar" style:--anim-delay={l * 100} />
    {/each}
  {:else}<h1>§Oh no!</h1>
    <p>§Something went wrong.</p>
    <Button on:click={() => navigate({ route: "home" })}>§Back</Button>{/if}
</main>

<style lang="scss">
  main {
    display: flex;
    height: 100vh;
    width: 100vw;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-xs);

    &.has-error {
      flex-direction: column;
      padding: 0 var(--side-padding);
      align-items: unset;
    }

    .bar {
      width: 1rem;
      height: 2rem;
      background-color: var(--primary-color);
      animation: bar 1s infinite;
      animation-delay: var(--anim-delay);
    }
  }

  @keyframes bar {
    0% {
      height: 2rem;
    }

    25% {
      height: 4rem;
    }

    50% {
      height: 2rem;
    }
  }
</style>
