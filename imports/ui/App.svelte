<script>
  import { BC, sAddress, sChainId } from "../lib/client/blockchain";
  import { copyToClipboard, formatText } from "../lib/client/copy";
  import { fade } from "svelte/transition";
  import NotConnect from "./components/NotConnect.svelte";
  import MainPage from "./components/MainPage.svelte";
  import Loader from "./utils/Loader.svelte";

  function handleCopyAddress() {
    if ($sAddress) {
      copyToClipboard($sAddress);
    }
  }

  let isLoading = false;
  async function connectMetamask() {
    isLoading = true;
    await BC.enable();
    isLoading = false;
  }
</script>

<div class="container">
  <header>
    <img
      width="64"
      height="64"
      src="https://img.icons8.com/nolan/64/metamask-logo.png"
      alt="metamask-logo"
    />
    {#if $sAddress}
      <span class="text-default">Chain: {$sChainId}</span>
      <button
        class="btn btn-primary address"
        on:click={() => handleCopyAddress()}
        title="Copy address"
      >
        {formatText($sAddress)}
        <img class="copy" src="/images/copy.png" alt="" /></button
      >
    {:else if isLoading}
      <Loader />
    {:else}
      <button class="btn btn-primary" on:click={() => connectMetamask()}>
        Connect Metamask
      </button>
    {/if}
  </header>
  <main>
    {#if $sAddress}
      <div transition:fade={{ delay: 300, duration: 300 }}>
        <MainPage />
      </div>
    {:else}
      <div transition:fade={{ delay: 300, duration: 300 }}>
        <NotConnect />
      </div>
    {/if}
  </main>
</div>

<style>
  .address {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .copy {
    width: 30px;
    height: 30px;
  }
</style>
