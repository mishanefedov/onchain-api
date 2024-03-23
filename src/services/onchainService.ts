import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(
    process.env.ALCHEMY_ETHEREUM_NODE_URL
);


export async function getTokenData(tokenAddress: string){
  try {
    const erc20Abi = [
      "function name() view returns (string)",
      "function symbol() view returns (string)",
      "function decimals() view returns (uint8)",
      "function totalSupply() view returns (uint256)",
    ];
    const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, provider);
    const name = await tokenContract.name();
    const symbol = await tokenContract.symbol();
    const decimals = await tokenContract.decimals();
    const totalSupply = await tokenContract.totalSupply();

    const tokenData = {
      name,
      symbol,
      decimals,
      totalSupply: totalSupply.toString(),
    };

    return tokenData
  } catch (error) {
    console.error('Error fetching token data:', error);
  }
}

export async function getTokenHolders(tokenAddress: string, latestBlockCount = 100) {
  try {
    const provider = new ethers.AlchemyProvider("homestead", process.env.ALCHEMY_API_KEY);
    const erc20Abi = [
      "function balanceOf(address owner) view returns (uint256)",
      "event Transfer(address indexed from, address indexed to, uint amount)"
    ];
    const tokenContract = new ethers.Contract(tokenAddress, erc20Abi, provider);
    const toBlock = await provider.getBlockNumber();
    let fromBlock = toBlock - latestBlockCount;

    const addressSet = new Set<string>();

    while (fromBlock < toBlock){
      const events = await tokenContract.queryFilter(tokenContract.filters.Transfer(), fromBlock, fromBlock + 9);
      events.forEach(event => {
        const topics = event.toJSON().topics;
        addressSet.add(removeLeadingZerosFromAddress(topics[1]));
        addressSet.add(removeLeadingZerosFromAddress(topics[2]));
      });
      fromBlock += 10;
    }

    const holders = new Map<string, string>();

    for (const address of addressSet) {
      try{
        const balance = await tokenContract.balanceOf(address);
      
        if (balance != 0) {
          const balanceInEther = ethers.formatEther(balance);
          holders.set(address, balanceInEther);
        }
      } catch (e) {

      }
    }
    console.log(`Found ${holders.size} holders with a non-zero balance.`);
    return [...holders];
  } catch (error) {
    console.error('Error identifying token holders:', error);
  }
}

function removeLeadingZerosFromAddress(address: string) {
  if (!address.startsWith('0x')) {
      throw new Error('Invalid address format');
  }
  let hexPart = address.slice(2);
  let trimmedAddress = '0x' + hexPart.replace(/^0+/, '');
  return trimmedAddress;
}
