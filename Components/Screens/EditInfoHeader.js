import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';

import Octicons from 'react-native-vector-icons/Octicons.js';
import LinearGradient from 'react-native-linear-gradient';
import { createStackNavigator } from 'react-navigation';

export default class EditInfoHeader extends Component {
  render () {
    return (
      <LinearGradient colors={['#02aab0', '#00cdac']} style={styles.linearGradient}>
        <View style= {styles.header}>
          <Text style= {styles.label}>About you</Text>
          <View style= {styles.iconWarp}>
            <View style= {styles.container}>
              <Octicons name='person' {...iconStyles} />
            </View>
          </View>
        </View>
      </LinearGradient>
    );
  }
}


const iconStyles = {
  size: 80,
  //color: '#128a08',
  color: '#FFFFFF',
  flex: 1,
  borderRadius: 100,
  borderColor: '#000000',
  borderWidth: 4
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'

  },
  headercontainer: {
    flex: 1,
    alignSelf: 'stretch',
    //borderRadius: 5,
    alignItems: 'center',
    color: '#e3e1e1'
  },
  linearGradient: {
    flex: 1,
    alignSelf: 'stretch',
    //borderRadius: 5,
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 50,
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  iconWarp: {
    width: 140,
    height: 140,
    borderRadius: 60,
    borderColor: '#FFFFFF',
    borderWidth: 10,
    shadowColor: '#d3d3d3',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  label: {
    marginTop: 20,
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15
  }


});
