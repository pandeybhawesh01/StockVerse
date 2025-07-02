import { View, Text, ActivityIndicator, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React, { useRef, useState } from 'react'
import { StockStackParamList } from '../exploreScreen/types'
import { RouteProp, useRoute } from '@react-navigation/native';
import { useStockDetails } from '../../viewModels/useStockDetails';
import { ScrollView } from 'react-native-gesture-handler';
import { LineChart } from 'react-native-chart-kit';
import WatchlistSheet, { BottomTabModalRef } from '../../components/WatchListBottomSheet/WatchListBottomSheet';
import BottomTabModal from '../../components/WatchListBottomSheet/WatchListBottomSheet';
// import { series } from '../../constants/dummyData';

type RoutePropDetails = RouteProp<StockStackParamList, 'Product'>;

const StockDetailsScreen = () => {
  const route = useRoute<RoutePropDetails>();
  const [sheetOpen, setSheetOpen] = useState(false);
  const symbol = route.params.ticker;
  console.log('tickker is ',symbol);
  const {overview, series} = useStockDetails(symbol);
  const modalRef = useRef<BottomTabModalRef>(null);

  const openModal = () => {
    modalRef.current?.open();
  };
  // to be seperated graph ka graph mai lagana hai 
  if(overview.isLoading || series.isLoading){
    return <ActivityIndicator style= {styles.center} size ="large" />;
  }

  if(overview.isError || series.isError || !overview.data || !series.data){
    return <Text style={styles.center}>Error Loading details </Text>
  }

   if (!overview.data || !series.data) {
    return <Text style={styles.center}>No data available.</Text>;
  }

  const daily = series.data['Time Series (Daily)'];
  if (!daily || typeof daily !== 'object') {
    return <Text style={styles.center}>Price history not available.</Text>;
  }
  const dates = Object.keys(daily).sort();
  const recent = dates.slice(-30);
  const labels = recent.map(d => d.slice(5));
  const data = recent.map(d => Number(daily[d]['4. close']));
  const {Name, Sector, Industry, Description, Currency} = overview.data;

  return (
    <>
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{symbol} • {Name}</Text>
      <Text style={styles.subTitle}>{Sector} •{Industry} </Text>

      <Text style={styles.chartLabel}> Last 30 Days Close Price</Text>
      <LineChart
      data={{labels, datasets:[{data}]}}
      width={Dimensions.get('window').width-32}
      height={220}
      chartConfig={{
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        decimalPlaces: 2,
        color: () => '#007AFF',
        labelColor: ()=> '#666'
      }}
      bezier
      style={styles.chart}
      />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About {Name}</Text>
        <Text style={styles.description}>{Description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Metrics</Text>
        <View style={styles.metricsRow}>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>PE Ratio</Text>
            <Text style={styles.metricValue}>{overview.data.PERatio}</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Market Cap</Text>
            <Text style={styles.metricValue}>{overview.data.MarketCapitalization}</Text>
          </View>
        </View>
        {/* add more metric rows as needed */}
      </View>
       <TouchableOpacity onPress={openModal}>
      {/* <BookmarkIcon size={24} color="black" /> */}
      <View style={styles.saveBtn}>
        <Text style={styles.saveText}>add to watch list </Text>
      </View>
      </TouchableOpacity>
    </ScrollView>
    <BottomTabModal ref={modalRef}/>
    </>
  )
}

export default StockDetailsScreen
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  center:    { flex: 1, justifyContent:'center', alignItems:'center' },
  title:     { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  subTitle:  { fontSize: 14, color: '#666', marginBottom: 16 },
  chartLabel:{ fontSize: 16, fontWeight:'600', marginBottom: 8 },
  chart:     { borderRadius: 12, marginBottom: 16 },
  section:   { marginBottom: 24 },
  sectionTitle:   { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  description:    { fontSize: 14, color: '#333', lineHeight: 20 },
  metricsRow:     { flexDirection: 'row', justifyContent: 'space-between' },
  metric:         { width: '48%' },
  metricLabel:    { fontSize: 12, color: '#666' },
  metricValue:    { fontSize: 16, fontWeight: '600', color: '#000' },
  saveText:  { fontSize: 14, color: '#666', marginBottom: 16 },
  saveBtn: {width: '30%' , height: '20%' , borderRadius:8, backgroundColor:'green'}
});