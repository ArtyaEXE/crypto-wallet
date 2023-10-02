import { ethers } from "ethers";
import { writable } from "svelte/store";
import { ReactiveVar } from "meteor/reactive-var";
import { Tracker } from "meteor/tracker";
import { Meteor } from "meteor/meteor";
import { TOKEN_ABI } from "../../api/contract";

// Current active provider
let provider = null;

//Detect chain ID
// sChainId = svelte chain ID
export const sChainId = writable(0);
// rChainId = reactive chain ID
const rChainId = new ReactiveVar(0);

function chainChanged(chain) {
  chain = Number(chain);
  sChainId.set(chain);
  rChainId.set(chain);
  if (chain) {
    console.log("Blockchain connected, chain: " + chain);
  } else console.log("Blockchain disconnected");
}

// Detect selected account
export const sAddress = writable("");
const rAddress = new ReactiveVar("");
let address = "";

function accountsChanged(accounts) {
  if (accounts.length) {
    address = accounts[0].toLowerCase();
    sAddress.set(address);
    rAddress.set(address);
    console.log("Address: " + address);
  } else {
    sAddress.set("");
    rAddress.set("");
    console.log("Address: none");
  }
}

// Initial connect
async function enable() {
  if (rAddress.curValue) return console.log("Blockchain: already connected");

  try {
    provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  } catch (ex) {
    console.log("Blockchain:", ex);
    provider = null;
  }
  provider.on("network", (newNet, oldNet) => {
    chainChanged(newNet.chainId);
  });
  provider.provider.on("accountsChanged", accountsChanged);
  const signer = provider.getSigner();
  const accounts = await provider.send("eth_requestAccounts", []);
  const address = await signer.getAddress();
  accountsChanged([address]);

  await tokens.forEach((token) => {
    if (token.chain === rChainId.curValue) {
      loadTokenData(token.address);
    }
  });
}

export const sTokens = writable([]);
const rTokens = new ReactiveVar([]);
const addedTokens = [];
let tokens = JSON.parse(localStorage.getItem("tokens")) || [];

export const sFalseTokens = writable([]);
const rFalseTokens = new ReactiveVar([]);
const falseTokens = [];

async function addToken(tokenAddress) {
  try {
    const trimmedTokenAddress = tokenAddress.trim();
    if (!trimmedTokenAddress) return;
    const network = await provider.getNetwork();
    const chain = network.chainId;
    tokens.push({
      address: trimmedTokenAddress,
      chain: chain,
    });

    localStorage.setItem("tokens", JSON.stringify(tokens));
    loadTokenData(trimmedTokenAddress);
  } catch (ex) {
    console.error(ex);
  }
}

async function loadTokenData(tokenAddress) {
  try {
    const token = new ethers.Contract(tokenAddress, TOKEN_ABI, provider);
    const name = await token.name();
    const symbol = await token.symbol();
    const balanceBN = await token.balanceOf(address);
    const balance = ethers.utils.formatUnits(balanceBN, 18);
    const newToken = {
      address: tokenAddress,
      name,
      symbol,
      balance,
    };
    addedTokens.push(newToken);
    sTokens.set(addedTokens);
    rTokens.set(addedTokens);
  } catch (ex) {
    console.log(ex);
    const newToken = {
      address: tokenAddress,
    };
    falseTokens.push(newToken);
    sFalseTokens.set(falseTokens);
    rFalseTokens.set(falseTokens);
  }
}

export const Blockchain = {
  rChainId,
  rAddress,

  enable,
  addToken,
};
export const BC = Blockchain;
