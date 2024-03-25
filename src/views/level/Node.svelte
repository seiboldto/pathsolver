<script lang="ts">
  import type { Node } from "~src/model/Node";
  import { selectNode, levelStore } from "~src/stores/level-store";
  import { persistentStore } from "~src/stores/persistent-store";

  export let node: Node;
  let cantAddToPath = false;

  $: active = $levelStore.selectedNodes.some((n) => n.id === node.id);

  const handleMouseDown = () => {
    selectNode(node);
  };

  const handleMouseEnter = () => {
    const { length } = $levelStore.selectedNodes;
    if (length === 0 || active) return;

    const lastNode = $levelStore.selectedNodes[length - 1];
    const difference =
      Math.abs(lastNode.row - node.row) +
      Math.abs(lastNode.column - node.column);

    if (difference > 1) {
      cantAddToPath = true;
      return;
    }

    selectNode(node);
  };

  const handleMouseLeave = () => (cantAddToPath = false);
</script>

<button
  class="node"
  style:--row={node.row}
  style:--column={node.column}
  class:hover-animations={$persistentStore.settings.hoverAnimations}
  class:active
  class:invalid={cantAddToPath}
  on:mousedown={handleMouseDown}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
>
  {node.value}
</button>

<style lang="scss">
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

    &.hover-animations:hover:not(.invalid) {
      border-color: var(--primary-border-color);
    }

    &.invalid {
      border-color: var(--error-color);
    }

    &.active {
      border-color: var(--primary-border-color);
      background-color: var(--primary-color);
      color: white;
    }
  }
</style>
