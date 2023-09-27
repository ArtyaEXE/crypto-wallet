<script>
  import { onMount } from "svelte";
  import { ethers } from "ethers";
  import { fade } from "svelte/transition";

  import MainPage from "./components/MainPage.svelte";
  import NotConnect from "./components/NotConnect.svelte";
  import Loader from "./utils/Loader.svelte";
  import LoadingPage from "./components/LoadingPage.svelte";
  import SuccessMessage from "./utils/SuccessMessage.svelte";
  import ErrorMessage from "./utils/ErrorMessage.svelte";

  let isConnected = false;
  let address = localStorage.getItem("address");
  let provider;
  let network;
  let chainId;
  let signer;
  let isLoading = false;
  let isChecked = true;
  let err;
  let success;

  function formatAddress(text) {
    return `${text.slice(0, 5)}...${text.slice(-3)}`;
  }

  async function connectToMetamask() {
    try {
      isLoading = true;
      provider = new ethers.providers.Web3Provider(window.ethereum);

      const savedAddress = localStorage.getItem("address");
      if (savedAddress) {
        address = savedAddress;
      } else {
        const newAccounts = await provider.send("eth_requestAccounts", []);
        address = newAccounts[0];
        localStorage.setItem("address", address);
      }
      network = await provider.getNetwork();
      chainId = network.chainId;
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
    const savedAddress = localStorage.getItem("address");
    if (savedAddress !== null) {
      isConnected = true;
      address = savedAddress;
      provider = new ethers.providers.Web3Provider(window.ethereum, "any");
      network = await provider.getNetwork();
      chainId = network.chainId;
      signer = provider.getSigner();
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      provider.on("network", async (newNetwork, oldNetwork) => {
        if (oldNetwork) {
          window.location.reload();
        }
      });
      isChecked = false;
    } else {
      isChecked = false;
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
{#if isChecked}
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
          <button class="btn btn-primary" on:click={connectToMetamask}>
            Connect Metamask
          </button>
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
{/if}

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
