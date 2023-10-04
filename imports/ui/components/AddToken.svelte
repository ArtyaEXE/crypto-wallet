<script>
  import { BC } from "/imports/lib/client/blockchain";
  import TokenList from "./TokenList.svelte";

  let tokenAddress;
</script>

<div class="form-floating mb-4 add-token">
  <input
    type="text"
    class="form-control"
    id="floatingAddress"
    bind:value={tokenAddress}
    placeholder="Enter token address"
  />
  <label for="floatingAddress">Token address</label>
  <button class="btn search" on:click={BC.addToken(tokenAddress)}>
    <img src="/images/search.png" alt="" />
  </button>
</div>

<div class="token-list mb-3">
  <TokenList />
</div>

<style>
  .form-floating {
    opacity: 0.5;
    transition: opacity, 0.3s ease;
  }

  .form-floating:hover {
    opacity: 1;
  }

  .add-token {
    position: relative;
  }

  .search {
    position: absolute;
    right: 20px;
    top: 15px;
    padding: 0;
  }

  label {
    color: #212529;
  }

  img {
    width: 20px;
    height: 20px;
  }
</style>
