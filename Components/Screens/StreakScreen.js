import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  StatusBar
} from 'react-native';

import { Header } from 'react-native-elements';
import Octicons from 'react-native-vector-icons/Octicons.js';
import LinearGradient from 'react-native-linear-gradient';

export default class StreakScreen extends Component {
  render () {
    return (
      <View>
        <StatusBar barStyle='light-content' hidden= {false}/>
        <Header placement= 'left' centerComponent={{ text: 'Streaks', placement: 'center', style: { color: '#fff', fontFamily: 'Avenir', fontSize: 20, fontWeight: 'bold' } }} outerContainerStyles={{ backgroundColor: '#21B6A8'}}/>
      </View>
    );
  }
}


const styles = StyleSheet.create ({
  linearGradient: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10
    //paddingTop: 30,
    //paddingBottom: 50,
  },
  label: {
    marginTop: 20,
    color: '#000000',
    fontFamily: 'Avenir',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15
  }

});

AppRegistry.registerComponent('Streak', () => Streak);
