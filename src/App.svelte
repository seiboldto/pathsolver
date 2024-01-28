<script lang="ts">
  import { _ } from "svelte-i18n";

  import Button from "~components/Button.svelte";
</script>

<main>
  <h1>{$_("menu.title")}</h1>
  <Button fullWidth>{$_("menu.play")}</Button>
  <Button fullWidth>{$_("menu.daily")}</Button>
  <Button fullWidth>{$_("menu.settings")}</Button>
</main>

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
