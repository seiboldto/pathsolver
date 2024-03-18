<script lang="ts">
  import { addIndexToSelected, levelStore } from "~src/stores/level-store";
  import { persistentStore } from "~src/stores/persistent-store";

  export let index: number;
  export let value: number;
  export let boardSize: number;
  let cantAddToPath = false;

  $: active = $levelStore.selectedNodeIndices.includes(index);

  const row = Math.floor(index / boardSize);
  const column = index % boardSize;

  const handleMouseDown = () => {
    addIndexToSelected(index);
  };

  const handleMouseEnter = () => {
    const { length } = $levelStore.selectedNodeIndices;
    if (length === 0 || $levelStore.selectedNodeIndices.includes(index)) return;

    const lastNodeIndex = $levelStore.selectedNodeIndices[length - 1];
    const lastRow = Math.floor(lastNodeIndex / boardSize);
    const lastColumn = lastNodeIndex % boardSize;
    const difference = Math.abs(lastRow - row) + Math.abs(lastColumn - column);

    if (difference > 1) {
      cantAddToPath = true;
      return;
    }

    addIndexToSelected(index);
  };

  const handleMouseLeave = () => (cantAddToPath = false);
</script>

<button
  class="node"
  style:--row={row}
  style:--column={column}
  class:hover-animations={$persistentStore.settings.hoverAnimations}
  class:active
  class:invalid={cantAddToPath}
  on:mousedown={handleMouseDown}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
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
