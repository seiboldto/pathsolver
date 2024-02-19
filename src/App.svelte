<script lang="ts">
  import { router } from "./stores/router-store";
  import Home from "./views/Home.svelte";
  import Settings from "./views/Settings.svelte";
  import Play from "./views/Play.svelte";
  import Level from "./views/Level.svelte";
</script>

{#if $router.route === "home"}
  <Home />
{/if}
{#if $router.route === "settings"}
  <Settings />
{/if}
{#if $router.route === "play"}
  <Play />
{/if}
{#if $router.route === "level"}
  <Level level={$router.level} />
{/if}
