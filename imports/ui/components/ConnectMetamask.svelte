<script>
  import TransferToken from "./TransferToken.svelte";
  import { fade } from 'svelte/transition';
  import { ethers } from "ethers";
  import { onMount } from "svelte";
  import Loader from "./helpers/Loader.svelte";
  let isConnected = false;
  let accAddress = localStorage.getItem("accAddress");
  let provider;
  let signer;
  let isLoading = false;

  async function connectToMetamask() {
    try {
      isLoading = true;
      provider = new ethers.providers.Web3Provider(window.ethereum);
      accAddress = await provider.send("eth_requestAccounts", []);
      isConnected = true;
      localStorage.setItem("accAddress", accAddress);
      signer = provider.getSigner();

      window.ethereum.on("accountsChanged", handleAccountsChanged);
    } catch (error) {
      console.error(error);
    }
    isLoading = false;
  }

  function handleAccountsChanged(newAccounts) {
    if (newAccounts.length === 0) {
      isConnected = false;
      accAddress = undefined;
      localStorage.removeItem("accAddress");
      provider = undefined;
      signer = undefined;
    } else {
      accAddress = newAccounts[0];
      localStorage.setItem("accAddress", accAddress);
    }
  }

  onMount(async () => {
    if (localStorage.getItem("accAddress") !== null) {
      isConnected = true;
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();

      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }
  });
</script>

<div class="container">
  {#if isConnected}
  <div transition:fade={{ delay: 250, duration: 300 }}>
    <TransferToken {accAddress}/>
  </div>
  {:else}
    <div class="connect">
      <img
        width="64"
        height="64"
        src="https://img.icons8.com/nolan/64/metamask-logo.png"
        alt="metamask-logo"
      />
      {#if isLoading}
        <Loader />
      {:else}
        <button class="btn btn-primary" on:click={connectToMetamask}>
          Connect Metamask
        </button>
      {/if}
    </div>
  {/if}
</div>

<style>
  .container {
    margin-top: 40vh;
    justify-content: center;
  }

  .connect {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  img {
    margin-bottom: 1rem;
  }
</style>
