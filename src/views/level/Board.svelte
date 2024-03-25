<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { v4 as uuid } from "uuid";

  import { type Board } from "~src/levels";
  import { levelStore, resetSelectedNodes } from "~src/stores/level-store";
  import { type Node as INode } from "~src/model/Node";

  import Operation from "./Operation.svelte";
  import Node from "./Node.svelte";

  export let board: Board;
  const { boardSize } = board.difficulty;
  const { edges } = board;
  $: nodes = board.nodes.map<INode | null>((n, i) => ({
    value: n,
    row: Math.floor(i / boardSize),
    column: i % boardSize,
    id: uuid(),
  }));

  const handleMouseUp = () => {
    if ($levelStore.selectedNodes.length > 1) {
      console.log($levelStore.selectedNodes);
    }
    resetSelectedNodes();
  };

  onMount(() => document.addEventListener("mouseup", handleMouseUp));
  onDestroy(() => document.removeEventListener("mouseup", handleMouseUp));

  let value = 0;
  $: {
    if ($levelStore.selectedNodes.length === 0) {
      value = 0;
      break $;
    }

    value = $levelStore.selectedNodes[0].value;
    for (let i = 1; i < $levelStore.selectedNodes.length; i++) {
      const node = $levelStore.selectedNodes[i];
      const prevNode = $levelStore.selectedNodes[i - 1];

      const operation = board.edgeBetween(
        node.row * boardSize + node.column,
        prevNode.row * boardSize + prevNode.column,
      );
      const result = operation.apply(value, node.value);
      value = result;
    }
  }
</script>

<div class="nodes" style:--grid-size={boardSize}>
  {#each nodes as node}
    {#if node}
      <Node {node} />
    {/if}
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
{value}

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
