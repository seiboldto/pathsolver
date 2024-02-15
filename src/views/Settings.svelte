<script lang="ts">
  import { _ } from "svelte-i18n";
  import { IconArrowLeft } from "@tabler/icons-svelte";
  import { slide } from "svelte/transition";
  import { expoOut } from "svelte/easing";

  import { navigate } from "~stores/router-store";
  import Button from "~components/Button.svelte";
  import Checkbox from "~components/Checkbox.svelte";
  import { persistentStore } from "~stores/persistent-store";
</script>

<main transition:slide={{ easing: expoOut }}>
  <h1>{$_("menu.settings")}</h1>
  <Checkbox bind:checked={$persistentStore.settings.menuTransitions}
    >{$_("settings.transitions")}</Checkbox
  >
  <Checkbox bind:checked={$persistentStore.settings.hoverAnimations}
    >{$_("settings.hover-anims")}</Checkbox
  >
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
