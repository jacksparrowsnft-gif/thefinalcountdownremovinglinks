import { Link } from "react-router-dom";
import { ChevronDown, Download, Bell, HelpCircle, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Deposit", hasDropdown: true, href: "https://www.okx.com/en-eu/balance/deposit" },
  { label: "Markets", hasDropdown: false, href: "https://www.okx.com/en-eu/markets" },
  { label: "Trade", hasDropdown: true, href: "https://www.okx.com/en-eu/trade-spot" },
  { label: "Grow", hasDropdown: true, href: "https://www.okx.com/en-eu/earn" },
  { label: "Institutional", hasDropdown: true, href: "https://www.okx.com/en-eu/institutions" },
  { label: "Learn", hasDropdown: true, href: "https://www.okx.com/en-eu/learn" },
  { label: "More", hasDropdown: true, href: "https://www.okx.com/en-eu/explore" },
];

export function OKXHeader() {
  return (
    <header className="w-full bg-background border-b border-border/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo and Nav */}
          <div className="flex items-center gap-6">
            {/* OKX Logo */}
            <Link to="/" className="flex items-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/OKX_logo.svg/1200px-OKX_logo.svg.png" 
                alt="OKX" 
                className="h-6 w-auto invert"
              />
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.label}
                  {item.hasDropdown && <ChevronDown className="w-3 h-3" />}
                </a>
              ))}
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Action Icons */}
            <div className="hidden md:flex items-center gap-2">
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="w-4 h-4" />
              </button>
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <HelpCircle className="w-4 h-4" />
              </button>
              <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Globe className="w-4 h-4" />
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2">
              <a href="https://www.okx.com/en-eu/account/login" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  Log in
                </Button>
              </a>
              <a href="https://www.okx.com/en-eu/account/register" target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-4">
                  Sign up
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
