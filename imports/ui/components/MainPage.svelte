<script>
  import { fade } from "svelte/transition";
  import AddToken from "./AddToken.svelte";
  import TransferToken from "./TransferToken.svelte";
  import { selectedToken } from "/imports/api/selectToken";

  export let address;
  export let provider;
  export let signer;
  export let chainId;

  let tokens = [];
  $: selected = $selectedToken;
</script>

<AddToken {provider} {address} {tokens} {chainId} />

{#if selected}
  <div transition:fade={{ delay: 100, duration: 300 }}>
    <TransferToken {selected} {provider} {signer} />
  </div>
{/if}
