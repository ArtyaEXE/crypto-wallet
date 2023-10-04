<script>
  import { fade } from "svelte/transition";
  import { sAddress } from "/imports/lib/client/blockchain";
  import AddToken from "./AddToken.svelte";
</script>

{#if $sAddress}
  <div transition:fade={{ delay: 300, duration: 300 }}>
    <AddToken />
  </div>
{/if}
