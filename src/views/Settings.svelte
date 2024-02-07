<script lang="ts">
  import { _ } from "svelte-i18n";
  import { IconArrowLeft } from "@tabler/icons-svelte";

  import { navigate } from "~stores/router-store";
  import Button from "~components/Button.svelte";
</script>

<main>
  <h1>{$_("menu.settings")}</h1>
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
  }
</style>
