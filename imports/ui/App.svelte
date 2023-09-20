<script>
  import { onMount } from "svelte";
  import { ethers } from "ethers";
  import MainPage from "./components/MainPage.svelte";
  import NotConnect from "./components/NotConnect.svelte";
  import Loader from "./utils/Loader.svelte";

  let isConnected = false;
  let address = localStorage.getItem("address");
  let provider;
  let signer;
  let isLoading = false;
  let err;
  let success;

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
</style>
