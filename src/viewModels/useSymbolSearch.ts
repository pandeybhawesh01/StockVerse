import { useQuery } from '@tanstack/react-query';
import { fetchSymbolSearch, SymbolMatch } from '../services/searchService';

export function useSymbolSearch(keywords: string) {
  return useQuery<SymbolMatch[], Error>({
    queryKey: ['symbolSearch', keywords],
    queryFn: () => fetchSymbolSearch(keywords),
    enabled: keywords.trim().length > 0,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
