// src/screens/ExploreScreen.tsx

import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useExploreData } from '../../viewModels/useExploreData';
import StockCard from '../../components/stockCard/StockCard';
import { Stock, StockSectionKey } from './types';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StockStackParamList } from '../../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

type ExploreNavProp = StackNavigationProp<StockStackParamList, 'Explore'>;

export default function ExploreScreen() {
  const navigation = useNavigation<ExploreNavProp>();
  const { data, isLoading, isError, refetch } = useExploreData();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Failed to load data.</Text>
        <TouchableOpacity onPress={() => refetch()}>
          <Text style={styles.retryText}>Tap to Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const top_gainers: Stock[] = data.top_gainers;
  const top_losers: Stock[] = data.top_losers;
  const most_actively_traded: Stock[] = data.most_actively_traded;

  const renderSection = (
    title: string,
    items: Stock[],
    key: StockSectionKey
  ) => (
    <View style={styles.section} key={key}>
      <View style={styles.sectionHeader}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('ViewAll', { section: key })}
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={items.slice(0, 4)}
        renderItem={({ item }) => <StockCard stock={item} />}
        keyExtractor={(item) => item.ticker}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
       <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate('Search')}
        style={styles.searchBar}
      >
        <Text style={styles.searchPlaceholder}>
          🔍 Search for Stocks, ETFs & more
        </Text>
      </TouchableOpacity>
      <ScrollView>
        {renderSection('Top Gainers', top_gainers, 'gainers')}
        {renderSection('Top Losers', top_losers, 'losers')}
        {renderSection(
          'Most Actively Traded',
          most_actively_traded,
          'active'
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
