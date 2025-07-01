import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreStackNavigator from './ExploreStackNavigator';
import WatchlistStackNavigator from './WatchlistStackNavigator';

const Tab = createBottomTabNavigator();

export default function MainTabsNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Explore" component={ExploreStackNavigator}  />
      <Tab.Screen name="Watchlist" component={WatchlistStackNavigator} />
    </Tab.Navigator>
  );
}