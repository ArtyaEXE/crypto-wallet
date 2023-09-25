<script>
  import { ethers } from "ethers";
  import { TOKEN_ABI } from "../../api/contract";
  import LoaderDark from "../utils/LoaderDark.svelte";
  import { selectedToken } from "/imports/api/selectToken";

  export let selected;
  export let signer;
  export let provider;

  let isLoading = false;
  let to;
  let amount;

  async function transferTokens() {
    try {
      isLoading = true;
      const token = new ethers.Contract(selected.address, TOKEN_ABI, provider);
      const tx = await token
        .connect(signer)
        .transfer(to, ethers.utils.parseUnits(amount, 18));
      const result = await tx.wait();
    } catch (error) {
      console.error(error);
    }
    to = "";
    amount = "";
    selectedToken.set(null);
    setTimeout(() => {
      location.reload();
    }, 100);
  }

  function setMaxAmount() {
    amount = selected.balance;
  }
</script>

<div class="card">
  <div class="card-body">
    <p class="address">
      Selected token to transfer: {selected.name}
      {selected.symbol}
    </p>
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        id="floatingAddress"
        bind:value={to}
        placeholder="Destination"
      />
      <label for="floatingAddress">Destination address</label>
    </div>
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control"
        id="floatingAmount"
        bind:value={amount}
        placeholder="Amount"
      />
      <label for="floatingAmount">Amount</label>
    </div>
    <div class="button-group">
      <button class="btn btn-secondary" on:click={setMaxAmount}>Use Max</button>
      {#if isLoading}
        <LoaderDark />
      {:else}
        <button class="btn btn-primary" on:click={transferTokens}>
          Transfer
        </button>
      {/if}
    </div>
  </div>
</div>

<style>
  .address {
    font-weight: 700;
    font-size: 24px;
  }
  .button-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
