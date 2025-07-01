import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WatchlistStackParamList } from './types';
import WatchlistScreen from '../screens/watchListScreen/WatchListScreen';
import StockDetailsScreen from '../screens/StockDetailsScreen/StockDetailsScreen';

const Stack = createStackNavigator<WatchlistStackParamList>();

export default function WatchlistStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown : false}}>
      <Stack.Screen name="Watchlist" component={WatchlistScreen} options={{ title: 'My Watchlist' }} />
      <Stack.Screen name="Product" component={StockDetailsScreen} options={({ route }) => ({ title: route.params.symbol })} />
    </Stack.Navigator>
  );
}