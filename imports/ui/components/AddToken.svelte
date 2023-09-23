<script>
  import { ethers } from "ethers";
  import { TOKEN_ABI } from "/imports/api/contract";
  import { selectedToken } from "/imports/api/selectToken";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import LoaderDark from "../utils/LoaderDark.svelte";
  import TokenList from "./TokenList.svelte";

  export let provider;
  export let address;
  export let tokens;

  let tokenAddresses = JSON.parse(localStorage.getItem("tokenAddresses")) || [];
  let tokenAddress;
  let isLoading = false;

  async function loadTokenData(tokenAddress) {
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
      };

      tokens = [...tokens, newToken];
    } catch (error) {
      console.error("Error loading token data:", error);
    }
    isLoading = false;
  }

  async function addToken() {
    try {
      const trimmedTokenAddress = tokenAddress.trim();
      if (!trimmedTokenAddress) return;

      if (!tokenAddresses.includes(trimmedTokenAddress)) {
        tokenAddresses.push(trimmedTokenAddress);
        localStorage.setItem("tokenAddresses", JSON.stringify(tokenAddresses));
        tokenAddress = "";

        loadTokenData(trimmedTokenAddress);
      } else {
        console.error("Token address already exists:", trimmedTokenAddress);
        tokenAddress = "";
      }
    } catch (error) {
      console.error("Error adding token address:", error);
    }
  }

  onMount(() => {
    tokenAddresses.forEach((address) => {
      loadTokenData(address);
    });
  });
</script>

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
