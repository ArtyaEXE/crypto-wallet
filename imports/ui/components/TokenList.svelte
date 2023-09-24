<script>
  import { fade } from "svelte/transition";
  import { selectedToken } from "/imports/api/selectToken";

  let tokenAddresses = JSON.parse(localStorage.getItem("tokenAddresses")) || [];

  export let tokens;

  function removeToken(token) {
    const updatedTokens = tokens.filter((t) => t.address !== token.address);
    tokens = updatedTokens;

    tokenAddresses = tokenAddresses.filter(
      (address) => address !== token.address
    );
    localStorage.setItem("tokenAddresses", JSON.stringify(tokenAddresses));
  }

  function selectToken(token) {
    selectedToken.set(token);
  }
</script>

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

<style>
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

  .name {
    font-weight: 500;
  }

  .balance {
    font-weight: 700;
  }

  img {
    width: 20px;
    height: 20px;
  }
</style>
