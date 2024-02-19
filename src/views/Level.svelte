<script lang="ts">
  import Screen from "~components/Screen.svelte";
  import { type Level } from "~src/levels";

  export let level: Level;
</script>

<Screen>{level.board.nodes}</Screen>
