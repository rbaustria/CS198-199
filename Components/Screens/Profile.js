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
import { RNHealthKit } from 'rn-healthkit';
import Icon from 'react-native-vector-icons/Ionicons.js';
import Octicons from 'react-native-vector-icons/Octicons.js';
import * as Animatable from 'react-native-animatable';

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state={
      name: '',
      _startDate: '',
      count: '',
      streak: '',
      day: 'day',
      days: 'days',
      achievementCount: '',
      lastRecorded: ''
    }
  };

  getStoredName = async () => {
    try {
      const tempName = await AsyncStorage.getItem('name');
      const tempcount = await AsyncStorage.getItem('recordedReading');
      const tempStreakCount = await AsyncStorage.getItem('streak');


      // To get the number of achievements
      var temp = await AsyncStorage.getItem('achievements');
      var completedAchievements = JSON.parse(temp);
      const tempAchievementCount = completedAchievements.length

      // To get the last recorded reading
      let parsedData = this.state.parsedData;
      const storedData = await AsyncStorage.getItem('storedData');
      const parsed = JSON.parse(storedData);

      const tempLastRecorded = (parsed[parsed.length-1].formatDate).replace(/\n/g, ' ') + ', ' + (parsed[parsed.length-1].level)

      this.setState({
        name: tempName,
        count: tempcount,
        streak: tempStreakCount,
        achievementCount: tempAchievementCount,
        lastRecorded: tempLastRecorded
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
              <Icon name='md-calendar' {...infoIconStyle} />
              <Text style= {styles.text}> Last recorded: {this.state.lastRecorded} </Text>
            </View>

            <View style= {styles.textcontainer}>
              <Icon name='ios-ribbon' {...infoIconStyle} />
              <Text style= {styles.text}> Number of achievements unlocked: {this.state.achievementCount} </Text>
            </View>

            <View style= {styles.textcontainer}>
              <Animatable.View animation="tada" easing="ease-out" iterationCount="infinite">
                <Octicons name='star' {...infoIconStyle} />
              </Animatable.View>
              <Text style= {styles.text}> Current streak: {this.state.streak} {this.isPlural(this.state.streak)}</Text>
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
    fontSize: 15,
    textAlign: 'left'
  }

});
