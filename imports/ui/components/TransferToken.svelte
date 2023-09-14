<script>
  import { ethers } from "ethers";
  import { TOKEN_ADDRESS, TOKEN_ABI } from "../../api/contract";
  import { onMount } from 'svelte'
  import { fade } from "svelte/transition";
  import LoaderDark from "../utils/LoaderDark.svelte";
  import ErrorMessage from "../utils/ErrorMessage.svelte";
  import SuccessMessage from "../utils/SuccessMessage.svelte";

  export let address;
  export let signer;
  export let provider;
  let isLoading = false;
  let err;
  let success;
  let to;
  let amount;

  async function transferTokens() {
    try {
      isLoading = true;
      const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider);
      const tx = await token.connect(signer).transfer(to, amount);
      const result = await tx.wait();
      console.log(result)
    } catch (error) {
      err = error;
      err = 'Something went wrong, please try again';
      setTimeout(() => {
        err = "";
      }, 3000);
    }
    isLoading = false;
  }
  onMount(async() => {
    try {
    const network = await provider.getNetwork();
    console.log(network)
  } catch (error) {
    console.error(error);
  }
  })
</script>

{#if err}
<div transition:fade={{ delay: 0, duration: 300 }} class="alert">
<ErrorMessage {err}/>
</div>
{/if}

<div class="card">
  <div class="card-body">
    <p class="address">Your address: {address}</p>
    <div class="form-floating mb-3">
      <input
        type="email"
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
    {#if isLoading}
    <LoaderDark />
    {:else}
    <button class="btn btn-primary" on:click={transferTokens}>
      Transfer
    </button>
    {/if}
  </div>
</div>

<style>
  .alert {
    right: 10vw;
    top: -30vh;
    position: absolute;
  }

  .address {
    font-weight: 700;
    font-size: 24px;
  }
</style>
