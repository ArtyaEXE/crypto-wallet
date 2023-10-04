<script>
  import { BC } from "/imports/lib/client/blockchain";
  import LoaderDark from "../utils/LoaderDark.svelte";
  export let token;
  let to;
  let amount;
  function setMaxAmount() {
    amount = token.balance;
  }

  let isLoading = false;

  async function handleTransferToken() {
    isLoading = true;
    await BC.transferTokens(token.address, to, amount);
    isLoading = false;
    to = "";
    amount = 0;
  }
</script>

<div class="form-floating mb-3">
  <input
    type="text"
    class="form-control"
    id="floatingAddress"
    placeholder="Destination"
    bind:value={to}
  />
  <label for="floatingAddress">Destination address</label>
</div>
<div class="form-floating mb-3">
  <input
    type="text"
    class="form-control"
    id="floatingAmount"
    placeholder="Amount"
    bind:value={amount}
  />
  <label for="floatingAmount">Amount</label>
</div>
<div class="button-group">
  <button class="btn btn-secondary" on:click={setMaxAmount}>Use Max</button>
  {#if !isLoading}
    <button class="btn btn-primary" on:click={handleTransferToken}>
      Transfer
    </button>
  {:else}
    <LoaderDark />
  {/if}
</div>

<style>
  .button-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
