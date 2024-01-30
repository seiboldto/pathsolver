<script lang="ts">
  export let checked: boolean;
</script>

<label>
  <slot />
  <input type="checkbox" bind:checked />
  <span></span>
</label>

<style lang="scss">
  @use "../styles/mixins.scss" as mixins;

  label {
    display: flex;
    align-items: center;
    position: relative;
    height: var(--ui-size-sm);
    cursor: pointer;

    &:has(> input:focus-visible) {
      @include mixins.focus;
    }
  }

  input {
    cursor: pointer;
    position: absolute;
    right: 0;
    height: var(--ui-size-sm);
    width: var(--ui-size-sm);
    appearance: none;
    outline: none;
  }

  span {
    position: absolute;
    right: 0;
    height: var(--ui-size-sm);
    width: var(--ui-size-sm);
    border: 0.125rem var(--primary-color) solid;
    pointer-events: none;

    &::after {
      content: "";
      position: absolute;
      visibility: hidden;
      left: 0.5rem;
      top: 0.1rem;
      width: 0.5rem;
      height: 1rem;
      border: solid white;
      border-width: 0 0.2rem 0.2rem 0;
      transform: rotate(45deg);
    }
  }

  input:checked + span {
    background-color: var(--primary-color);
  }

  input:checked + span::after {
    visibility: visible;
  }
</style>
