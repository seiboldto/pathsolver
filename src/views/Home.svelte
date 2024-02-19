<script lang="ts">
  import { _ } from "svelte-i18n";
  import {
    IconCalendarEvent,
    IconPlayerPlay,
    IconSettings,
  } from "@tabler/icons-svelte";

  import { navigate } from "~stores/router-store";
  import Button from "~components/Button.svelte";
  import Screen from "~components/Screen.svelte";
</script>

<Screen>
  <h1>{$_("menu.title")}</h1>
  <Button on:click={() => navigate({ route: "play" })} icon={IconPlayerPlay}
    >{$_("menu.play")}</Button
  >
  <Button icon={IconCalendarEvent}>{$_("menu.daily")}</Button>
  <Button on:click={() => navigate({ route: "settings" })} icon={IconSettings}
    >{$_("menu.settings")}</Button
  >
</Screen>
