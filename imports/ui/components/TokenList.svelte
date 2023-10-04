<script>
  import { sTokens } from "/imports/lib/client/blockchain";
  import TokenItem from "./TokenItem.svelte";
</script>

<div class="card-container">
  {#each $sTokens as token}
    <div class="token">
      <TokenItem {token} />
    </div>
  {/each}
</div>

<style>
  .card-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
