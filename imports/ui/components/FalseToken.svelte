<script>
  import { fade } from "svelte/transition";
  import { formatText } from "/imports/lib/client/copy";
  export let falseToken;
</script>

{#if falseToken}
  <div class="false-token card" transition:fade={{ delay: 300, duration: 300 }}>
    <div class="card-body">
      <span>Token is not available on this network</span>
      <p>{formatText(falseToken.address)}</p>
    </div>
  </div>
{/if}

<style>
  .false-token {
    background-color: rgb(209, 73, 73);
    color: white;
  }

  p {
    margin: 0;
  }
</style>
