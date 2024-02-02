<script lang="ts">
  import { _ } from "svelte-i18n";

  import Button from "~components/Button.svelte";
  import { DIFFICULTIES } from "~models/difficulties";
  import { navigate } from "~stores/router-store";

  let activeDifficulty = DIFFICULTIES[0].id;
</script>

<main>
  <h1>{$_("menu.play")}</h1>
  <div class="tabs">
    {#each DIFFICULTIES as d}
      <div class="tab-btn">
        <Button
          fullWidth
          active={activeDifficulty === d.id}
          on:click={() => (activeDifficulty = d.id)}
          >{$_(`menu.difficulty-${d.id}`)}</Button
        >
      </div>
    {/each}
  </div>
  <Button>{$_("menu.play")}</Button>
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

  .tabs {
    display: flex;
    gap: var(--spacing-xs);

    .tab-btn {
      flex-basis: 100%;
    }
  }
</style>
