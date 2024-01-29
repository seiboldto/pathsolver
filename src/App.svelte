<script lang="ts">
  import { expoOut } from "svelte/easing";
  import { slide } from "svelte/transition";
  import { _ } from "svelte-i18n";

  import Button from "~components/Button.svelte";
  import { routerStore } from "~stores/router-store";
</script>

{#if $routerStore.route === "home"}
  <main transition:slide={{ easing: expoOut, duration: 500 }}>
    <h1>{$_("menu.title")}</h1>
    <Button fullWidth>{$_("menu.play")}</Button>
    <Button fullWidth>{$_("menu.daily")}</Button>
    <Button fullWidth on:click={() => routerStore.set({ route: "settings" })}
      >{$_("menu.settings")}</Button
    >
  </main>
{/if}
{#if $routerStore.route === "settings"}
  <main transition:slide={{ easing: expoOut, duration: 500 }}>
    <h1>§Settings</h1>
    <Button fullWidth on:click={() => routerStore.set({ route: "home" })}
      >§Back</Button
    >
  </main>
{/if}

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-xs);
    height: 100vh;
    widows: 100vw;
  }
</style>
