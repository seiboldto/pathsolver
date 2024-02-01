<script lang="ts">
  import { router } from "~stores/router-store";
  import Home from "~views/Home.svelte";
  import Settings from "~views/Settings.svelte";
  import Loader from "./views/Loader.svelte";
</script>

{#if $router.route === "home"}
  <Home />
{/if}
{#if $router.route === "settings"}
  <Settings />
{/if}
{#if $router.route === "loader"}
  <Loader level={$router.level} />
{/if}
