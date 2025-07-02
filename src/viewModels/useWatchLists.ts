import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getWatchlists,
  addWatchList,
  getStocksInList,
  addStockToLists,
  removeStockFromList,
} from '../services/watchListServices';
import { Watchlist } from '../screens/watchListScreen/types';

export function useWatchlists() {
  const qc = useQueryClient();

  const listsQ = useQuery<Watchlist[], Error>({
    queryKey: ['watchlists'],
    queryFn: getWatchlists,
    staleTime: 0,
    // cacheTime: 1000 * 60 * 60 * 24,
  });

  const createListM = useMutation<void, Error, string>({
    mutationFn: addWatchList,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['watchlists'] });
    },
  });

  return { listsQ, createListM };
}

export function useStocksInList(listId: string) {
  const qc = useQueryClient();

  const itemsQ = useQuery<string[], Error>({
    queryKey: ['watchlistItems', listId],
    queryFn: () => getStocksInList(listId),
  });

  const addStockM = useMutation<void, Error, string>({
    mutationFn: (ticker) => addStockToLists(ticker, [listId]),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['watchlistItems', listId] });
    },
  });

  const removeStockM = useMutation<void, Error, string>({
    mutationFn: (ticker) => removeStockFromList(ticker, listId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['watchlistItems', listId] });
    },
  });

  return { itemsQ, addStockM, removeStockM };
}
