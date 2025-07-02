import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Stock, StockStackParamList } from '../../navigation/types';
import { useStocksInList } from '../../viewModels/useWatchLists';
import StockCard from '../../components/stockCard/StockCard';

type RoutePropDetail = RouteProp<StockStackParamList, 'WatchlistDetail'>;

export default function WatchlistDetailScreen() {
  const route = useRoute<RoutePropDetail>();
  const { listId, name } = route.params;
  const { itemsQ, removeStockM } = useStocksInList(listId);

  if (itemsQ.isLoading) return <Text>Loading…</Text>;

  const tickers = itemsQ.data || [];
  console.log(tickers);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      {tickers.length === 0 ? (
        <Text style={styles.empty}>No stocks yet.</Text>
      ) : (
        <FlatList
          data={tickers}
          numColumns={2}
          columnWrapperStyle={styles.row}
          keyExtractor={(t) => t}
          renderItem={({ item }) => (
            <View>
              <StockCard stock={{ ticker: item, price: '', change_amount: '', change_percentage: '', volume: '' }} />
              <TouchableOpacity
                onPress={() => removeStockM.mutate(item)}
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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 12 },
  empty: { textAlign: 'center', color: '#666', marginTop: 32 },
  row: { justifyContent: 'space-around', marginBottom: 12 },
  removeBtn: { marginTop: 4, backgroundColor: '#E53935', padding: 4, borderRadius: 4 },
  removeText: { color: '#fff', fontSize: 12 },
});
