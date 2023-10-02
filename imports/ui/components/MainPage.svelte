<script>
  import { fade } from "svelte/transition";
  import AddToken from "./AddToken.svelte";
  import TransferToken from "./TransferToken.svelte";
  import { selectedToken } from "/imports/api/selectToken";

  $: selected = $selectedToken;
</script>

<AddToken />

<!-- {#if selected}
  <div transition:fade={{ delay: 100, duration: 300 }}>
    <TransferToken />
  </div>
{/if} -->
