export interface CompanyOverview {
  Symbol: string;
  Name: string;
  Description: string;
  Sector: string;
  Industry: string;
}

export interface TimeSeriesDaily {
  'Time Series (Daily)': {
    [date: string]: {
      '1. open': string;
      '4. close': string;
    };
  };
}