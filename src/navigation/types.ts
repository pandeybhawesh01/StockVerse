export type StockStackParamList = {
    Explore : undefined;
    ViewAll : {section : 'gainers' | 'losers'};
    Product : {symbol : string};
    WatchlistDetail: {listId: string , name : string};
    Search: undefined; 
}

export type WatchlistStackParamList = {
  Watchlist: undefined;
  Product: { symbol: string };
  WatchlistDetail: {listId: string , name : string};
};

export type RootStackParamList = {
  MainTabs: undefined;
};