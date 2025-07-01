import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StockStackParamList } from './types';
import ViewAllScreen from '../screens/viewAllScreen/ViewAllScreen';
import StockDetailsScreen from '../screens/StockDetailsScreen/StockDetailsScreen';
import ExploreScreen from '../screens/exploreScreen/ExploreScreen';

const Stack = createStackNavigator<StockStackParamList>();

export default function ExploreStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown : false}}>
      <Stack.Screen name="Explore" component={ExploreScreen} options={{ title: 'Explore' }} />
      <Stack.Screen name="ViewAll" component={ViewAllScreen} options={{ title: 'All Items' }} />
      <Stack.Screen name="Product" component={StockDetailsScreen} options={({ route }) => ({ title: route.params.symbol })} />
    </Stack.Navigator>
  );
}
