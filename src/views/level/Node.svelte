<script lang="ts">
  import { addIndexToSelected, levelStore } from "~src/stores/level-store";
  import { persistentStore } from "~src/stores/persistent-store";

  export let index: number;
  export let value: number;
  export let boardSize: number;

  $: active = $levelStore.selectedNodeIndices.includes(index);

  const row = Math.floor(index / boardSize);
  const column = index % boardSize;

  const handleMouseDown = () => {
    addIndexToSelected(index);
  };

  const handleMouseEnter = () => {
    if ($levelStore.selectedNodeIndices.length === 0) return;

    const lastNodeIndex =
      $levelStore.selectedNodeIndices[
        $levelStore.selectedNodeIndices.length - 1
      ];
    const lastRow = Math.floor(lastNodeIndex / boardSize);
    const lastColumn = lastNodeIndex % boardSize;
    const difference = Math.abs(lastRow - row) + Math.abs(lastColumn - column);

    if (difference > 1) return;

    addIndexToSelected(index);
  };
</script>

<button
  class="node"
  style:--row={row}
  style:--column={column}
  class:hover-animations={$persistentStore.settings.hoverAnimations}
  class:active
  on:mousedown={handleMouseDown}
  on:mouseenter={handleMouseEnter}
>
  {value}
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

    &.hover-animations:hover {
      border-color: var(--primary-border-color);
    }

    &.active {
      border-color: var(--primary-border-color);
      background-color: var(--primary-color);
      color: white;
    }
  }
</style>
