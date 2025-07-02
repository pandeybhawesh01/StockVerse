export interface Watchlist {
  id: string;
  name: string;
}

export type Watchlists = Watchlist[];

export type WatchlistItems = Record<string, string[]>;
