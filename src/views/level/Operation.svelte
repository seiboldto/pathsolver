<script lang="ts">
  import { IconPlus, IconMinus, IconDivide, IconX } from "@tabler/icons-svelte";

  import type { OperationKind } from "~src/levels";

  export let kind: OperationKind;

  const props = { size: 16 } as const;
</script>

{#if kind === "addition"}
  <IconPlus {...props} />
{:else if kind === "subtraction"}
  <IconMinus {...props} />
{:else if kind === "multiplication"}
  <IconX {...props} />
{:else if kind === "division"}
  <IconDivide {...props} />
{/if}
