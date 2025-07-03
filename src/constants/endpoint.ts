export const ALPHA_VANTAGE_BASE = 'https://www.alphavantage.co/query';
export const API_KEY = '5C2NHMMO04LNEUSH';

export const ENDPOINTS = {
  EXPLORE: { function: 'TOP_GAINERS_LOSERS', apikey: API_KEY },
  OVERVIEW: {function: 'OVERVIEW' , apikey: API_KEY},
  TIME_SERIES_DAILY:  { function: 'TIME_SERIES_DAILY', apikey: API_KEY, outputsize: 'compact' },
  SYMBOL_SEARCH : {function: 'SYMBOL_SEARCH', apikey: API_KEY},
};