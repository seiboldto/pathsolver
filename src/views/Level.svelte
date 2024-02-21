<script lang="ts">
  import Screen from "~components/Screen.svelte";
  import type { Level } from "~src/levels";

  import Board from "./level/Board.svelte";

  export let level: Level;
</script>

<Screen>
  <Board board={level.board} />
</Screen>
