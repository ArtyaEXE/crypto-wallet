<script>
  import AddToken from "./AddToken.svelte";
  import TransferToken from "./TransferToken.svelte";
  import { selectedToken } from "/imports/api/selectToken";

  export let address;
  export let provider;
  export let signer;
  let tokens = [];

  $: selected = $selectedToken;
</script>

<AddToken {provider} {address} {tokens} />

{#if selected}
  <TransferToken {selected} {provider} {signer} {address} />
{/if}
