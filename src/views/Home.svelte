<script lang="ts">
  import { _ } from "svelte-i18n";

  import Button from "~components/Button.svelte";
  import { routerStore } from "~stores/router-store";
</script>

<main>
  <h1>{$_("menu.title")}</h1>
  <Button
    on:click={() =>
      routerStore.set({
        route: "loader",
        level: { type: "daily", date: new Date() },
      })}>{$_("menu.play")}</Button
  >
  <Button>{$_("menu.daily")}</Button>
  <Button on:click={() => routerStore.set({ route: "settings" })}
    >{$_("menu.settings")}</Button
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
