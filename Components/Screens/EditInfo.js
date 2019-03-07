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
  AsyncStorage,
  KeyboardAvoidingView
} from 'react-native';

import AppleHealthKit from 'rn-apple-healthkit';
import DatePicker from 'react-native-datepicker';
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
      nameValidate: false,
      androidGender: 'Female',
      androidBirthday: '2000-07-11'
		}
  };

  storeDataAndNextScreen () {
    this.persistData();
    this.props.navigation.navigate('HomeScreen');
  }

  persistData(){
    let name = this.state.name
    let dob = this.state.androidBirthday
    let gender = this.state.androidGender
    AsyncStorage.setItem('name', name).done();
    AsyncStorage.setItem('dob', dob).done();
    AsyncStorage.setItem('gender', gender).done();
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
    if (Platform.OS === 'ios') {
    return (
        <KeyboardAvoidingView style={styles.safeArea} behavior="padding">
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle= 'dark-content' hidden = {false}/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <View style= {styles.inputcontainer}>
                <View style= {styles.header}>
                  <Text style= {styles.label}>About you</Text>
                  <View style= {styles.iconWarp}>
                    <View style= {styles.container}>
                      <Octicons name='person' {...iconStyles} />
                    </View>
                  </View>
                  <View style= {styles.textboxcontainer}>
                    <TextInput
                      style= {styles.textinput}
                      onChangeText= {(name) => this.validateName(name)}
                      placeholder= {'Name'}
                      placeholderTextcolor= {'rbga(255,255,255,0.7)'}/>
                      <TouchableOpacity style={styles.buttoncontainer} disabled= {!this.state.nameValidate ? true : false} onPress={this.storeDataAndNextScreen.bind(this)}>
                        <View style={styles.button}>
                          <Text style= {styles.buttontext}>DONE</Text>
                        </View>
                      </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
        </KeyboardAvoidingView>
        );
      }
      else {
        return(
        <KeyboardAvoidingView style={styles.safeArea} behavior="padding">
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle= 'dark-content' hidden = {false}/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <View style= {styles.inputcontainer}>
                <View style= {styles.header}>
                  <Text style= {styles.label}>About you</Text>
                  <View style= {styles.iconWarp}>
                    <View style= {styles.container}>
                      <Octicons name='person' {...iconStyles} />
                    </View>
                  </View>
                  <View style= {styles.textboxcontainer}>
                    <TextInput
                      style= {styles.textinput}
                      onChangeText= {(name) => this.validateName(name)}
                      placeholder= {'Name'}
                      placeholderTextcolor= {'rbga(255,255,255,0.7)'}/>
                    <DatePicker
                      // Change marginTop to change distance from the textbox
                      style={{width: 200, marginTop: 10}}
                      date={this.state.androidBirthday}
                      mode="date"
                      placeholder="select date"
                      format="YYYY-MM-DD"
                      minDate="1900-01-01"
                      maxDate="2019-06-01"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0
                        },
                        dateInput: {
                          marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                      }}
                      onDateChange={(date) => {this.setState({date: date})}}
                    />
                    <View style={styles.pickercontainer}>
                      <Picker
                        // Change pickercontainer or picker to change position in Android
                        style = {styles.picker}
                        selectedValue={this.state.androidGender}
                        onValueChange={(itemValue, itemIndex) => this.setState({androidGender: itemValue})}>
                        <Picker.Item label="Female" value="Female"/>
                        <Picker.Item label="Male" value="Male"/>
                      </Picker>
                    </View>
                    <TouchableOpacity style={styles.buttoncontainer} disabled= {!this.state.nameValidate ? true : false} onPress={this.storeDataAndNextScreen.bind(this)}>
                      <View style={styles.button}>
                        <Text style= {styles.buttontext}>DONE</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
        </KeyboardAvoidingView>

      );
    }
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

const styles = StyleSheet.create({
  inputcontainer: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-end'
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#F5FCFF',
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
    borderColor: '#21B6A8',
    paddingHorizontal: 50, // Horizontal padding
    paddingVertical: 10 // Vertical padding
  },
  buttontext: {
    color: '#21B6A8',
    fontWeight: "bold",
    fontFamily: "Avenir"
  },
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconWarp: {
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
  label: {
    marginTop: 20,
    color: '#21B6A8',
    fontFamily: 'Avenir',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15
  },
  textboxcontainer: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttoncontainer: {
    marginTop: 60
  }

});

AppRegistry.registerComponent('EditInfo', () => EditInfo);
