// src/screens/WatchlistDetailScreen.tsx

import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ArrowLeftIcon from 'react-native-heroicons/outline/ArrowLeftIcon';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { StockStackParamList } from '../../navigation/types';
import { useStocksInList } from '../../viewModels/useWatchLists';
import StockCard from '../../components/stockCard/StockCard';

type RoutePropDetail = RouteProp<StockStackParamList, 'WatchlistDetail'>;

export default function WatchlistDetailScreen() {
  const route = useRoute<RoutePropDetail>();
  const navigation = useNavigation();
  const { listId, name } = route.params;
  const { itemsQ, removeStockM } = useStocksInList(listId);

  if (itemsQ.isLoading) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>Loading stocks…</Text>
      </SafeAreaView>
    );
  }

  const stocks = itemsQ.data || [];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{name}</Text>
      </View>

      {stocks.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.empty}>No stocks in this list yet.</Text>
        </View>
      ) : (
        <FlatList
          data={stocks}
          keyExtractor={(item) => item.ticker}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <View style={styles.itemWrapper}>
              <StockCard stock={item} />
              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => removeStockM.mutate(item.ticker)}
              >
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  list: { padding: 16 },
  row: { justifyContent: 'space-between', marginBottom: 16 },
  itemWrapper: { width: '48%' },
  removeBtn: {
    marginTop: 6,
    backgroundColor: '#E53935',
    paddingVertical: 4,
    borderRadius: 4,
  },
  removeText: { color: '#fff', fontSize: 12, textAlign: 'center' },
  empty: { color: '#666', fontSize: 14 },
});

// import React from 'react';
// import { View, Text, FlatList, TouchableOpacity } from 'react-native';
// import { RouteProp, useRoute } from '@react-navigation/native';
// import { StockStackParamList } from '../../navigation/types';
// import { useStocksInList } from '../../viewModels/useWatchLists';
// import StockCard from '../../components/stockCard/StockCard';
// import { Stock } from '../exploreScreen/types';
// import { styles } from './styles';

// type RoutePropDetail = RouteProp<StockStackParamList, 'WatchlistDetail'>;

// export default function WatchlistDetailScreen() {
//   const route = useRoute<RoutePropDetail>();
//   const { listId, name } = route.params;
//   const { itemsQ, removeStockM } = useStocksInList(listId);

//   if (itemsQ.isLoading) return <Text>Loading…</Text>;

//   // const tickers = itemsQ.data || [];
//   const stocks : Stock[] = itemsQ.data || [];
//   // console.log('Stocks',stocks);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>{name}</Text>
//       {stocks.length === 0 ? (
//         <Text style={styles.empty}>No stocks yet.</Text>
//       ) : (
//         <FlatList
//           data={stocks}
//           numColumns={2}
//           columnWrapperStyle={styles.row}
//           keyExtractor={(s) => s.ticker}
//           renderItem={({ item }) => (
//             <View>
//               <StockCard stock={item} />
//               <TouchableOpacity
//                 onPress={() => removeStockM.mutate(item.ticker)}
//                 style={styles.removeBtn}
//               >
//                 <Text style={styles.removeText}>Remove</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// }
