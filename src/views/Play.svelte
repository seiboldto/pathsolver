<script lang="ts">
  import { slide } from "svelte/transition";
  import { _ } from "svelte-i18n";
  import { expoOut } from "svelte/easing";
  import { IconArrowLeft } from "@tabler/icons-svelte";

  import Button from "~components/Button.svelte";
  import { navigate } from "~stores/router-store";
</script>

<main transition:slide={{ easing: expoOut }}>
  <h1>§Play</h1>
  <Button on:click={() => navigate({ route: "home" })} icon={IconArrowLeft}
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
    animation-duration: var(--menu-transition-duration) !important;
  }
</style>
