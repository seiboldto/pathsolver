<script lang="ts">
  import { _ } from "svelte-i18n";
  import { IconArrowLeft } from "@tabler/icons-svelte";

  import { navigate } from "~stores/router-store";
  import Button from "~components/Button.svelte";
  import Checkbox from "~components/Checkbox.svelte";
  import { persistentStore } from "~stores/persistent-store";
  import Screen from "~src/components/Screen.svelte";
</script>

<Screen>
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
</Screen>
