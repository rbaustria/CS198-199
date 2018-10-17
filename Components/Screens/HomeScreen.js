import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, StatusBar} from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons.js';

import Profile from './Profile';
import StreakScreen from './StreakScreen';
import ReadingScreen from './ReadingScreen';
import GraphScreen from './GraphScreen';
import ShareDataScreen from './ShareDataScreen';




export default createMaterialBottomTabNavigator ({
  Profile: { screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon:({tintColor}) => (
        <Icon name= 'ios-home' color= {tintColor} size= {24} />
      ),
    }
  },
  Graph: { screen: GraphScreen,
    navigationOptions: {
      tabBarLabel: 'Stats',
      tabBarIcon:({tintColor}) => (
        <Icon name= 'ios-stats' color= {tintColor} size= {24} />
      )
    }
  },
  Reading: { screen: ReadingScreen,
    navigationOptions: {
      tabBarLabel: 'Add Reading',
      tabBarIcon:({tintColor}) => (
        <Icon name= 'ios-water' color= {tintColor} size= {24} />
      )
    }
  },
  StreakScreen: { screen: StreakScreen,
    navigationOptions: {
      title: 'Streak',
      tabBarLabel: 'Streaks',
      tabBarIcon:({tintColor}) => (
        <Icon name= 'ios-star' color= {tintColor} size= {24} />
      )
    }
  },
  SendData: { screen: ShareDataScreen,
    navigationOptions: {
      tabBarLabel: 'Send Data',
      tabBarIcon:({tintColor}) => (
        <Icon name= 'ios-document' color= {tintColor} size= {24} />
      )
    }
  }
}, {
  activeTintColor: '#21B6A8',
  barStyle: {
    backgroundColor: '#f6f4f5',
    shadowColor: '#d3d3d3',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
});

AppRegistry.registerComponent('HomeScreen', () => HomeScreen);
