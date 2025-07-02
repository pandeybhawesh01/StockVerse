import { useQuery } from "@tanstack/react-query";
import { fetchOverview, fetchDailySeries } from "../services/api";
import { CompanyOverview, TimeSeriesDaily } from "../screens/StockDetailsScreen/types";

export function useStockDetails(symbol: string){
    const overview = useQuery<CompanyOverview>({
        queryKey: ['overview', symbol],
        queryFn: () => fetchOverview(symbol),
        staleTime: 1000*60*60*24,
        retry: false
    });
    console.log("overview ", overview);

    const series = useQuery<TimeSeriesDaily>({
        queryKey: ['series', symbol],
        queryFn: () => fetchDailySeries(symbol),
        staleTime: 1000*60*60*24,
        retry:false,
    });

    return {overview, series};
}