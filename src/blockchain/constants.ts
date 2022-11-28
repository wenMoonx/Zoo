export const defaultChainId = 5;

export const rpcUrls = {
  1337: "http://localhost:8545",
  56: "https://bsc-dataseed1.binance.org",
  97: "https://data-seed-prebsc-1-s1.binance.org:8545",
  1: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161/",
  5: "https://goerli.infura.io/v3/",
};

export const networkNames = {
  // 1: 'Ethereum Mainnet',
  1337: "Localhost8545",
  56: "BSC Main Network",
  97: "BSC Test Network",
  1: "Ethereum Mainnet",
  5: "Goerli Test Network",
};

export const addresses = {
  coinStreamer: {
    97: "0x7CAB7053ca06a485911CFC50Ff9D3818832D87c1",
  },
  zooToken: {
    1: "0x56B8b6f244d5012d9bA1EF6370DCEb15CFDEBB9C",
    5: "0x691cB37176fdAd9d63cd4D3AAA98335B72B23359",
  },
  usdt: {
    1: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    5: "0x7168908edE8D8578f3695F479DB52F3A1c22d975",
  },
  sale: {
    1: "0x858f10D8760d4590bFcF9F36B0e46da4d6538E2b",
    5: "0xDa6EB641B374997930A2811bbEf0f3fB27b5DE81"
  }
};

export const decimal = 8;
