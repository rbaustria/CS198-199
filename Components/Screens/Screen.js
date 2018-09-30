import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet, // CSS-like styles
  Text, // Renders text
  View // Container component
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome.js';
import FoundationIcon from 'react-native-vector-icons/Foundation.js'
import { createStackNavigator } from 'react-navigation';

import Swiper from './Swiper';

export default class Screen extends Component {
  static navigationOptions = {
    headerMode: 'none',
    header: null,
  };
  render() {
    return (
      <Swiper navigation={this.props.navigation}>
        {/* First screen */}
        <View style={styles.slide}>
          <Icon name='cubes' {...iconStyles} />
          <Text style={styles.header}>Sugar</Text>
          <Text style={styles.text}>Start living healthy by being conscious about your blood sugar.</Text>
        </View>
        {/* Second screen */}
        <View style={styles.slide}>
          <FoundationIcon name='graph-trend' {...iconStyles} />
          <Text style={styles.header}>Record your readings.</Text>
          <Text style={styles.text}>Get feedback about your readings and view your current data.</Text>
        </View>
        {/* Third screen */}
        <View style={styles.slide}>
          <Icon name='star' {...iconStyles} />
          <Text style={styles.header}>Check your streaks.</Text>
          <Text style={styles.text}>Get streaks for consecutive normal blood sugar readings.</Text>
        </View>
      </Swiper>
    );
  }
}
const iconStyles = {
  size: 100,
  color: '#21B6A8'
};
const styles = StyleSheet.create({
  // Slide styles
  slide: {
    flex: 1, // Take up all screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#e3e1e1'
  },
  // Header styles
  header: {
    color: '#2e3939',
    fontFamily: 'Avenir',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15
  },
  // Text below header
  text: {
    color: '#859593',
    fontFamily: 'Avenir',
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('Screen', () => Screen);
