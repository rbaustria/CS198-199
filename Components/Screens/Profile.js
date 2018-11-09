import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Platform,
  AsyncStorage
} from 'react-native';

import { Header } from 'react-native-elements';
import AppleHealthKit from 'rn-apple-healthkit';
import { RNHealthKit } from 'react-native-healthkit';
import Icon from 'react-native-vector-icons/Ionicons.js';
import Octicons from 'react-native-vector-icons/Octicons.js';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state={
      name: '',
      _startDate: '',
      count: '',
      streak: '',
      day: 'day',
      days: 'days'
    }
  };

  getStoredName = async () => {
    try {
      const tempName = await AsyncStorage.getItem('name');
      const tempcount = await AsyncStorage.getItem('recordedReading');
      const tempStreakCount = await AsyncStorage.getItem('streak');
      // AsyncStorage.getItem('name')
      // .then((name) => {
      //     this.setState({name: name, persistedName: name})
      // })
      // AsyncStorage.getItem('recordedReading')
      // .then((count) => {
      //     this.setState({count: count, recordedReading: count})
      // })
      this.setState({
        name: tempName,
        count: tempcount,
        streak: tempStreakCount
      })
    }
    catch (error) {
      window.alert(error);
    }
  }

  isPlural(value) {
    if (parseInt(value) == 1 || parseInt(value) == 0) {
      return 'day';
    }
    return 'days';
  }

  componentDidMount(){
    this.getStoredName();
    this.reloadProfileData = this.props.navigation.addListener('willFocus', this.getStoredName) // listener to reload graph data when tab is pressed
  }

  componentWillUnmount () {
    this.reloadProfileData.remove();
  }

  render () {
    return (

      <SafeAreaView style= {styles.safeArea}>
        <View>
          <StatusBar barStyle='light-content' hidden= {false}/>
          <Header placement= 'left' centerComponent={{ text: 'Profile', placement: 'center', style: { color: '#fff', fontFamily: 'Avenir', fontSize: 20, fontWeight: 'bold' } }} outerContainerStyles={{ backgroundColor: '#21B6A8', height: 60}}/>
        </View>

        <View style= {styles.background}>
          <View style= {styles.infoContainer}>
            <View style= {styles.iconCircle}>
              <View style= {styles.container}>
                <Octicons name='person' {...iconStyles} />
              </View>
            </View>
            <Text style= {styles.header}> {this.state.name} </Text>
          </View>

          <View style= {styles.infoContainer}>
            <View style= {styles.textcontainer}>
              <Octicons name='pencil' {...infoIconStyle} />
              <Text style= {styles.text}> Recorded readings: {this.state.count} </Text>
            </View>

            <View style= {styles.textcontainer}>
              <Octicons name='star' {...infoIconStyle} />
              <Text style= {styles.text}> Longest streak: {this.state.streak} {this.isPlural(this.state.streak)}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>

    );
  }
}

const iconStyles = {
  size: 80,
  color: '#21B6A8',
  flex: 1,
  borderRadius: 100,
  borderColor: '#000000',
  borderWidth: 4
};

const infoIconStyle = {
  size: 20,
  color: '#21B6A8',
  flex: 1,
  borderRadius: 100,
  borderColor: '#000000',
  borderWidth: 4
};

const styles = StyleSheet.create ({
  safeArea: {
    flex: 1,
    backgroundColor: '#21B6A8',
  },
  background: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#f2f2f2',
    padding: 20,
  },
  infoContainer: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#d3d3d3',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    padding: 20,
    marginBottom: 15
  },
  textcontainer: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignContent: 'flex-start',
  },
  iconCircle: {
    width: 140,
    height: 140,
    borderRadius: 60,
    borderColor: '#21B6A8',
    borderWidth: 10,
    shadowColor: '#d3d3d3',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    marginTop: 20,
    color: '#859593',
    fontFamily: 'Avenir',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15
  },
  text: {
    color: '#859593',
    fontFamily: 'Avenir',
    fontSize: 18,
    textAlign: 'left'
  }

});
