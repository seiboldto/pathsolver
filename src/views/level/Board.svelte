<script lang="ts">
  import { type Board } from "~src/levels";

  export let board: Board;
  $: boardSize = board.difficulty.boardSize;
</script>

<div class="nodes" style:--grid-size={boardSize}>
  {#each board.nodes.entries() as [i, node]}
    <div class="node-container">
      <div class="node">{node}</div>
    </div>
  {/each}
</div>

<style lang="scss">
  .nodes {
    --node-size: var(--ui-size);
    --gap-size: calc(
      (var(--ui-width) - var(--grid-size) * var(--node-size)) /
        (var(--grid-size) - 1)
    );

    display: grid;
    grid-template-columns: repeat(var(--grid-size), var(--node-size));
    gap: var(--gap-size);

    .node-container {
      .node {
        width: var(--node-size);
        height: var(--node-size);
        border: 0.125rem solid var(--border-color);
        display: flex;
        align-items: center;
        justify-content: center;
        user-select: none;
        cursor: pointer;
      }
    }
  }
</style>
