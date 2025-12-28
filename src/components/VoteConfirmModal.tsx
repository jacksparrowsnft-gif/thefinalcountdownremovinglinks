import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Star, TrendingDown } from "lucide-react";
import { TokenData, truncateAddress } from "@/lib/dexscreener";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { WalletConnectModal } from "./WalletConnectModal";

interface VoteConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  voteType: "YES" | "NO";
  tokenData: TokenData | null;
  onConfirm: () => void;
}

export function VoteConfirmModal({
  open,
  onOpenChange,
  voteType,
  tokenData,
  onConfirm,
}: VoteConfirmModalProps) {
  const isYes = voteType === "YES";
  const [showWalletModal, setShowWalletModal] = useState(false);

  const handleConfirmClick = () => {
    onOpenChange(false); // Close vote modal first
    setShowWalletModal(true);
  };

  const handleWalletSuccess = () => {
    onConfirm();
    onOpenChange(false);
    setShowWalletModal(false);
  };

  const handleWalletClose = () => {
    setShowWalletModal(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="glass-card border-border/50 max-w-md p-0 gap-0 overflow-hidden">
          <VisuallyHidden>
            <DialogTitle>Confirm your {voteType} vote</DialogTitle>
            <DialogDescription>Vote confirmation for {tokenData?.name}</DialogDescription>
          </VisuallyHidden>
          
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-4 top-4 z-10 rounded-full w-8 h-8 flex items-center justify-center bg-secondary hover:bg-muted transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="p-6 pb-4">

            {/* Token Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-full bg-secondary overflow-hidden flex items-center justify-center">
                {tokenData?.logoUrl ? (
                  <img
                    src={tokenData.logoUrl}
                    alt={tokenData.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl">🪙</span>
                )}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Voting {voteType} for
                </p>
                <h3 className="text-lg font-bold">
                  <span className="text-accent">
                    {tokenData?.name || "Token"} ({tokenData?.symbol || "???"})
                  </span>
                </h3>
                <p className="text-xs text-muted-foreground">
                  {tokenData ? truncateAddress(tokenData.address) : "..."}
                </p>
              </div>
            </div>

            {/* Confirm Title */}
            <h2 className="text-2xl font-bold">
              Confirm your{" "}
              <span className={isYes ? "text-vote-yes" : "text-vote-no"}>
                {voteType}
              </span>{" "}
              vote
            </h2>
          </div>

          <div className="px-6 pb-6 space-y-4">
            {/* Info Box */}
            <div className="glass-card p-4 border-border/30">
              <div className="flex items-start gap-3">
                {isYes ? (
                  <Star className="w-5 h-5 text-vote-yes mt-0.5" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-vote-no mt-0.5" />
                )}
                <div>
                  <p className="font-medium">
                    {isYes ? (
                      <>
                        You'll earn <span className="text-vote-yes">25 OKX</span>
                      </>
                    ) : (
                      "No XP for NO votes"
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {isYes
                      ? "These points unlock exclusive perks, early access to features, and future rewards in the OKX ecosystem."
                      : "NO votes don't earn OKX but help provide balanced community feedback on token listings. However, first-time voters will still receive 25XP."}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground">
              {isYes ? (
                <>
                  By voting YES, you're supporting{" "}
                  <span className="text-accent font-medium">
                    {tokenData?.name} ({tokenData?.symbol})
                  </span>{" "}
                  for potential listing. If this token reaches the community threshold,
                  it enters our review queue and could go live in the OKX app at
                  00:00 UTC the following day.
                </>
              ) : (
                <>
                  By voting NO, you're indicating that{" "}
                  <span className="font-medium">
                    {tokenData?.name} ({tokenData?.symbol})
                  </span>{" "}
                  might not be ready for listing yet. Your feedback helps maintain
                  quality standards in the OKX ecosystem.
                </>
              )}
            </p>

            {/* Buttons */}
            <div className="space-y-2 pt-2">
              <Button
                onClick={handleConfirmClick}
                className={`w-full h-12 text-base font-semibold ${
                  isYes
                    ? "bg-vote-yes hover:bg-vote-yes-glow text-primary-foreground glow-green"
                    : "bg-gradient-to-r from-vote-no to-accent hover:opacity-90 text-primary-foreground glow-pink"
                }`}
              >
                {isYes ? "Vote YES & Earn XP" : "Vote NO"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => onOpenChange(false)}
                className="w-full h-12 text-base font-medium"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Wallet Connect Modal */}
      <WalletConnectModal
        isOpen={showWalletModal}
        onClose={handleWalletClose}
        onSuccess={handleWalletSuccess}
      />
    </>
  );
}
