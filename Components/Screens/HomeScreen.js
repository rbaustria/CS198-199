import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, StatusBar } from 'react-native';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons.js';

import Screen from './Screen';

class Home extends Component {
  render() {
    return (
      <View style= {styles.container}>
        <Text style= {styles.welcome}> HOME! </Text>
      </View>
    );
  }
}

class StreakScreen extends Component {
  render() {
    return (
      <View style= {styles.container}>
        <Text style= {styles.welcome}> STREAK! </Text>
      </View>
    );
  }
}

class ReadingScreen extends Component {
  render() {
    return (
      <View style= {styles.container}>
        <Text style= {styles.welcome}> HOME! </Text>
      </View>
    );
  }
}

class GraphScreen extends Component {
  render() {
    return (
      <View style= {styles.container}>
        <Text style= {styles.welcome}> HOME! </Text>
      </View>
    );
  }
}

class ShareDataScreen extends Component {
  render() {
    return (
      <View style= {styles.container}>
        <Text style= {styles.welcome}> HOME! </Text>
      </View>
    );
  }
}

export default createMaterialBottomTabNavigator ({
  Home: { screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon:({tintColor}) => (
        <Icon name= 'ios-home' color= {tintColor} size= {24} />
      )
    }
  },
  Streak: { screen: StreakScreen,
    navigationOptions: {
      tabBarLabel: 'Streaks',
      tabBarIcon:({tintColor}) => (
        <Icon name= 'ios-star' color= {tintColor} size= {24} />
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
  Graph: { screen: GraphScreen,
    navigationOptions: {
      tabBarLabel: 'Stats',
      tabBarIcon:({tintColor}) => (
        <Icon name= 'ios-stats' color= {tintColor} size= {24} />
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
  activeTintColor: 'blue',
  barStyle: {
    backgroundColor: 'white',
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

//AppRegistry.registerComponent('HomeScreen', () => HomeScreen);
