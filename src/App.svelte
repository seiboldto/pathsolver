<script lang="ts">
  import { routerStore } from "~stores/router-store";
  import Home from "~views/Home.svelte";
  import Settings from "~views/Settings.svelte";
</script>

{#if $routerStore.route === "home"}
  <Home />
{/if}
{#if $routerStore.route === "settings"}
  <Settings />
{/if}
