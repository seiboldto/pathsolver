<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  import { type Board } from "~src/levels";
  import { resetSelectedIndices } from "~src/stores/level-store";

  import Operation from "./Operation.svelte";
  import Node from "./Node.svelte";

  export let board: Board;
  const { boardSize } = board.difficulty;
  const { edges } = board;

  const handleMouseUp = () => {
    resetSelectedIndices();
  };

  onMount(() => document.addEventListener("mouseup", handleMouseUp));
  onDestroy(() => document.removeEventListener("mouseup", handleMouseUp));
</script>

<div class="nodes" style:--grid-size={boardSize}>
  {#each board.nodes.entries() as [i, node]}
    <Node value={node} index={i} {boardSize} />
  {/each}
  {#each edges.slice(0, edges.length / 2).entries() as [i, edge]}
    <div
      class="edge horizontal"
      style:--row={Math.floor(i / (boardSize - 1))}
      style:--column={i % (boardSize - 1)}
    >
      <Operation kind={edge.kind} />
    </div>
  {/each}
  {#each edges.slice(edges.length / 2).entries() as [i, edge]}
    <div
      class="edge vertical"
      style:--row={Math.floor(i / boardSize)}
      style:--column={i % boardSize}
    >
      <Operation kind={edge.kind} />
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

    width: var(--ui-width);
    height: var(--ui-width);
    position: relative;

    .edge {
      position: absolute;
      display: flex;
      transform: translate(-50%, -50%);

      &.horizontal {
        top: calc(
          var(--node-size) / 2 + var(--row) *
            (var(--gap-size) + var(--node-size))
        );
        left: calc(
          var(--node-size) + (var(--gap-size) / 2) + var(--column) *
            (var(--gap-size) + var(--node-size))
        );
      }

      &.vertical {
        top: calc(
          var(--node-size) + (var(--gap-size) / 2) + var(--row) *
            (var(--gap-size) + var(--node-size))
        );
        left: calc(
          var(--node-size) / 2 + var(--column) *
            (var(--gap-size) + var(--node-size))
        );
      }
    }
  }
</style>
