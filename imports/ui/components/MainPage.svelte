<script>
  import TransferToken from "./TransferToken.svelte";
  import SuccessMessage from "../utils/SuccessMessage.svelte";
  import ErrorMessage from "../utils/ErrorMessage.svelte";
  import AddToken from "./AddToken.svelte";
  import { fade } from "svelte/transition";

  export let address;
  export let provider;
  export let signer;
</script>

<AddToken {provider} {address} />
<!-- {#if success}
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

    <TransferToken {signer} {address} {provider} />


<style>
  .alert {
    right: 10vw;
    top: -30vh;
    position: absolute;
  }
</style> -->
