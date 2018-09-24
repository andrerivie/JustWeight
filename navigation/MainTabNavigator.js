import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import DataScreen from '../screens/DataScreen';
import WorkoutScreen from '../screens/WorkoutScreen'

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarOptions: {
    activeTintColor: 'purple'
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-contact'
      }
    />
  ),
};

const DataStack = createStackNavigator({
  Data: DataScreen,
});

DataStack.navigationOptions = {
  tabBarLabel: 'Stats',
  tabBarOptions: {
    activeTintColor: 'purple'
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-stats'}
    />
  ),
};

const WorkoutStack = createStackNavigator({
  Workout: WorkoutScreen,
});

WorkoutStack.navigationOptions = {
  tabBarLabel: 'Workout',
  tabBarOptions: {
    activeTintColor: 'purple'
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-trophy'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  DataStack,
  WorkoutStack,
});
