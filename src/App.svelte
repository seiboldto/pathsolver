<script lang="ts">
  import { router } from "~stores/router-store";
  import Home from "~views/Home.svelte";
  import Settings from "~views/Settings.svelte";
</script>

{#if $router.route === "home"}
  <Home />
{/if}
{#if $router.route === "settings"}
  <Settings />
{/if}
