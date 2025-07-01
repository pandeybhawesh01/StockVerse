export interface Stock {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
  volume: string;
}

export interface ExploreData {
  top_gainers: Stock[];
  top_losers: Stock[];
  most_actively_traded: Stock[];
}

export type StockSectionKey = 'gainers' | 'losers' | 'active';

export type StockStackParamList = {
  Explore: undefined;
  ViewAll: { section: StockSectionKey };
  Product: { ticker: string };
};
