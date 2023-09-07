<script>
    import {ethers} from 'ethers';

    export let accAddress
    let transferTo
    let amount
</script>


<div class="card">
    <div class="card-body">
<p>Your address: {accAddress}</p>
        <div class="form-floating mb-3">
            <input type="email" class="form-control" id="floatingAddress" 
            bind:value={transferTo}
            placeholder="Destination">
            <label for="floatingAddress">Destination address</label>
         </div>
         <div class="form-floating mb-3">
            <input type="number" class="form-control" id="floatingAmount" 
            bind:value={amount}
            placeholder="Amount">
            <label for="floatingAmount">Amount</label>
         </div>
         <button class="btn btn-primary">
            Transfer
          </button>
    </div>
 </div>
