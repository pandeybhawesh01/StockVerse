import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ALPHA_VANTAGE_BASE, ENDPOINTS } from '../constants/endpoint';
import { ExploreData } from '../screens/exploreScreen/types';

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

export { fetchExploreData };
