import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALPHA_VANTAGE_BASE, ENDPOINTS } from '../constants/endpoint';
import { CompanyOverview, TimeSeriesDaily } from '../screens/StockDetailsScreen/types';
import { ExploreData } from '../screens/exploreScreen/types';

const STORAGE_TTL = 1000 * 60 * 60 * 24; // 24h

export async function fetchExploreData(): Promise<ExploreData> {
  const cacheKey = 'cache_explore_data';
  const now = Date.now();
  const raw = await AsyncStorage.getItem(cacheKey);

  if (raw) {
    try {
      const { timestamp, data } = JSON.parse(raw) as {
        timestamp: number;
        data: ExploreData;
      };
      if (now - timestamp < STORAGE_TTL) {
        return data;
      }
    } catch(e) {
      console.warn('Invalid or corrupted cache for key:', cacheKey, e);
    }
  }

  const res = await axios.get(ALPHA_VANTAGE_BASE, { params: ENDPOINTS.EXPLORE });
  const payload = res.data as ExploreData;
  await AsyncStorage.setItem(
    cacheKey,
    JSON.stringify({ timestamp: now, data: payload })
  );
  return payload;
}

export async function fetchOverview(symbol: string): Promise<CompanyOverview> {
  const cacheKey = `cache_overview_${symbol}`;
  const now = Date.now();
  const raw = await AsyncStorage.getItem(cacheKey);

  if (raw) {
    try {
      const { timestamp, data } = JSON.parse(raw) as {
        timestamp: number;
        data: CompanyOverview;
      };
      if (
        now - timestamp < STORAGE_TTL &&
        
        typeof data.Symbol === 'string' &&
        data.Symbol.length > 0 &&
        typeof data.Name === 'string' &&
        data.Name.length > 0
      ) {
        return data;
      }
    } catch(e) {
      console.warn('Invalid or corrupted cache for key:', cacheKey, e);
      await AsyncStorage.removeItem(cacheKey);
    }
  }

  const res = await axios.get(ALPHA_VANTAGE_BASE, {
    params: { ...ENDPOINTS.OVERVIEW, symbol },
  });
  const json = res.data;

  if (json.Note || json.Information) {
    throw new Error(json.Note ?? json.Information);
  }

  const overview = json as CompanyOverview;
  await AsyncStorage.setItem(
    cacheKey,
    JSON.stringify({ timestamp: now, data: overview })
  );
  return overview;
}

export async function fetchDailySeries(
  symbol: string
): Promise<TimeSeriesDaily> {
  const cacheKey = `cache_series_${symbol}`;
  const now = Date.now();
  const raw = await AsyncStorage.getItem(cacheKey);

  if (raw) {
    try {
      const { timestamp, data } = JSON.parse(raw) as {
        timestamp: number;
        data: TimeSeriesDaily;
      };
      if (now - timestamp < STORAGE_TTL) {
        return data;
      }
    } catch(e) {
      console.warn('Invalid or corrupted cache for key:', cacheKey, e);
    }
  }

  console.log(`Fetching new series for ${symbol}`);
  const res = await axios.get(ALPHA_VANTAGE_BASE, {
    params: {
      ...ENDPOINTS.TIME_SERIES_DAILY,
      symbol,
      outputsize: 'compact',
    },
  });
  const json = res.data;

  if (json.Note || json.Information) {
    throw new Error(json.Note ?? json.Information);
  }

  const series = json as TimeSeriesDaily;
  await AsyncStorage.setItem(
    cacheKey,
    JSON.stringify({ timestamp: now, data: series })
  );
  return series;
}
