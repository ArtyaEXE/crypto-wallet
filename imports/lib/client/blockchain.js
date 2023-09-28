import {ethers} from 'ethers';
import {writable} from 'svelte/store';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

// Current active provider
let provider = null;

//Detect chain ID

// sChainId = svelte chain ID
export const sChainId = writable(0);

// rChainId = reactive chain ID
const rChainId = new ReactiveVar(0);

function chainChanged(chain)
{
    chain = Number(chain);
    sChainId.set(chain);
    rChainId.set(chain);

    if (chain)
    {
        console.log('Blockchain connected, chain: ' + chain);
    }
    else console.log('Blockchain disconnected');
}

// Detect selected account
export const sAddress = writable('');
const rAddress = new ReactiveVar('');
let address = '';

function accountsChanged(accounts)
{
    if (accounts.length)
    {
        address = accounts[0].toLowerCase();
        sAddress.set(address);
        rAddress.set(address);
    }
    else
    {
        address = '';
        sAddress.set('');
        rAddress.set('');
    }
}

// Initial connect
async function enable()
{
    if (rAddress.curValue) return console.log('Blockchain: already connected');

    try {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        address = await provider.send("eth_requestAccounts", []);
    }
    catch (ex)
    {
        console.log('Blockchain:', ex);
        provider = null;
    }

    provider.on('accountsChanged', accountsChanged);

    const signer = provider.getSigner();
    const address = await signer.getAddress();
    accountsChanged([address]);
    console.log(address)
}

Meteor.startup(()=>
{	
	Tracker.autorun(()=>
	{
		const chain = rChainId.get();
		const address = rAddress.get();
	});
});

export const Blockchain = {
    rChainId,
    rAddress,
    
    enable,
};
export const BC = Blockchain;
