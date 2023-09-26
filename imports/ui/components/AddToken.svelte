<script>
  import { fade } from "svelte/transition";
  import { ethers } from "ethers";
  import { TOKEN_ABI } from "/imports/api/contract";
  import { onMount } from "svelte";
  import LoaderDark from "../utils/LoaderDark.svelte";
  import TokenList from "./TokenList.svelte";
  import SuccessMessage from "../utils/SuccessMessage.svelte";
  import ErrorMessage from "../utils/ErrorMessage.svelte";

  export let provider;
  export let address;
  export let tokens;
  export let chainId;

  let tokenAddresses = JSON.parse(localStorage.getItem("tokenAddresses")) || [];
  let tokenAddress;
  let isLoading = false;
  let err;
  let success;

  async function loadTokenData(tokenAddress, tokenChain) {
    try {
      isLoading = true;
      const token = new ethers.Contract(tokenAddress, TOKEN_ABI, provider);
      const name = await token.name();
      const symbol = await token.symbol();
      const balanceBN = await token.balanceOf(address);
      const balance = ethers.utils.formatUnits(balanceBN, 18);

      const newToken = {
        address: tokenAddress,
        name,
        symbol,
        balance,
        chain: tokenChain,
      };

      tokens = [...tokens, newToken];
      console.log(tokens);
    } catch (err) {
      console.error(err);
    }
    isLoading = false;
  }

  async function addToken() {
    try {
      const trimmedTokenAddress = tokenAddress.trim();
      if (!trimmedTokenAddress) return;

      const tokenExists = tokenAddresses.some(
        (token) =>
          token.address === trimmedTokenAddress && token.chain === chainId
      );

      if (!tokenExists) {
        tokenAddresses.push({
          address: trimmedTokenAddress,
          chain: chainId,
        });
        localStorage.setItem("tokenAddresses", JSON.stringify(tokenAddresses));
        tokenAddress = "";

        loadTokenData(trimmedTokenAddress, chainId);
        success = `Token added to chain ${chainId}`;
      } else {
        err = "Token address already exists in this chain";
        tokenAddress = "";
        setTimeout(() => {
          err = "";
        }, 5000);
      }
    } catch (err) {
      console.error(err);
    }
    setTimeout(() => {
      success = "";
    }, 3000);
  }

  onMount(async () => {
    tokenAddresses.forEach((token) => {
      if (token.chain === chainId) {
        loadTokenData(token.address, token.chain);
      }
    });
  });
</script>

{#if success}
  <div transition:fade={{ delay: 0, duration: 300 }} class="alert">
    <SuccessMessage {success} />
  </div>
{/if}

{#if err}
  <div transition:fade={{ delay: 0, duration: 300 }} class="alert">
    <ErrorMessage {err} />
  </div>
{/if}

<div class="form-floating mb-3 add-token">
  <input
    type="text"
    class="form-control"
    id="floatingAddress"
    bind:value={tokenAddress}
    placeholder="Enter token address"
  />
  <label for="floatingAddress">Token address</label>
  <button class="btn search" on:click={addToken}>
    {#if isLoading}
      <LoaderDark />
    {:else}
      <img src="/images/search.png" alt="" />
    {/if}
  </button>
</div>

<div class="token-list mb-3">
  <TokenList {tokens} />
</div>

<style>
  .alert {
    position: absolute;
    right: 0;
    top: 0;
  }

  .token-list {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 10px;
  }
  .add-token {
    position: relative;
  }

  .search {
    position: absolute;
    right: 20px;
    top: 15px;
    padding: 0;
  }

  label {
    color: #212529;
  }

  img {
    width: 20px;
    height: 20px;
  }
</style>
