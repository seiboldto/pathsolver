<script lang="ts">
  import { type Board } from "~src/levels";

  import Operation from "./Operation.svelte";

  export let board: Board;
  let boardSize = board.difficulty.boardSize;

  let nodes = board.nodes.map((n, i) => ({
    value: n,
    row: Math.floor(i / boardSize),
    column: i % boardSize,
  }));

  let edges = board.edges;
  console.log(edges);
</script>

<div class="nodes" style:--grid-size={boardSize}>
  {#each nodes as node}
    <div class="node" style:--row={node.row} style:--column={node.column}>
      {node.value}
    </div>
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

    .node {
      position: absolute;
      top: calc(var(--row) * var(--gap-size) + (var(--row) * var(--node-size)));
      left: calc(
        var(--column) * var(--gap-size) + (var(--column) * var(--node-size))
      );
      background-color: var(--background-color);
      width: var(--node-size);
      height: var(--node-size);
      border: 0.125rem solid var(--border-color);
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      cursor: pointer;

      transition: top var(--hover-anim-duration) var(--hover-anim-easing);
    }

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
