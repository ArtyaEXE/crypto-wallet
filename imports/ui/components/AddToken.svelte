<script>
  import { ethers } from "ethers";
  import { TOKEN_ABI } from "/imports/api/contract";
  import { selectedToken } from "/imports/api/selectToken";
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import LoaderDark from "../utils/LoaderDark.svelte";

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

  function removeToken(token) {
    const updatedTokens = tokens.filter((t) => t.address !== token.address);
    tokens = updatedTokens;
    localStorage.setItem("tokens", JSON.stringify(updatedTokens));
  }

  function selectToken(token) {
    selectedToken.set(token);
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
  {#each tokens as token}
    {#if tokens}
      <div transition:fade={{ delay: 0, duration: 300 }} class="token">
        <div class="card">
          <div class="card-body">
            <span class="name">{token.name}</span>
            <br />
            <span class="symbol">{token.symbol}</span>
            <br />
            <span class="balance">Balance: {token.balance} {token.symbol}</span>
            <button class="btn remove" on:click={removeToken(token)}
              ><img src="/images/cross.png" alt="" /></button
            >
            <br />
            {#if $selectedToken !== token}
              <button
                class="btn btn-success select"
                on:click={() => selectToken(token)}>Select</button
              >
            {:else}
              <span class="selected" style="color: green;">Selected</span>
            {/if}
          </div>
        </div>
      </div>
    {/if}
  {/each}
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

  .token {
    position: relative;
    transition: all 0.2s ease;
    overflow: hidden;
    min-width: 170px;
  }

  .remove {
    position: absolute;
    padding: 10px;
    right: 0;
    top: 0;
  }

  img {
    width: 20px;
    height: 20px;
  }

  .name {
    font-weight: 500;
  }

  .balance {
    font-weight: 700;
  }
</style>
