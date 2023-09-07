<script>
    import {ethers} from 'ethers';
    import { TOKEN_ADDRESS, TOKEN_ABI} from '../../api/contract';
    export let accAddress;
    export let signer;
    let transferTo;
    let amount;

    async function transferTokens() {
        try {
            const tokenContract = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer);
            const tx = await tokenContract.transfer(transferTo, amount);
            await tx.wait();
        } catch (error) {
            console.error(error);
        }
    }
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
         <button class="btn btn-primary" on:click={transferTokens}>
            Transfer
          </button>
    </div>
 </div>
