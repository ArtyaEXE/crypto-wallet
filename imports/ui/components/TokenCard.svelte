<script>
  export let token;
  export let tokens;

  function removeToken(token) {
    const updatedTokens = tokens.filter((t) => t.address !== token.address);
    tokens = updatedTokens;
    localStorage.setItem("tokens", JSON.stringify(updatedTokens));
  }
</script>

<div class="card">
  <div class="card-body">
    <span class="name">{token.name}</span>
    <br />
    <span class="symbol">{token.symbol}</span>
    <br />
    <span class="balance">Balance: {token.balance}</span>
    <button class="btn remove" on:click={removeToken(token)}
      ><img src="/images/cross.png" alt="" /></button
    >
  </div>
</div>

<style>
  .card {
    position: relative;
    width: 150px;
  }

  .remove {
    position: absolute;
    padding: 10px;
    right: 0;
    top: 0;
  }

  img {
    width: 20px;
    height: 20px;
  }

  .name {
    font-weight: 500;
  }

  .balance {
    font-weight: 700;
  }
</style>
