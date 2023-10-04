<script>
  export let token;
  let amount;
  function setMaxAmount() {
    amount = token.balance;
  }
</script>

<div class="form-floating mb-3">
  <input
    type="text"
    class="form-control"
    id="floatingAddress"
    placeholder="Destination"
  />
  <label for="floatingAddress">Destination address</label>
</div>
<div class="form-floating mb-3">
  <input
    type="text"
    class="form-control"
    id="floatingAmount"
    placeholder="Amount"
    bind:value={amount}
  />
  <label for="floatingAmount">Amount</label>
</div>
<div class="button-group">
  <button class="btn btn-secondary" on:click={setMaxAmount}>Use Max</button>
  <button class="btn btn-primary"> Transfer </button>
</div>

<style>
  .button-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
