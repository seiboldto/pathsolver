<script lang="ts">
  import { expoOut } from "svelte/easing";
  import { slide } from "svelte/transition";
  import { _ } from "svelte-i18n";

  import Button from "~components/Button.svelte";
  import { routerStore } from "~stores/router-store";
</script>

<main transition:slide={{ easing: expoOut, duration: 500 }}>
  <h1>{$_("menu.title")}</h1>
  <Button>{$_("menu.play")}</Button>
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
