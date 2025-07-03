import { useQuery } from '@tanstack/react-query';
import { fetchExploreData } from '../services/api';
import { ExploreData } from '../screens/exploreScreen/types';

export function useExploreData() {
  const result = useQuery<ExploreData, Error>({
    queryKey: ['exploreData'],
    queryFn: fetchExploreData,
    staleTime: 1000 * 60 * 60 * 24,
    retry: false,
  });

  return result;
}