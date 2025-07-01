export type StockStackParamList = {
    Explore : undefined;
    ViewAll : {section : 'gainers' | 'losers'};
    Product : {symbol : string};
}

export type WatchlistStackParamList = {
  Watchlist: undefined;
  Product: { symbol: string };
};

export type RootStackParamList = {
  MainTabs: undefined;
};