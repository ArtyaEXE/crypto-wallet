<script>
  import { fade } from "svelte/transition";
  import { formatText } from "/imports/lib/client/copy";
  export let token;
</script>

{#if token}
  <div class="card" transition:fade={{ delay: 300, duration: 300 }}>
    <div class="card-body">
      <h3>{token.name} ({token.symbol})</h3>
      <p>Balance: {token.balance} {token.symbol}</p>
      <button class="btn btn-primary">{formatText(token.address)}</button>
    </div>
  </div>
{/if}

<style>
</style>
