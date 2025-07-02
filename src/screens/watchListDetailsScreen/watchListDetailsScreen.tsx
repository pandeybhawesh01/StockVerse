import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { StockStackParamList } from '../../navigation/types';
import { useStocksInList } from '../../viewModels/useWatchLists';
import StockCard from '../../components/stockCard/StockCard';
import { Stock } from '../exploreScreen/types';
import { styles } from './styles';

type RoutePropDetail = RouteProp<StockStackParamList, 'WatchlistDetail'>;

export default function WatchlistDetailScreen() {
  const route = useRoute<RoutePropDetail>();
  const { listId, name } = route.params;
  const { itemsQ, removeStockM } = useStocksInList(listId);

  if (itemsQ.isLoading) return <Text>Loading…</Text>;

  // const tickers = itemsQ.data || [];
  const stocks : Stock[] = itemsQ.data || [];
  // console.log('Stocks',stocks);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      {stocks.length === 0 ? (
        <Text style={styles.empty}>No stocks yet.</Text>
      ) : (
        <FlatList
          data={stocks}
          numColumns={2}
          columnWrapperStyle={styles.row}
          keyExtractor={(s) => s.ticker}
          renderItem={({ item }) => (
            <View>
              <StockCard stock={item} />
              <TouchableOpacity
                onPress={() => removeStockM.mutate(item.ticker)}
                style={styles.removeBtn}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}
