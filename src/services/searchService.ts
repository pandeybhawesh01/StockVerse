import axios from 'axios';
import { ALPHA_VANTAGE_BASE, ENDPOINTS } from '../constants/endpoint';

export type SymbolMatch = {
  '1. symbol': string;
  '2. name': string;
  '3. type': string;
  '4. region': string;
  '5. marketOpen': string;
  '6. marketClose': string;
  '7. timezone': string;
  '8. currency': string;
  '9. matchScore': string;
};

export async function fetchSymbolSearch(keywords: string): Promise<SymbolMatch[]> {
  const res = await axios.get(ALPHA_VANTAGE_BASE, {
    params: {
      ...ENDPOINTS.SYMBOL_SEARCH,
      keywords,
    },
    timeout: 10000,
  });
  if (res.data.Note || res.data.Information) {
    throw new Error(res.data.Note ?? res.data.Information);
  }
  return res.data.bestMatches as SymbolMatch[];
}
