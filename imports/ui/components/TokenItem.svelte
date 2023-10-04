<script>
  import { blur } from "svelte/transition";
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { copyToClipboard } from "/imports/lib/client/copy";
  import TransferToken from "./TransferToken.svelte";
  export let token;

  let isFormVisible = false;
  function toggleTransferForm() {
    isFormVisible = !isFormVisible;
  }

  let copyed = false;

  function handleCopyAddress(address) {
    copyToClipboard(address);
    copyed = true;
    setTimeout(() => {
      copyed = false;
    }, 3000);
  }
</script>

{#if token}
  <div class="card" transition:blur={{ amount: 10 }}>
    <div class="card-body">
      <h3>{token.name} ({token.symbol})</h3>
      <p>Balance: {token.balance} {token.symbol}</p>
      <p class="address">
        <span>{token.address}</span>
        {#if !copyed}
          <button
            class="material-symbols-outlined"
            on:click={handleCopyAddress(token.address)}
          >
            content_copy
          </button>
        {:else}
          <span class="material-symbols-outlined"> done </span>
        {/if}
      </p>
      {#if isFormVisible}
        <div
          class="form"
          transition:slide={{
            delay: 0,
            duration: 300,
            easing: quintOut,
            axis: "y",
          }}
        >
          <TransferToken {token} />
        </div>
      {/if}
    </div>
    <button on:click={toggleTransferForm}>
      {#if isFormVisible}
        <span class="material-symbols-outlined"> expand_less </span>
      {:else}
        <span class="material-symbols-outlined"> expand_more </span>
      {/if}
    </button>
  </div>
{/if}

<style>
  h3 {
    font-size: 18px;
  }

  .address {
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 0;
    margin-bottom: 10px;
  }

  span {
    color: #2795d6;
  }
</style>
