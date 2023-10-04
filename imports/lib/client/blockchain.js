import { ethers } from "ethers";
import { writable } from "svelte/store";
import { ReactiveVar } from "meteor/reactive-var";
import { TOKEN_ABI } from "../../api/contract";

// Current active provider
export let provider = null;

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
    addedTokens = [];
    rTokens.set(addedTokens);
    sTokens.set(addedTokens);
    tokens.forEach((token) => {
      if (token.chain === chain) {
        loadTokenData(token.address);
      }
    });
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
}

// Add tokens
export const sTokens = writable([]);
const rTokens = new ReactiveVar([]);
let addedTokens = [];
let tokens = JSON.parse(localStorage.getItem("tokens")) || [];

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
// Load token info
async function loadTokenData(tokenAddress) {
  try {
    const newToken = await getTokenInfo(tokenAddress);
    if (newToken) {
      addToTokens(newToken);
    }
  } catch (ex) {
    console.log(ex);
  }
}

async function getTokenInfo(tokenAddress) {
  try {
    const contract = new ethers.Contract(tokenAddress, TOKEN_ABI, provider);
    const name = await contract.name();
    const symbol = await contract.symbol();
    const balanceBN = await contract.balanceOf(address);
    const balance = ethers.utils.formatUnits(balanceBN, 18);
    return {
      address: tokenAddress,
      name,
      symbol,
      balance,
    };
  } catch (ex) {
    console.log(ex);
    return null;
  }
}

function addToTokens(newToken) {
  addedTokens.push(newToken);
  sTokens.set(addedTokens);
  rTokens.set(addedTokens);
}

//Transfer token
async function transferTokens(contractAddress, toAddress, amount) {
  try {
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, TOKEN_ABI, signer);
    const transaction = await contract.transfer(toAddress, amount);
    await transaction.wait();
    console.log("Перевод выполнен успешно");
    const tokenToUpdateIndex = addedTokens.findIndex(
      (token) => token.address === contractAddress
    );

    if (tokenToUpdateIndex !== -1) {
      const tokenToUpdate = addedTokens[tokenToUpdateIndex];

      const balanceBN = await contract.balanceOf(address);
      tokenToUpdate.balance = ethers.utils.formatUnits(balanceBN, 18);

      addedTokens[tokenToUpdateIndex] = tokenToUpdate;
      sTokens.set([...addedTokens]);
      rTokens.set([...addedTokens]);
    }
  } catch (ex) {
    console.error(ex);
    console.log("Не удалось выполнить перевод");
  }
}

export const Blockchain = {
  rChainId,
  rAddress,

  enable,
  addToken,
  transferTokens,
};
export const BC = Blockchain;
