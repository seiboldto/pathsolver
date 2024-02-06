<script lang="ts">
  import { router } from "~stores/router-store";
  import Home from "~views/Home.svelte";
</script>

{#if $router.route === "home"}
  <Home />
{/if}
