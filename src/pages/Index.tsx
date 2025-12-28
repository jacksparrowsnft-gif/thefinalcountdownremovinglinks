import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OKXHeader } from "@/components/OKXHeader";
import { OKXFooter } from "@/components/OKXFooter";
import { ArrowRight, Coins, Vote, Sparkles } from "lucide-react";

const EXAMPLE_TOKENS = [
  { name: "Example: Solana Token", address: "So11111111111111111111111111111111111111112" },
  { name: "Example: BONK", address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263" },
];

export default function Index() {
  const [tokenAddress, setTokenAddress] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenAddress.trim()) {
      navigate(`/vote/${tokenAddress.trim()}`);
    }
  };

  const handleExampleClick = (address: string) => {
    navigate(`/vote/${address}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-vote-yes/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        <OKXHeader />

        <main className="container mx-auto px-4 py-16 flex-1">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            {/* Hero */}
            <div className="space-y-4 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Vote on token listings.
                <br />
                <span className="text-accent">Earn XP.</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                Enter a token contract address to view its voting page. Your vote
                helps decide which tokens get listed on OKX.
              </p>
            </div>

            {/* Search Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <Input
                type="text"
                placeholder="Enter token contract address..."
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                className="flex-1 h-12 bg-secondary border-border/50 text-base px-4 font-mono text-sm"
              />
              <Button
                type="submit"
                disabled={!tokenAddress.trim()}
                className="h-12 px-6 bg-vote-yes hover:bg-vote-yes-glow text-primary-foreground font-semibold glow-green"
              >
                View Vote Page
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            {/* Example Tokens */}
            <div
              className="space-y-3 animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <p className="text-sm text-muted-foreground">Try an example:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {EXAMPLE_TOKENS.map((token) => (
                  <button
                    key={token.address}
                    onClick={() => handleExampleClick(token.address)}
                    className="px-4 py-2 rounded-lg bg-secondary hover:bg-muted transition-colors text-sm font-medium"
                  >
                    {token.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div
              className="grid sm:grid-cols-3 gap-6 pt-12 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="glass-card p-6 space-y-3">
                <Coins className="w-8 h-8 text-accent" />
                <h3 className="font-semibold">Token Discovery</h3>
                <p className="text-sm text-muted-foreground">
                  Find and vote on tokens from Dexscreener in real-time.
                </p>
              </div>
              <div className="glass-card p-6 space-y-3">
                <Vote className="w-8 h-8 text-vote-yes" />
                <h3 className="font-semibold">Community Voting</h3>
                <p className="text-sm text-muted-foreground">
                  Your vote helps determine which tokens get listed.
                </p>
              </div>
              <div className="glass-card p-6 space-y-3">
                <Sparkles className="w-8 h-8 text-vote-no" />
                <h3 className="font-semibold">Earn Rewards</h3>
                <p className="text-sm text-muted-foreground">
                  YES votes earn OKX for exclusive perks.
                </p>
              </div>
            </div>
          </div>
        </main>

        <OKXFooter />
      </div>
    </div>
  );
}
