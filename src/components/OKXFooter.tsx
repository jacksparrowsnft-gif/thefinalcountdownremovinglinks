import { Globe, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import okxQrCode from "@/assets/okx-qr-code.png";

const footerSections = [
  {
    title: "More about OKX",
    links: [
      { label: "About us", href: "https://www.okx.com/en-eu/about" },
      { label: "Candidate Privacy Notice", href: "https://www.okx.com/en-eu/candidate-privacy-notice" },
      { label: "Careers", href: "https://www.okx.com/en-eu/careers" },
      { label: "Contact us", href: "https://www.okx.com/en-eu/contact" },
      { label: "Terms of Service", href: "https://www.okx.com/en-eu/terms-of-service" },
      { label: "Privacy Notice", href: "https://www.okx.com/en-eu/privacy-policy" },
      { label: "Disclosures", href: "https://www.okx.com/en-eu/disclosures" },
      { label: "OKX app", href: "https://www.okx.com/en-eu/download" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Buy crypto", href: "https://www.okx.com/en-eu/buy-crypto" },
      { label: "P2P trading", href: "https://www.okx.com/en-eu/p2p-markets" },
      { label: "Convert", href: "https://www.okx.com/en-eu/convert" },
      { label: "Trade", href: "https://www.okx.com/en-eu/trade-spot" },
      { label: "Earn", href: "https://www.okx.com/en-eu/earn" },
      { label: "Trading bots", href: "https://www.okx.com/en-eu/trading-bot" },
      { label: "All cryptocurrencies", href: "https://www.okx.com/en-eu/markets/prices" },
      { label: "Learn", href: "https://www.okx.com/en-eu/learn" },
      { label: "TradingView", href: "https://www.okx.com/en-eu/tradingview" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Affiliate", href: "https://www.okx.com/en-eu/affiliates" },
      { label: "API", href: "https://www.okx.com/docs-v5/en/" },
      { label: "Historical market data", href: "https://www.okx.com/en-eu/historical-market-data" },
      { label: "CEX fee schedule", href: "https://www.okx.com/en-eu/fees" },
      { label: "Listing application", href: "https://www.okx.com/en-eu/listing-application" },
      { label: "P2P Merchant application", href: "https://www.okx.com/en-eu/p2p-markets/merchant" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Support center", href: "https://www.okx.com/en-eu/help" },
      { label: "Channel verification", href: "https://www.okx.com/en-eu/official-verification" },
      { label: "Announcements", href: "https://www.okx.com/en-eu/help/section/announcements" },
      { label: "Connect with OKX", href: "https://www.okx.com/en-eu/community" },
      { label: "Formal complaints", href: "https://www.okx.com/en-eu/help/formal-complaints" },
    ],
  },
  {
    title: "Buy crypto",
    links: [
      { label: "Buy USDC", href: "https://www.okx.com/en-eu/buy-usdc" },
      { label: "Buy Bitcoin", href: "https://www.okx.com/en-eu/buy-bitcoin" },
      { label: "Buy Ethereum", href: "https://www.okx.com/en-eu/buy-ethereum" },
      { label: "Buy ADA", href: "https://www.okx.com/en-eu/buy-cardano" },
      { label: "Buy Solana", href: "https://www.okx.com/en-eu/buy-solana" },
      { label: "Buy Litecoin", href: "https://www.okx.com/en-eu/buy-litecoin" },
      { label: "Buy XRP", href: "https://www.okx.com/en-eu/buy-xrp" },
    ],
  },
  {
    title: "Trade",
    links: [
      { label: "BTC USDC", href: "https://www.okx.com/en-eu/trade-spot/btc-usdc" },
      { label: "ETH USDC", href: "https://www.okx.com/en-eu/trade-spot/eth-usdc" },
      { label: "PI USDT", href: "https://www.okx.com/en-eu/trade-spot/pi-usdt" },
      { label: "Bitcoin price", href: "https://www.okx.com/en-eu/price/bitcoin-btc" },
      { label: "Ethereum price", href: "https://www.okx.com/en-eu/price/ethereum-eth" },
      { label: "Solana price", href: "https://www.okx.com/en-eu/price/solana-sol" },
      { label: "XRP price", href: "https://www.okx.com/en-eu/price/xrp-xrp" },
    ],
  },
];

const socialLinks = [
  { name: "X", icon: "𝕏", href: "https://x.com/okx" },
  { name: "Instagram", icon: "📷", href: "https://www.instagram.com/okx_official" },
  { name: "Telegram", icon: "✈️", href: "https://t.me/OKXOfficial_English" },
  { name: "Facebook", icon: "📘", href: "https://www.facebook.com/okaborat" },
  { name: "YouTube", icon: "▶️", href: "https://www.youtube.com/okxofficial" },
];

export function OKXFooter() {
  return (
    <footer className="w-full bg-background border-t border-border/30 pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Language Selector */}
        <div className="mb-8">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border/50 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Globe className="w-4 h-4" />
            English/EUR
          </button>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* App Download Section */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              Trade on the go with OKX
            </h3>
            <Button
              variant="outline"
              className="w-full mb-4 rounded-full border-foreground text-foreground hover:bg-foreground hover:text-background"
            >
              Register
            </Button>
            <div className="w-32 h-32 bg-foreground rounded-lg p-2 mx-auto">
              <img 
                src={okxQrCode} 
                alt="Scan to download OKX app" 
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Scan to download OKX app
            </p>
          </div>
        </div>

        {/* Community Section */}
        <div className="flex items-center gap-4 mb-8">
          <span className="font-semibold text-foreground">Community</span>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.name}
              >
                <span className="text-lg">{social.icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30 border border-border/30">
          <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            OKX Europe Limited operating under the trade name OKX is now a crypto-assets trading platform
            authorised as a Crypto-Asset Services Provider by MFSA pursuant to Article 28 of the Markets
            in Crypto-Assets Act (Chapter 647 of the Laws of Malta).
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border/30">
          <p className="text-xs text-muted-foreground text-center">
            © 2017 - 2025 OKX.COM
          </p>
        </div>
      </div>
    </footer>
  );
}
