import React, { Component } from "react";
import { AppRegistry, StyleSheet, Text, View, StatusBar, Button, Platform } from "react-native";
import { createStackNavigator } from "react-navigation";
import AppleHealthKit from 'rn-apple-healthkit';

//import Button from './Button';
import Screen from './Screen';
import HomeScreen from './HomeScreen';


export default class EditInfo extends Component<{}> {
  static navigationOptions = {
    headerMode: "none",
    header: null,
  };

  collectHealthInfo = () => {
    if (Platform.OS === "android") {
      // Add data fetch from GoogleFit here
    }
    else {
      // needs error handling if user doesnt have health info in healthkit
      //  Collect BiologicalSex
      AppleHealthKit.getBiologicalSex(null, (err: Object, results: Object) => {
        if (err) {
          // This doesnt work. should have a checker if user doesnt have data
          // move this to another function to get the value after user allowed
          return;
        }
        //console.log(results) Collect biological sex data here
      });

      // Collect Birthday
      AppleHealthKit.getDateOfBirth(null, (err: Object, results: Object) => {
      //if (this._handleHealthkitError(err, 'getDateOfBirth')) {
      if (err) {
          return;
      }
      //console.log(results) Collect age here
      });
    }
    // Navigate back to home screen.
    this.props.navigation.navigate("HomeScreen")
  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle = "dark-content" hidden = {true}/>
        <Text style={styles.welcome}>Edit info screen add button here to go back to homescreen.</Text>
        <Button onPress={this.collectHealthInfo} title="Done"/>
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

AppRegistry.registerComponent("EditInfo", () => EditInfo);
