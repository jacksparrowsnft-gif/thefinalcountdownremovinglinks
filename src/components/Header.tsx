export function Header() {
  return (
    <header className="w-full py-4 px-6">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight">
          <span className="text-foreground">OK</span>
          <span className="text-accent">X</span>
        </h1>
        <span className="px-2 py-1 text-xs rounded-md bg-secondary text-muted-foreground">
          Powered by OKX
        </span>
      </div>
    </header>
  );
}
