<script>
  import { ethers } from "ethers";
  import { TOKEN_ABI } from "/imports/api/contract";
  import { fade } from "svelte/transition";
  import TokenCard from "./TokenCard.svelte";

  export let provider;
  export let address;
  let tokens = JSON.parse(localStorage.getItem("tokens")) || [];
  let tokenAddress;

  async function addToken() {
    try {
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
      localStorage.setItem("tokens", JSON.stringify(tokens));
    } catch (error) {
      console.error("Error adding token:", error);
    }
    tokenAddress = "";
  }
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
  <button class="btn search" on:click={addToken}
    ><img src="/images/search.png" alt="" /></button
  >
</div>

<div class="token-list">
  {#each tokens as token}
    {#if tokens}
      <div transition:fade={{ delay: 0, duration: 300 }} class="token">
        <TokenCard {token} {tokens} />
      </div>
    {/if}
  {/each}
</div>

<style>
  .token-list {
    display: flex;
    gap: 10px;
  }
  .add-token {
    position: relative;
  }

  .search {
    position: absolute;
    right: 20px;
    top: 10px;
    padding: 0;
  }

  label {
    color: #212529;
  }
</style>
