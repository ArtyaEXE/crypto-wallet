<script>
  import { onMount } from "svelte";
  import { ethers } from "ethers";
  import { fade } from "svelte/transition";

  import MainPage from "./components/MainPage.svelte";
  import NotConnect from "./components/NotConnect.svelte";
  import Loader from "./utils/Loader.svelte";
  import SuccessMessage from "./utils/SuccessMessage.svelte";
  import ErrorMessage from "./utils/ErrorMessage.svelte";

  let isConnected = false;
  let address = localStorage.getItem("address");
  let provider;
  let signer;
  let isLoading = false;
  let err;
  let success;

  function formatAddress(words) {
    if (words.length < 6) {
      return words;
    }
    const start = words.slice(0, 3);
    const end = words.slice(-4);
    return `${start}...${end}`;
  }

  async function connectToMetamask() {
    try {
      isLoading = true;
      provider = new ethers.providers.Web3Provider(window.ethereum);
      address = await provider.send("eth_requestAccounts", []);
      isConnected = true;
      localStorage.setItem("address", address);
      signer = provider.getSigner();

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      success = "Connected to MetaMask successfully";
    } catch (error) {
      err = error;
      if (err.code === -32002) {
        err.message = "Check MetaMask and try again";
      }
      setTimeout(() => {
        err = "";
      }, 3000);
    }
    setTimeout(() => {
      success = "";
    }, 3000);
    isLoading = false;
  }

  function handleAccountsChanged(newAccounts) {
    if (newAccounts.length === 0) {
      isConnected = false;
      address = undefined;
      localStorage.removeItem("address");
      provider = undefined;
      signer = undefined;
    } else {
      address = newAccounts[0];
      localStorage.setItem("address", address);
    }
  }
  onMount(async () => {
    if (localStorage.getItem("address") !== null) {
      isConnected = true;
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();

      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }
  });
</script>

{#if success}
  <div transition:fade={{ delay: 0, duration: 300 }} class="alert">
    <SuccessMessage {success} />
  </div>
{/if}

{#if err}
  <div transition:fade={{ delay: 0, duration: 300 }} class="alert">
    <ErrorMessage
      err={err.message || "Error connecting to MetaMask. Please try again."}
    />
  </div>
{/if}

<div class="container">
  <header>
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
        <button class="address btn btn-primary">{formatAddress(address)}</button
        >
      {:else}
        <button class="btn btn-primary" on:click={connectToMetamask}>
          Connect Metamask
        </button>
      {/if}
    </div>
  </header>
  <main>
    {#if isConnected}
      <MainPage />
    {:else}
      <NotConnect />
    {/if}
  </main>
  <footer />
</div>

<style>
  .connect {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .alert {
    right: 10vw;
    top: -30vh;
    position: absolute;
  }
</style>
