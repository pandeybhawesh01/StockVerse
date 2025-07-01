// src/viewmodels/useExploreData.ts


import { useQuery } from '@tanstack/react-query';
import { fetchExploreData } from '../services/api';
import { ExploreData } from '../screens/exploreScreen/types';

export function useExploreData() {
  const result = useQuery<ExploreData, Error>({
    queryKey: ['exploreData'],      // required
    queryFn: fetchExploreData,      // required
    staleTime: 1000 * 60 * 60 * 24,  // 24 h
    // cacheTime: 1000 * 60 * 60 * 24,  // 24 h
    retry: false,                   // no retries
  });

  return result; // has { data, isLoading, isError, error, refetch } 
}

// import { useQuery } from '@tanstack/react-query';
// import { fetchExploreData } from '../services/api';
// import { ExploreData } from '../screens/exploreScreen/types';

// export function useExploreData() {
//   const {
//     data,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery<ExploreData, Error>(
//     ['exploreData'],           // unique cache key
//     fetchExploreData,          // your single “all‑in‑one” fetcher
//     {
//       staleTime: 1000 * 60 * 60 * 24,  // keep data fresh for 24 h
//       retry: false,                    // don’t re‑try on error
//     }
//   );

//   return { data, isLoading, isError, error, refetch };
// }
