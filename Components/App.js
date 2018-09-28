import React, { Component } from "react";
import { Platform, StyleSheet, StatusBar, Text, View, AsyncStorage } from "react-native";
import { createStackNavigator } from "react-navigation";


import Screen from './Screens/Screen';
import Swiper from './Screens/Swiper';
import EditInfo from './Screens/EditInfo'
import HomeScreen from './Screens/HomeScreen';


class Home extends Component<{}> {
  static navigationOptions = {
    headerMode: 'none',
    header: null,
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="blue" barStyle="light-content"/>
        <Screen navigation={this.props.navigation} />
      </View>
    );
  }
}


export default Screens = createStackNavigator({
  Home: {
    screen: Home,
  },
  Screen: {
    screen: Screen,
  },
  Swiper: {
    screen: Swiper,
  },
  HomeScreen: {
    screen: HomeScreen,
  },
  EditInfo: {
    screen: EditInfo,

  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
