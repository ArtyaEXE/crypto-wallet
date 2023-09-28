<script>
import { BC, sAddress } from "../lib/client/blockchain";


  function formatAddress(text) {
    return `${text.slice(0, 5)}...${text.slice(-3)}`;
  }
</script>

<!-- {#if isChecked}
  <div transition:fade={{ delay: 300, duration: 300 }}>
    <LoadingPage />
  </div>
{:else}
  <div class="container">
    <header class="mb-3">
      <div class="connect">
        <img
          width="64"
          height="64"
          src="https://img.icons8.com/nolan/64/metamask-logo.png"
          alt="metamask-logo"
        />
        {#if isLoading}
          <Loader />
        {:else if isConnected}
          <span class="network"
            >Network: {network.name}<br />Chain: {network.chainId}</span
          >
          <button class="address btn btn-primary"
            >{formatAddress(address)}</button
          >
        {:else}
        {/if}
      </div>
    </header>
    <main>
      {#if isConnected}
        <div transition:fade={{ delay: 300, duration: 300 }} class="main">
          <MainPage {address} {provider} {signer} {chainId} />
        </div>
      {:else}
        <div transition:fade={{ delay: 0, duration: 0 }} class="main">
          <NotConnect />
        </div>
      {/if}
    </main>
    <footer />
  </div>
  {/if} -->
  <button class="btn btn-primary" on:click={()=> BC.enable()}>
    Connect Metamask
  </button>
  
<style>
  .connect {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .alert {
    right: 0;
    top: 0;
    position: absolute;
  }

  .network {
    font-weight: 500;
    font-size: 14px;
    margin: 0;
  }
</style>
