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
  Picker,
  Button,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  AsyncStorage
} from 'react-native';

import AppleHealthKit from 'rn-apple-healthkit';
import { createStackNavigator } from 'react-navigation';

import Screen from './Screen';
import HomeScreen from './HomeScreen';
import EditInfoHeader from './EditInfoHeader';
import Octicons from 'react-native-vector-icons/Octicons.js';

const { width: WIDTH } = Dimensions.get('window')
const key = '@MyApp:key';

export default class EditInfo extends Component<{}> {
  static navigationOptions = {
    headerMode: 'none',
    headerLeft: null
  };

  constructor(props){
  	super(props);
  	this.state={
      name: '',
  		frequency: '1',
      nameValidate: false,
		}
  };

  storeDataAndNextScreen () {
    this.persistData();
    this.props.navigation.navigate('HomeScreen');
  }

  persistData(){
    let name = this.state.name
    let frequency = this.state.frequency
    AsyncStorage.setItem('name', name).done();
    AsyncStorage.setItem('frequency', frequency).done();
  }

  check(){
    AsyncStorage.getItem('name').then((name) => {
        this.setState({name: name, persistedName: name})
    })
  }

  componentWillMount(){
    this.check();
  }

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

  validateName(text) {
    characters = /^[a-zA-Z]+$/
    if (characters.test(text) && text != null) {
      this.setState({
        nameValidate: true,
        name: text
      })
    }
    else {
      this.setState({
        nameValidate: false
      })
      window.alert('Name must not be empty and contain only letters.');
    }

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
            onChangeText= {(name) => this.validateName(name)}
            placeholder= {'Name'}
            placeholderTextcolor= {'rbga(255,255,255,0.7)'}/>
        </View>
        <View style= {styles.container}>
          <TouchableOpacity disabled= {!this.state.nameValidate ? true : false} onPress={this.storeDataAndNextScreen.bind(this)}>
            <View style={styles.button}>
              <Text style= {styles.buttontext}>DONE</Text>
            </View>
          </TouchableOpacity>
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
    paddingTop: 20,
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
  textinputerror: {
    width: WIDTH - 55,
    height: 45,
    fontSize: 16,
    fontFamily: 'Avenir',
    paddingLeft: 20,
    backgroundColor: '#ecf7f9',
    color: '#859593',
    borderColor: '#FF9494',
    borderWidth: 2
  },
  textinput: {
    width: WIDTH - 55,
    height: 45,
    fontSize: 16,
    fontFamily: 'Avenir',
    paddingLeft: 20,
    backgroundColor: '#ecf7f9',
    color: '#859593',
    marginHorizontal: 25,
    shadowColor: '#d3d3d3',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  picker: {
    height: Platform.OS === 'ios' ? 40 : 30,
    width: 150,
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 100 : 70,
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
  },
  button: {
    borderRadius: 50, // Rounded border
    borderWidth: 2, // 2 point border widht
    //borderColor: "#128a08", // White colored border
    //borderColor: '#02aab0',
    borderColor: '#21B6A8',
    paddingHorizontal: 50, // Horizontal padding
    paddingVertical: 10 // Vertical padding

  },
  // Button text
  buttontext: {
    //color: "#128a08",
    //color: '#02aab0',
    color: '#21B6A8',
    fontWeight: "bold",
    fontFamily: "Avenir"
  }
});

AppRegistry.registerComponent('EditInfo', () => EditInfo);
