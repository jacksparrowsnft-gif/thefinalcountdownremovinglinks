import { useEffect, useMemo, useState } from "react";
import type { VoteActivity } from "@/hooks/useTokenVoting";

interface RecentActivityProps {
  items: VoteActivity[];
}

function formatTimeAgo(createdAt: number, now: number) {
  const diffMs = Math.max(0, now - createdAt);
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 60) return "just now";

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;

  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;

  const diffDay = Math.floor(diffHr / 24);
  return `${diffDay}d ago`;
}

export function RecentActivity({ items }: RecentActivityProps) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  const activities = useMemo(() => (items ?? []).slice(0, 8), [items]);

  return (
    <section
      className="glass-card p-6 animate-fade-in"
      style={{ animationDelay: "0.2s" }}
      aria-label="Recent voting activity"
    >
      <h2 className="text-lg font-semibold mb-4">Recent activity</h2>

      <div className="space-y-3">
        {activities.map((activity) => (
          <article
            key={activity.id}
            className={`flex items-center justify-between text-sm ${
              activity.isNew ? "animate-slide-in-top" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  activity.vote === "YES" ? "bg-vote-yes" : "bg-vote-no"
                }`}
              />
              <span className="text-muted-foreground">
                {activity.wallet} voted{" "}
                <span
                  className={
                    activity.vote === "YES" ? "text-vote-yes" : "text-vote-no"
                  }
                >
                  {activity.vote}
                </span>
              </span>
            </div>
            <span className="text-muted-foreground text-xs">
              {formatTimeAgo(activity.createdAt, now)}
            </span>
          </article>
        ))}

        {activities.length === 0 && (
          <p className="text-sm text-muted-foreground">No votes yet.</p>
        )}
      </div>
    </section>
  );
}

