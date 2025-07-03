import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import StockCard from '../../components/stockCard/StockCard';
import { useExploreData } from '../../viewModels/useExploreData';
import { Stock, StockSectionKey } from '../exploreScreen/types';
import { StockStackParamList } from '../../navigation/types';
import { styles } from './styles';
import colors from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import ArrowLeftIcon from 'react-native-heroicons/outline/ArrowLeftIcon';


type ViewAllRouteProp = RouteProp<StockStackParamList, 'ViewAll'>;

export default function ViewAllScreen() {
  const { data, isLoading, isError, refetch } = useExploreData();
  const route = useRoute<ViewAllRouteProp>();
  const { section } = route.params as { section: StockSectionKey };
  const navigation = useNavigation();

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

  let items: Stock[];
  let title: string;

  switch (section) {
    case 'gainers':
      items = data.top_gainers;
      title = 'Top Gainers';
      break;
    case 'losers':
      items = data.top_losers;
      title = 'Top Losers';
      break;
    default:
      items = data.most_actively_traded;
      title = 'Most Actively Traded';
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={24} color="#000" />
          {/* <Text> === </Text> */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
      <FlatList
        data={items}
        renderItem={({ item }) => <StockCard stock={item} />}
        keyExtractor={(item) => item.ticker}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
