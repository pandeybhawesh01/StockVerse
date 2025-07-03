import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreStackNavigator from './ExploreStackNavigator';
import WatchlistStackNavigator from './WatchlistStackNavigator';
import colors from '../constants/colors';
import { GlobeAltIcon,  BookmarkIcon} from 'react-native-heroicons/outline';

const Tab = createBottomTabNavigator();

export default function MainTabsNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Explore" 
      component={ExploreStackNavigator}
      options={{
        tabBarIcon : ({color, size}) => (
          <GlobeAltIcon color={color} size={size || 240}/>
        ),
      }} 
      />
      <Tab.Screen name="Watchlist" component={WatchlistStackNavigator}
      options={{
        tabBarIcon : ({color, size}) => (
          <BookmarkIcon color={color} size={size || 240}/>
        ),
      }}  />
    </Tab.Navigator>
  );
}