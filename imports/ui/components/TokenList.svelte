<script>
  import { sTokens, sFalseTokens } from "/imports/lib/client/blockchain";
  import TokenItem from "./TokenItem.svelte";
  import FalseToken from "./FalseToken.svelte";

  let showAvailable = false;
  let showUnavailable = false;

  function showAvailableTokens() {
    showAvailable = true;
    showUnavailable = false;
  }

  function showUnavailableTokens() {
    showAvailable = false;
    showUnavailable = true;
  }
</script>

<div class="button-group">
  <button class="btn btn-primary" on:click={showAvailableTokens}
    >Available tokens <span class="number">{$sTokens.length}</span></button
  >
  <button class="btn btn-primary" on:click={showUnavailableTokens}
    >Not available tokens<span class="number">{$sFalseTokens.length}</span
    ></button
  >
</div>

<div class="card-container">
  {#if showAvailable}
    {#each $sTokens as token}
      <TokenItem {token} />
    {/each}
  {/if}
  {#if showUnavailable}
    {#each $sFalseTokens as falseToken}
      <FalseToken {falseToken} />
    {/each}
  {/if}
</div>

<style>
  .number {
    position: absolute;
    padding: 0 5px 0 5px;
    border-radius: 50%;
    background-color: #d14949;
    right: -8px;
    top: -8px;
    font-size: 12px;
  }
  .button-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .btn {
    position: relative;
  }
</style>
