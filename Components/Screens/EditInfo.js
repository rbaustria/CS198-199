import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  SafeAreaView,
  TextInput,
  Dimensions,
  Picker
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import AppleHealthKit from 'rn-apple-healthkit';

import Button from './Button';
import Screen from './Screen';
import HomeScreen from './HomeScreen';
import EditInfoHeader from './EditInfoHeader';
import Octicons from 'react-native-vector-icons/Octicons.js';


const { width: WIDTH } = Dimensions.get('window')

export default class EditInfo extends Component<{}> {
  static navigationOptions = {
    headerMode: 'none',
    header: null,
  };

  constructor(){
  	super();
  	this.state={
  		PickerValue:''
		}
  };

  collectHealthInfo = () => {
    if (Platform.OS === 'android') {
      // Add data fetch from GoogleFit here
    }
    else {
      // needs error handling if user doesnt have health info in healthkit
      // Collect BiologicalSex
      AppleHealthKit.getBiologicalSex(null, (err: Object, results: Object) => {
        if (err) {
          // This doesnt work. should have a checker if user doesnt have data
          // move this to another function to get the value after user allowed
          return;
        }
        //console.log(results) //Collect biological sex data here
      });

      // Collect Birthday
      AppleHealthKit.getDateOfBirth(null, (err: Object, results: Object) => {
      //if (this._handleHealthkitError(err, 'getDateOfBirth')) {
      if (err) {
          return;
      }
      //console.log(results) //Collect age here
      });
    }
    // Navigate back to home screen.
    this.props.navigation.navigate('HomeScreen')
  }


  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style= {styles.lineargcontainer}>
          <StatusBar barStyle= 'dark-content' hidden = {false}/>
            <EditInfoHeader/>
        </View>

        <View style= {styles.inputcontainer}>
          <TextInput
            style= {styles.textinput}
            placeholder= {'Name'}
            placeholderTextcolor= {'rbga(255,255,255,0.7)'}
          />
        </View>

        <View style= {styles.inputcontainer}>
          <Text style= {styles.label}>How many times a day do you check your blood sugar?</Text>
        </View>
        <View style= {styles.pickercontainer}>
          <Picker
            selectedValue={this.state.language}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
            <Picker.Item label='Once a day' value='1' />
            <Picker.Item label='Twice a day' value='2' />
            <Picker.Item label='Thrice a day' value='3' />
          </Picker>
        </View>

        <View style= {styles.container}>
          <Button onPress={this.collectHealthInfo} text='Done'/>
        </View>
      </SafeAreaView>

    );
  }
}

const iconStyles = {
  //position: 'absolute',
  top: 10,
  left: 37
};

const styles = StyleSheet.create({
  lineargcontainer: {
    flex: 2,
    alignSelf: 'stretch',
    alignItems: 'center',
    shadowColor: '#d3d3d3',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  inputcontainer: {
    alignItems: 'center',
    paddingTop: 20
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 100
  },
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  textinput: {
    width: WIDTH - 55,
    height: 45,
    fontSize: 16,
    fontFamily: 'Avenir',
    paddingLeft: 20,
    backgroundColor: '#ecf7f9',
    color: '#d3d3d3',
    marginHorizontal: 25,
    shadowColor: '#d3d3d3',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  picker: {
    height: 40,
    width: 150,
    position: 'absolute',
    bottom: 100,
    paddingTop: 10
  },
  pickercontainer: {
    alignItems: 'center',
    paddingTop: 70
  },
  label: {
    color: '#859593',
    fontFamily: 'Avenir',
    fontSize: 16,
    textAlign: 'left',
    paddingLeft: 20,
    paddingRight: 20
  }

});

AppRegistry.registerComponent('EditInfo', () => EditInfo);
