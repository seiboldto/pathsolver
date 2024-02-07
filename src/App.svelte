<script lang="ts">
  import { router } from "~stores/router-store";
  import { settingsStore } from "~stores/settings-store";
  import Home from "~views/Home.svelte";
  import Settings from "~views/Settings.svelte";
</script>

{#if $router.route === "home"}
  <Home />
{/if}
{#if $router.route === "settings"}
  <Settings />
{/if}
<label style:position="absolute" style:top="0"
  >Transitions<input
    type="checkbox"
    bind:checked={$settingsStore.menuTransitions}
  />
</label>
