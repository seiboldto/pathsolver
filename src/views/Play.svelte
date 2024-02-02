<script lang="ts">
  import { _ } from "svelte-i18n";

  import Button from "~components/Button.svelte";
  import { navigate } from "~stores/router-store";

  const difficulties = ["normal", "hard", "extreme"];
</script>

<main>
  <h1>{$_("menu.play")}</h1>
  {#each difficulties as d}
    <div class="difficulty">
      <Button>{$_(`menu.difficulty-${d}`)}</Button>
    </div>
  {/each}
  <Button on:click={() => navigate({ route: "home" })}>{$_("menu.back")}</Button
  >
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--spacing-xs);
    height: 100vh;
    width: 100vw;
    padding: 0 var(--side-padding);
  }

  .difficulty {
    display: flex;
    flex-direction: column;
  }
</style>
