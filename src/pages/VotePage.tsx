import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OKXHeader } from "@/components/OKXHeader";
import { OKXFooter } from "@/components/OKXFooter";
import { TokenImage } from "@/components/TokenImage";
import { TokenVoteCard } from "@/components/TokenVoteCard";
import { RecentActivity } from "@/components/RecentActivity";
import { WhyVote } from "@/components/WhyVote";
import { fetchTokenData, TokenData } from "@/lib/dexscreener";
import { useTokenVoting } from "@/hooks/useTokenVoting";

export default function VotePage() {
  const { tokenAddress } = useParams<{ tokenAddress: string }>();
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const voting = useTokenVoting(tokenAddress);

  useEffect(() => {
    async function loadTokenData() {
      if (!tokenAddress) return;

      setIsLoading(true);
      const data = await fetchTokenData(tokenAddress);
      setTokenData(data);
      setIsLoading(false);
    }

    loadTokenData();
  }, [tokenAddress]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-vote-yes/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        <OKXHeader />

        <main className="container mx-auto px-4 py-8 flex-1">
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-8">
            {/* Token Image */}
            <div className="flex justify-center lg:justify-end">
              <TokenImage
                logoUrl={tokenData?.logoUrl || null}
                name={tokenData?.name || "Token"}
                isLoading={isLoading}
              />
            </div>

            {/* Voting Card */}
            <div className="lg:max-w-lg">
              <TokenVoteCard
                tokenData={tokenData}
                isLoading={isLoading}
                yesVotes={voting.yesVotes}
                noVotes={voting.noVotes}
                hasVoted={voting.hasVoted}
                onVote={voting.castVote}
              />
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <RecentActivity items={voting.activities} />
            <WhyVote />
          </div>
        </main>

        <OKXFooter />
      </div>
    </div>
  );
}
