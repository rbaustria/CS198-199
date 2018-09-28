import React, { Component } from "react";
import { Platform, AppRegistry, StyleSheet, Text, View, StatusBar } from "react-native";
import AppleHealthKit from 'rn-apple-healthkit';
import Swiper from './Swiper';

export default class HealthInfo extends Component<{}> {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#16a085",
      elevation: null
    },
    header: null
  };

    render() {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#16a085" />
            <Text style={styles.header}>TEHEHEHE.</Text>
            
        </View>

      );
    }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },

  header: {
    color: "#2e3939",
    fontFamily: "Avenir",
    fontSize: 50,
    fontWeight: "bold",
    marginVertical: 15,
    textAlign: "center"
  },
  // Text below header
  text: {
    color: "#859593",
    fontFamily: "Avenir",
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: "center"
  }
});

AppRegistry.registerComponent("HealthInfo", () => HealthInfo);
