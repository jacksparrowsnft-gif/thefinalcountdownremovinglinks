import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TokenData, truncateAddress } from "@/lib/dexscreener";
import { VotingProgressBar } from "./VotingProgressBar";
import { VoteConfirmModal } from "./VoteConfirmModal";
import { toast } from "sonner";

interface TokenVoteCardProps {
  tokenData: TokenData | null;
  isLoading: boolean;
  yesVotes: number;
  noVotes: number;
  hasVoted: boolean;
  onVote: (voteType: "YES" | "NO") => boolean;
}

export function TokenVoteCard({
  tokenData,
  isLoading,
  yesVotes,
  noVotes,
  hasVoted,
  onVote,
}: TokenVoteCardProps) {
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [voteType, setVoteType] = useState<"YES" | "NO">("YES");

  const copyAddress = async () => {
    if (!tokenData?.address) return;
    await navigator.clipboard.writeText(tokenData.address);
    setCopied(true);
    toast.success("Address copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleVoteClick = (type: "YES" | "NO") => {
    if (hasVoted) {
      toast.error("You have already voted on this token!");
      return;
    }
    setVoteType(type);
    setModalOpen(true);
  };

  const handleConfirmVote = () => {
    const ok = onVote(voteType);
    if (!ok) {
      toast.error("You have already voted on this token!");
      return;
    }

    if (voteType === "YES") {
      toast.success("Vote recorded! You earned 25 XP");
    } else {
      toast.success("Vote recorded! Thanks for your feedback.");
    }
  };

  if (isLoading) {
    return (
      <div className="glass-card p-8 animate-pulse">
        <div className="space-y-4">
          <div className="h-8 bg-secondary rounded w-48" />
          <div className="h-6 bg-secondary rounded w-32" />
          <div className="h-4 bg-secondary rounded w-64" />
          <div className="h-10 bg-secondary rounded" />
          <div className="flex gap-4">
            <div className="h-12 bg-secondary rounded flex-1" />
            <div className="h-12 bg-secondary rounded flex-1" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="glass-card p-8 animate-fade-in" aria-label="Vote to list token">
        <div className="space-y-6">
          {/* Token Name & Symbol */}
          <header>
            <h1 className="text-3xl font-bold">
              {tokenData?.name || "Unknown Token"}
            </h1>
            <p className="text-xl text-accent font-medium">
              ({tokenData?.symbol || "???"})
            </p>
          </header>

          {/* Chain Badge */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-accent" />
              {tokenData?.chainName || "Unknown Chain"}
            </span>
          </div>

          {/* Voting Info */}
          <p className="text-muted-foreground">
            Voting in progress on <span className="text-link">OKX</span>. be
            part of the decision
          </p>

          {/* Contract Address */}
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">Contract:</span>
            <button
              onClick={copyAddress}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-muted transition-colors text-sm font-mono"
            >
              {tokenData ? truncateAddress(tokenData.address) : "..."}
              {copied ? (
                <Check className="w-3.5 h-3.5 text-vote-yes" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-muted-foreground" />
              )}
            </button>
          </div>

          {/* Voting Progress */}
          <VotingProgressBar yesVotes={yesVotes} noVotes={noVotes} />

          {/* Vote Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={() => handleVoteClick("YES")}
              disabled={hasVoted}
              className="flex-1 h-12 text-base font-semibold bg-vote-yes hover:bg-vote-yes-glow text-primary-foreground glow-green disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Vote to list
            </Button>
            <Button
              onClick={() => handleVoteClick("NO")}
              disabled={hasVoted}
              className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-vote-no to-accent hover:opacity-90 text-primary-foreground glow-pink disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Not now
            </Button>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground">
            * These are real-time vote totals. Anti-spam and deduplication are
            enforced. YES votes earn <span className="text-link">OKX</span> in the app.
          </p>
        </div>
      </section>

      <VoteConfirmModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        voteType={voteType}
        tokenData={tokenData}
        onConfirm={handleConfirmVote}
      />
    </>
  );
}

