<script lang="ts">
  import { _ } from "svelte-i18n";
  import { slide } from "svelte/transition";
  import { expoOut } from "svelte/easing";
  import {
    IconCalendarEvent,
    IconPlayerPlay,
    IconSettings,
  } from "@tabler/icons-svelte";

  import { navigate } from "~stores/router-store";
  import Button from "~components/Button.svelte";
</script>

<main transition:slide={{ easing: expoOut }}>
  <h1>{$_("menu.title")}</h1>
  <Button on:click={() => navigate({ route: "play" })} icon={IconPlayerPlay}
    >{$_("menu.play")}</Button
  >
  <Button icon={IconCalendarEvent}>{$_("menu.daily")}</Button>
  <Button on:click={() => navigate({ route: "settings" })} icon={IconSettings}
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
    animation-duration: var(--menu-transition-duration) !important;
  }
</style>
