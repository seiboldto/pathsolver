<script lang="ts">
  import { _ } from "svelte-i18n";

  import Button from "~components/Button.svelte";
  import Checkbox from "~components/Checkbox.svelte";
  import { routerStore } from "~stores/router-store";
  import { settingsStore } from "~stores/settings-store";
</script>

<main>
  <h1>{$_("menu.settings")}</h1>
  <Checkbox bind:checked={$settingsStore.hoverAnimations}
    >{$_("menu.hover-animations")}</Checkbox
  >
  <Button on:click={() => routerStore.set({ route: "home" })}
    >{$_("menu.back")}</Button
  >
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
  }
</style>
