import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type VoteType = "YES" | "NO";

export interface VoteActivity {
  id: string;
  wallet: string;
  vote: VoteType;
  createdAt: number; // unix ms
  isNew?: boolean; // used for animation
}

type Votes = { yes: number; no: number };

const STORAGE_PREFIX = "okxvote";
const MAX_ACTIVITIES = 20;
const AUTO_VOTE_INTERVAL_MS = 10_000;

function hashToSeed(input: string) {
  // FNV-1a 32-bit
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function rng() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function randomWallet() {
  const left = Math.random().toString(36).slice(2, 6);
  const right = Math.random().toString(36).slice(2, 6);
  return `${left}...${right}`;
}

function walletDisplayFromRng(rng: () => number) {
  const left = Math.floor(rng() * 36 ** 4)
    .toString(36)
    .padStart(4, "0")
    .slice(0, 4);
  const right = Math.floor(rng() * 36 ** 4)
    .toString(36)
    .padStart(4, "0")
    .slice(0, 4);
  return `${left}...${right}`;
}

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function seededInitialState(tokenAddress: string): {
  votes: Votes;
  activities: VoteActivity[];
} {
  const seed = hashToSeed(tokenAddress.toLowerCase());
  const rng = mulberry32(seed);

  // Keep totals in the same "feel" as the screenshot: ~70% progress towards 500.
  const total = 300 + Math.floor(rng() * 120); // 300..419
  const yes = Math.floor(total * (0.62 + rng() * 0.12)); // 62%..74%
  const no = Math.max(0, total - yes);

  const now = Date.now();
  const minuteOffsets = [0, 0, 1, 2, 2, 3, 3, 4];
  const activities: VoteActivity[] = minuteOffsets.map((m, idx) => {
    const vote: VoteType = rng() > 0.38 ? "YES" : "NO";
    return {
      id: `seed_${idx}`,
      wallet: walletDisplayFromRng(rng),
      vote,
      createdAt: now - m * 60_000 - Math.floor(rng() * 25_000),
    };
  });

  return { votes: { yes, no }, activities };
}

function getOrCreateClientWallet(): string {
  const key = `${STORAGE_PREFIX}:client_wallet`;
  const existing = safeJsonParse<string>(localStorage.getItem(key));
  if (existing) return existing;

  const wallet = `${Math.random().toString(36).slice(2, 6)}...${Math.random()
    .toString(36)
    .slice(2, 6)}`;

  localStorage.setItem(key, JSON.stringify(wallet));
  return wallet;
}

export function useTokenVoting(tokenAddress?: string) {
  const votesKey = useMemo(
    () => (tokenAddress ? `${STORAGE_PREFIX}:votes:${tokenAddress}` : null),
    [tokenAddress]
  );
  const activityKey = useMemo(
    () => (tokenAddress ? `${STORAGE_PREFIX}:activity:${tokenAddress}` : null),
    [tokenAddress]
  );
  const votedKey = useMemo(
    () => (tokenAddress ? `${STORAGE_PREFIX}:voted:${tokenAddress}` : null),
    [tokenAddress]
  );

  const [votes, setVotes] = useState<Votes>({ yes: 0, no: 0 });
  const [activities, setActivities] = useState<VoteActivity[]>([]);
  const [hasVoted, setHasVoted] = useState(false);

  // Track whether initial load is done to avoid auto votes before hydration
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!tokenAddress || !votesKey || !activityKey || !votedKey) return;

    const storedVotes = safeJsonParse<Votes>(localStorage.getItem(votesKey));
    const storedActivities = safeJsonParse<VoteActivity[]>(
      localStorage.getItem(activityKey)
    );

    if (storedVotes && typeof storedVotes.yes === "number" && typeof storedVotes.no === "number") {
      setVotes(storedVotes);
    } else {
      const seeded = seededInitialState(tokenAddress);
      setVotes(seeded.votes);
      localStorage.setItem(votesKey, JSON.stringify(seeded.votes));

      // Seed activity only if none exists.
      if (!storedActivities) {
        setActivities(seeded.activities);
        localStorage.setItem(activityKey, JSON.stringify(seeded.activities));
      }
    }

    if (storedActivities) {
      setActivities(storedActivities);
    }

    setHasVoted(localStorage.getItem(votedKey) === "1");
    initializedRef.current = true;
  }, [tokenAddress, votesKey, activityKey, votedKey]);

  // Auto-generate fake votes every 10 seconds
  useEffect(() => {
    if (!tokenAddress || !votesKey || !activityKey) return;

    const interval = window.setInterval(() => {
      if (!initializedRef.current) return;

      const voteType: VoteType = Math.random() > 0.35 ? "YES" : "NO";

      setVotes((prev) => {
        const next: Votes = {
          yes: prev.yes + (voteType === "YES" ? 1 : 0),
          no: prev.no + (voteType === "NO" ? 1 : 0),
        };
        localStorage.setItem(votesKey, JSON.stringify(next));
        return next;
      });

      setActivities((prev) => {
        const next: VoteActivity[] = [
          {
            id: `auto_${Date.now()}`,
            wallet: randomWallet(),
            vote: voteType,
            createdAt: Date.now(),
            isNew: true,
          },
          ...prev.map((a) => ({ ...a, isNew: false })),
        ].slice(0, MAX_ACTIVITIES);

        localStorage.setItem(activityKey, JSON.stringify(next));
        return next;
      });
    }, AUTO_VOTE_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [tokenAddress, votesKey, activityKey]);

  const castVote = useCallback(
    (voteType: VoteType) => {
      if (!tokenAddress || !votesKey || !activityKey || !votedKey) return false;
      if (localStorage.getItem(votedKey) === "1") return false;

      setVotes((prev) => {
        const next: Votes = {
          yes: prev.yes + (voteType === "YES" ? 1 : 0),
          no: prev.no + (voteType === "NO" ? 1 : 0),
        };
        localStorage.setItem(votesKey, JSON.stringify(next));
        return next;
      });

      setActivities((prev) => {
        const next: VoteActivity[] = [
          {
            id: `u_${Date.now()}`,
            wallet: getOrCreateClientWallet(),
            vote: voteType,
            createdAt: Date.now(),
            isNew: true,
          },
          ...prev.map((a) => ({ ...a, isNew: false })),
        ].slice(0, MAX_ACTIVITIES);

        localStorage.setItem(activityKey, JSON.stringify(next));
        return next;
      });

      localStorage.setItem(votedKey, "1");
      setHasVoted(true);
      return true;
    },
    [tokenAddress, votesKey, activityKey, votedKey]
  );

  return {
    yesVotes: votes.yes,
    noVotes: votes.no,
    activities,
    hasVoted,
    castVote,
  };
}
