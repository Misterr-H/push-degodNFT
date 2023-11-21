import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NFTScreen from '../screens/NFTScreen';
import BookMarked from '../screens/BookMarked';

export const BottomTabNavigator = () => {
  const BottomTab = createBottomTabNavigator();

  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="NFTScreen" component={NFTScreen} />
      <BottomTab.Screen name="BookMarked" component={BookMarked} />
    </BottomTab.Navigator>
  );
};
