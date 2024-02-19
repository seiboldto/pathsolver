<script lang="ts">
  import { _ } from "svelte-i18n";
  import { IconArrowLeft, IconPlayerPlay } from "@tabler/icons-svelte";

  import {
    Difficulty,
    PRESET_DIFFICULTIES,
    generateRandomLevel,
  } from "~src/levels";
  import Button from "~components/Button.svelte";
  import ToggleButton from "~components/ToggleButton.svelte";
  import { navigate } from "~stores/router-store";
  import { persistentStore } from "~stores/persistent-store";
  import Divider from "~components/Divider.svelte";
  import Screen from "~src/components/Screen.svelte";

  const playLevel = () => {
    const difficulty =
      Difficulty.presets[$persistentStore.ui.selectedDifficulty];

    const level = generateRandomLevel(difficulty);
    navigate({
      route: "level",
      level,
    });
  };
</script>

<Screen>
  <h1>{$_("menu.play")}</h1>
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
  <Button on:click={playLevel} icon={IconPlayerPlay}>{$_("menu.play")}</Button>
  <Divider />
  <Button on:click={() => navigate({ route: "home" })} icon={IconArrowLeft}
    >{$_("menu.back")}</Button
  >
</Screen>

<style lang="scss">
  .tabs-list {
    display: flex;
    gap: var(--spacing-xs);

    .tab-btn {
      flex-basis: 100%;
    }
  }
</style>
