export function WhyVote() {
  return (
    <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
      <h3 className="text-lg font-semibold mb-4">Why vote?</h3>
      <ul className="space-y-3 text-sm text-muted-foreground">
        <li className="flex items-start gap-2">
          <span className="text-foreground">•</span>
          <span>
            Each eligible YES vote grants{" "}
            <span className="text-link">OKX</span> — unlock perks & early
            features.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-foreground">•</span>
          <span>
            Strong sentiment moves this token into the internal review queue for
            potential listing in the{" "}
            <span className="text-link">OKX</span> app.
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-foreground">•</span>
          <span>
            A connected wallet is required to cast your vote. Each eligible YES
            vote earns <span className="text-link">OKX</span>
          </span>
        </li>
      </ul>
    </div>
  );
}
