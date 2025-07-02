import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALPHA_VANTAGE_BASE, ENDPOINTS } from '../constants/endpoint';
import { ExploreData } from '../screens/exploreScreen/types';
import { CompanyOverview, TimeSeriesDaily } from '../screens/StockDetailsScreen/types';

const STORAGE_TTL = 1000 * 60 * 60 * 24; // 24h

async function fetchExploreData(): Promise<ExploreData> {
  const cacheKey = 'cache_explore_data';
  const now = Date.now();
  const raw = await AsyncStorage.getItem(cacheKey);

  if (raw) {
    const { timestamp, data } = JSON.parse(raw) as { timestamp: number; data: ExploreData };
    if (now - timestamp < STORAGE_TTL) {
      return data;
    }
  }

  const res = await axios.get(ALPHA_VANTAGE_BASE, { params: ENDPOINTS.EXPLORE });
  const payload = res.data as ExploreData;
  await AsyncStorage.setItem(cacheKey, JSON.stringify({ timestamp: now, data: payload }));
  return payload;
}
async function fetchOverview(symbol: string):Promise<CompanyOverview> {
  const key = `cache_overview_${symbol}`;
  const now = Date.now();
  const raw = await AsyncStorage.getItem(key);

  if(raw){
    const {timestamp, data} = JSON.parse(raw) as {timestamp: number; data: CompanyOverview};
    if(now - timestamp < STORAGE_TTL){
      return data;
    }
  }
  const res = await axios.get(ALPHA_VANTAGE_BASE, {params: {...ENDPOINTS.OVERVIEW, symbol}});
  await AsyncStorage.setItem(key, JSON.stringify({timestamp: now, data: res.data}));
  return res.data
}

async function fetchDailySeries(symbol: string): Promise<TimeSeriesDaily> {
  const key = `cache_series_${symbol}`;
  const now = Date.now();
  const raw = await AsyncStorage.getItem(key);

  if (raw) {
    const { timestamp, data } = JSON.parse(raw) as { timestamp: number; data: TimeSeriesDaily };
    if (now - timestamp < STORAGE_TTL) {
      return data;
    }
  }
  try {
    console.log(`Fetching new series for ${symbol}`);
    const res = await axios.get(ALPHA_VANTAGE_BASE, {
      params: {
        ...ENDPOINTS.TIME_SERIES_DAILY,  // should be { function: 'TIME_SERIES_DAILY', apikey: YOUR_KEY, outputsize: 'compact' }
        symbol,
      }
    });
    console.log("second (network) response:", res.data);

    await AsyncStorage.setItem(
      key,
      JSON.stringify({ timestamp: now, data: res.data as TimeSeriesDaily })
    );
    return res.data as TimeSeriesDaily;

  } catch (err) {
    console.error("Error fetching time series:", err);
    // Re‑throw so your React‑Query hook can handle isError
    throw err;
  }
}



export { fetchExploreData ,fetchOverview, fetchDailySeries};
