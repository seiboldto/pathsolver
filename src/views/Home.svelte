<script lang="ts">
  import { _ } from "svelte-i18n";
  import {
    IconCalendarEvent,
    IconPlayerPlay,
    IconSettings,
  } from "@tabler/icons-svelte";

  import Button from "~components/Button.svelte";
</script>

<main>
  <h1>{$_("menu.title")}</h1>
  <Button on:click={() => console.log("hey")} icon={IconPlayerPlay}
    >{$_("menu.play")}</Button
  >
  <Button icon={IconCalendarEvent}>{$_("menu.daily")}</Button>
  <Button icon={IconSettings}>{$_("menu.settings")}</Button>
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
