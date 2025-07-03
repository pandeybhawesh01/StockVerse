// src/screens/StockDetailsScreen.tsx

import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Stock, StockStackParamList } from '../exploreScreen/types';
import { useStockDetails } from '../../viewModels/useStockDetails';
import { LineChart } from 'react-native-chart-kit';
import WatchlistModal, {
  WatchlistModalRef,
} from '../../components/WatchListBottomSheet/WatchListBottomSheet';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { ArrowLeftIcon, ChevronLeftIcon } from 'react-native-heroicons/outline';

type RoutePropDetails = RouteProp<StockStackParamList, 'Product'>;

export default function StockDetailsScreen() {
  const route = useRoute<RoutePropDetails>();
  const navigation = useNavigation();
  const symbol = route.params.ticker;
  const { overview, series } = useStockDetails(symbol);
  const modalRef = useRef<WatchlistModalRef>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  if (overview.isLoading || series.isLoading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }
  if (overview.isError || series.isError || !overview.data || !series.data) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorText}>Error loading data.</Text>
      </SafeAreaView>
    );
  }
  console.log('data is ', overview.data);

  const daily = series.data['Time Series (Daily)'];
  if (!daily) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={styles.errorText}>No price history available.</Text>
      </SafeAreaView>
    );
  }

  // Prepare chart for last 7 days
  const dates = Object.keys(daily).sort();
  const recent = dates.slice(-7);
  const labels = recent.map((d) => d.slice(5)); // "MM-DD"
  const prices = recent.map((d) => Number(daily[d]['4. close']));

  // Destructure overview fields
  const {
    Name,
    AssetType,
    Exchange,
    Description = '',
    Industry,
    Sector,
    PERatio,
    MarketCapitalization,
    '52WeekLow': _52Low,
    '52WeekHigh': _52High,
  } = overview.data;

  // Demo today’s low/high (you could fetch via TIME_SERIES intraday)
  const todaysLow = Math.min(...prices);
  const todaysHigh = Math.max(...prices);

  const weekLow = parseFloat(_52Low);
  const weekHigh = parseFloat(_52High);

  const pctOfRange = (value: number, min: number, max: number) =>
    max > min ? ((value - min) / (max - min)) * 100 : 0;

  const openModal = () => modalRef.current?.open();
  const lastPrice = prices[prices.length - 1];
  const prevPrice = prices[prices.length - 2] ?? lastPrice;

  // compute change
  const changeAmount = (lastPrice - prevPrice).toFixed(2);
  const changePercentage = `${(((lastPrice - prevPrice) / prevPrice) * 100).toFixed(2)}%`;

  // (we don't have volume from daily series, so you can leave it blank or pull from overview if you prefer)
  const stockData: Stock = {
    ticker: symbol,
    price: lastPrice.toFixed(2),
    change_amount: changeAmount,
    change_percentage: changePercentage,
    volume: '', // or overview.data.SharesOutstanding if that makes sense
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Stock Detail</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* —— Header Row —— */}
        <View style={styles.headerRow}>
          <View style={{ flex: 0.7 }}>
            <Text style={styles.stockName}>{Name}</Text>
            <Text style={styles.metaText}>
              {symbol} • {AssetType}
            </Text>
            <Text style={styles.metaText}>{Exchange}</Text>
          </View>
          <TouchableOpacity onPress={openModal} style={styles.bookmarkBtn}>
            <Text style={styles.bookmarkText}>+ Watchlist</Text>
          </TouchableOpacity>
        </View>

        {/* —— Line Chart —— */}
        <LineChart
          data={{ labels, datasets: [{ data: prices }] }}
          width={Dimensions.get('window').width - 32}
          height={200}
          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 2,
            color: () => '#007AFF',
            labelColor: () => '#666',
          }}
          style={styles.chart}
          bezier
        />

        {/* —— About Card —— */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>About {Name?.toUpperCase()}</Text>
          <Text style={styles.description}>
            {isExpanded
              ? Description + ' '
              : Description.split(' ').slice(0, 40).join(' ') + '... '}
            <Text
              style={styles.readMore}
              onPress={() => setIsExpanded((p) => !p)}
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </Text>
          </Text>
          <View style={styles.tagRow}>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Industry: {Industry}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Sector: {Sector}</Text>
            </View>
          </View>
        </View>

        {/* —— Performance Card —— */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Performance</Text>

          {/* Today's Range */}
          <Text style={styles.subLabel}>Today's Range</Text>
          <View style={styles.rowLabels}>
            <Text style={styles.rangeValue}>{todaysLow.toFixed(2)}</Text>
            <Text style={styles.rangeValue}>{todaysHigh.toFixed(2)}</Text>
          </View>
          <View style={styles.barTrack}>
            <View
              style={[
                styles.marker,
                {
                  left: `${pctOfRange(
                    (todaysLow + todaysHigh) / 2,
                    todaysLow,
                    todaysHigh
                  )}%`,
                },
              ]}
            />
          </View>

          {/* 52‑Week Range */}
          <Text style={[styles.subLabel, { marginTop: 16 }]}>
            52-Week Range
          </Text>
          <View style={styles.rowLabels}>
            <Text style={styles.rangeValue}>{weekLow.toFixed(2)}</Text>
            <Text style={styles.rangeValue}>{weekHigh.toFixed(2)}</Text>
          </View>
          <View style={styles.barTrack}>
            <View
              style={[
                styles.marker,
                {
                  left: `${pctOfRange(_52High ? parseFloat(_52High) : 0, weekLow, weekHigh)}%`,
                  borderBottomColor: '#007AFF',
                },
              ]}
            />
          </View>
        </View>

        {/* —— Key Metrics Card —— */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Key Metrics</Text>
          <View style={styles.metricsRow}>
            <View style={styles.metricBlock}>
              <Text style={styles.metricLabel}>PE Ratio</Text>
              <Text style={styles.metricValue}>{PERatio}</Text>
            </View>
            <View style={styles.metricBlock}>
              <Text style={styles.metricLabel}>Market Cap</Text>
              <Text style={styles.metricValue}>{MarketCapitalization}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* —— Watchlist Modal —— */}
      <WatchlistModal ref={modalRef} stock={stockData} />
    </SafeAreaView>
  );
}
