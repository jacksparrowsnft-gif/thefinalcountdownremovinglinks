// Dexscreener API integration for fetching token data
export interface TokenData {
  name: string;
  symbol: string;
  address: string;
  chainId: string;
  chainName: string;
  logoUrl: string | null;
  priceUsd: string | null;
  volume24h: number | null;
}

export interface DexscreenerPair {
  chainId: string;
  dexId: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  quoteToken: {
    address: string;
    name: string;
    symbol: string;
  };
  priceUsd: string;
  volume: {
    h24: number;
  };
  info?: {
    imageUrl?: string;
  };
}

export interface DexscreenerResponse {
  schemaVersion: string;
  pairs: DexscreenerPair[] | null;
}

const CHAIN_NAMES: Record<string, string> = {
  solana: "Solana",
  ethereum: "Ethereum",
  bsc: "BNB Chain",
  polygon: "Polygon",
  avalanche: "Avalanche",
  arbitrum: "Arbitrum",
  optimism: "Optimism",
  base: "Base",
  fantom: "Fantom",
};

export async function fetchTokenData(tokenAddress: string): Promise<TokenData | null> {
  try {
    const response = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch token data");
    }

    const data: DexscreenerResponse = await response.json();

    if (!data.pairs || data.pairs.length === 0) {
      return null;
    }

    // Get the pair with highest volume
    const pair = data.pairs.reduce((prev, current) =>
      (current.volume?.h24 || 0) > (prev.volume?.h24 || 0) ? current : prev
    );

    return {
      name: pair.baseToken.name,
      symbol: pair.baseToken.symbol,
      address: pair.baseToken.address,
      chainId: pair.chainId,
      chainName: CHAIN_NAMES[pair.chainId] || pair.chainId,
      logoUrl: pair.info?.imageUrl || null,
      priceUsd: pair.priceUsd,
      volume24h: pair.volume?.h24 || null,
    };
  } catch (error) {
    console.error("Error fetching token data:", error);
    return null;
  }
}

export function truncateAddress(address: string, startChars = 4, endChars = 4): string {
  if (address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}
