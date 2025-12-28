interface TokenImageProps {
  logoUrl: string | null;
  name: string;
  isLoading: boolean;
}

export function TokenImage({ logoUrl, name, isLoading }: TokenImageProps) {
  if (isLoading) {
    return (
      <div className="relative w-full max-w-md aspect-square animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-vote-yes/20 rounded-full blur-3xl" />
        <div className="relative w-full h-full rounded-full bg-secondary" />
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md aspect-square animate-fade-in">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-vote-yes/20 rounded-full blur-3xl animate-pulse-glow" />

      {/* Token Image */}
      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-card to-secondary overflow-hidden border border-border/50 flex items-center justify-center">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={name}
            className="w-4/5 h-4/5 object-contain rounded-full"
          />
        ) : (
          <span className="text-8xl">🪙</span>
        )}
      </div>

      {/* Decorative particles */}
      <div className="absolute top-1/4 right-0 w-3 h-3 bg-accent/50 rounded-full blur-sm animate-pulse" />
      <div className="absolute bottom-1/3 left-0 w-2 h-2 bg-vote-yes/50 rounded-full blur-sm animate-pulse" style={{ animationDelay: "0.5s" }} />
      <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-foreground/30 rounded-full" />
    </div>
  );
}
