import { useMemo } from "react";

interface VotingProgressBarProps {
  yesVotes: number;
  noVotes: number;
}

export function VotingProgressBar({ yesVotes, noVotes }: VotingProgressBarProps) {
  const { yesPercent, noPercent, remaining } = useMemo(() => {
    const total = yesVotes + noVotes;
    const threshold = 500; // Example threshold for listing
    const currentPercent = Math.min((total / threshold) * 100, 100);
    const yesRatio = total > 0 ? (yesVotes / total) * currentPercent : 0;
    const noRatio = total > 0 ? (noVotes / total) * currentPercent : 0;
    return {
      yesPercent: yesRatio,
      noPercent: noRatio,
      remaining: Math.max(0, 100 - currentPercent),
    };
  }, [yesVotes, noVotes]);

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm font-medium">
        <span className="text-vote-yes">YES {yesVotes}</span>
        <span className="text-vote-no">NO {noVotes}</span>
      </div>
      <div className="h-2.5 bg-secondary rounded-full overflow-hidden flex">
        <div
          className="h-full bg-vote-yes transition-all duration-500 ease-out"
          style={{ width: `${yesPercent}%` }}
        />
        <div
          className="h-full bg-vote-no transition-all duration-500 ease-out"
          style={{ width: `${noPercent}%` }}
        />
      </div>
      <div className="text-right text-sm text-muted-foreground">
        {remaining.toFixed(1)}% left
      </div>
    </div>
  );
}
