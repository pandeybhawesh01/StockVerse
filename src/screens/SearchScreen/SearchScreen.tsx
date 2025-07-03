// src/screens/SearchPage.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StockStackParamList } from '../../navigation/types';
import { useSymbolSearch } from '../../viewModels/useSymbolSearch';
import { styles } from './styles';
import colors from '../../constants/colors';

type SearchNavProp = StackNavigationProp<StockStackParamList, 'Product'>;

export default function SearchPage() {
  const navigation = useNavigation<SearchNavProp>();
  const [query, setQuery] = useState('');
  const { data: results = [], isFetching, isError } = useSymbolSearch(query);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for Stocks, ETFs & more"
        placeholderTextColor={colors.darkGray}
        value={query}
        onChangeText={setQuery}
        autoFocus
      />

      {isFetching ? (
        <ActivityIndicator style={styles.loader} />
      ) : isError ? (
        <Text style={{ marginTop: 20, textAlign: 'center', color: 'red' }}>
          Failed to load results
        </Text>
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item, i) => item['1. symbol'] + i}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => {
            const symbol = item['1. symbol'];
            const name   = item['2. name'];
            const type   = item['3. type'];
            return (
              <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate('Product', { ticker: symbol })}
              >
                <Text style={styles.symbol}>{symbol}</Text>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.type}>{type}</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}
