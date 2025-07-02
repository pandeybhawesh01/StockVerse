import AsyncStorage from "@react-native-async-storage/async-storage";
import { Watchlists, WatchlistItems } from "../screens/watchListScreen/types";

const   KEY_LISTS = 'WATCHLISTS';
const   KEY_ITEMS = 'WATCHLISTS_ITEMS';

export async function getWatchlists(): Promise<Watchlists> {
    const raw = await AsyncStorage.getItem(KEY_LISTS);
    return raw ? JSON.parse(raw) : [];
}

export async function addWatchList(name:string): Promise<void> {
    const lists = await getWatchlists();
    const newList = {id: Date.now().toString(), name};
    lists.push(newList);
    await AsyncStorage.setItem(KEY_LISTS, JSON.stringify(lists));
}

export async function getItemsMap(): Promise<WatchlistItems> {
    const raw = await AsyncStorage.getItem(KEY_ITEMS);
    return raw ? JSON.parse(raw) : {};
}

export async function saveItemsMap(map: WatchlistItems): Promise<void> {
    await AsyncStorage.setItem(KEY_ITEMS, JSON.stringify(map));
}

export async function addStockToLists(
    ticker: string,
    listTds: string[]
): Promise<void> {
    const map = await getItemsMap();
    for(const id of listTds){
        const arr = map[id] || [];
        if(!arr.includes(ticker)) arr.push(ticker);
        map[id] = arr;
    }
    await saveItemsMap(map);
}

export async function removeStockFromList(
  ticker: string,
  listId: string
): Promise<void> {
  const map = await getItemsMap();
  if (map[listId]) {
    map[listId] = map[listId].filter((t) => t !== ticker);
    await saveItemsMap(map);
  }
}

export async function getStocksInList(listId: string): Promise<string[]> {
  const map = await getItemsMap();
  return map[listId] || [];
}