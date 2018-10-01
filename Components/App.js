import React, { Component } from 'react';
import { Platform, StyleSheet, StatusBar, Text, View, AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation';


import Screen from './Screens/Screen';
import Swiper from './Screens/Swiper';
import EditInfo from './Screens/EditInfo'
import HomeScreen from './Screens/HomeScreen';


class Home extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='blue' barStyle='light-content'/>
        <Screen navigation={this.props.navigation} />
      </View>
    );
  }
}


export default Screens = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      headerMode: 'none',
      header: null,
    },
  },
  Screen: {
    screen: Screen,
    navigationOptions: {
      headerMode: 'none',
      header: null,
      headerLeft: null
    },
  },
  Swiper: {
    screen: Swiper,
    navigationOptions: {
      headerMode: 'none',
      header: null,
      headerLeft: null
    },
  },
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      headerMode: 'none',
      header: null,
      headerLeft: null
    },
  },
  EditInfo: {
    screen: EditInfo,
    navigationOptions: {
      headerMode: 'none',
      header: null,
      headerLeft: null,
    },
  },
});

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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
