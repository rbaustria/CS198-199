import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, StatusBar } from "react-native";
import { createStackNavigator } from "react-navigation";

import Screen from './Screen';

export default class HomeScreen extends Component<{}> {
  static navigationOptions = {
    headerMode: 'none',
    header: null,
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle = "dark-content" hidden = {false}/>
        <Text style={styles.welcome}>TESTfsfsls.</Text>
      </View>
    );
  }
}

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

AppRegistry.registerComponent("HomeScreen", () => HomeScreen);
