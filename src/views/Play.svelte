<script lang="ts">
  import { slide } from "svelte/transition";
  import { _ } from "svelte-i18n";
  import { expoOut } from "svelte/easing";
  import { IconArrowLeft } from "@tabler/icons-svelte";

  import Button from "~components/Button.svelte";
  import ToggleButton from "~components/ToggleButton.svelte";
  import { navigate } from "~stores/router-store";
  import { PRESET_DIFFICULTIES } from "~src/levels";
  import { persistentStore } from "~src/stores/persistent-store";
</script>

<main transition:slide={{ easing: expoOut }}>
  <h1>§Play</h1>
  <div class="tabs-list">
    {#each PRESET_DIFFICULTIES as difficulty}
      <div class="tab-btn">
        <ToggleButton
          fullWidth
          on:click={() => ($persistentStore.ui.selectedDifficulty = difficulty)}
          active={$persistentStore.ui.selectedDifficulty === difficulty}
          >{$_(`play.difficulty-${difficulty}`)}</ToggleButton
        >
      </div>
    {/each}
  </div>
  <Button on:click={() => navigate({ route: "home" })} icon={IconArrowLeft}
    >{$_("menu.back")}</Button
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
    animation-duration: var(--menu-transition-duration) !important;
  }

  .tabs-list {
    display: flex;
    gap: var(--spacing-xs);

    .tab-btn {
      flex-basis: 100%;
    }
  }
</style>
