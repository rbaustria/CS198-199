import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  AsyncStorage
} from 'react-native';

import { Header } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5.js';
import LinearGradient from 'react-native-linear-gradient';

const { width: WIDTH } = Dimensions.get('window')
const { height: HEIGHT } = Dimensions.get('window')

export default class ReadingScreen extends Component {

  constructor(props){
    super(props);
    this.state={
      storedData: [],
      date: '',
      reading: ''
    }
  };

  setValue(reading) {
    if (reading != null) {
      this.setState({
        reading: reading
      })
      this.persistData();
    }
    else {
      window.alert('Please do not enter a blank value.');
    }
  }

  persistData(){
    let reading = this.state.reading
    AsyncStorage.setItem('reading', reading).done();
    AsyncStorage.getItem('reading').then((reading) => {
        this.setState({reading: reading, persistedReading: reading})
    })
  }

  // For debugging, clearing data
  clearData(){
    //AsyncStorage.clear();
    let storedData = this.state.storedData
    this.setState({storedData: []})
    console.log('data cleared');
    console.log(storedData);
  }

  saveReading = () => {
      try {
        let loadedreading = this.state.reading
        let newData = {
          //date: date,
          reading: loadedreading
          //level: level
        }
        AsyncStorage.getItem('storedData')
        .then((storedData) => {
          const dataContainer = storedData ? JSON.parse(storedData) : [];
          dataContainer.push(newData);
          AsyncStorage.setItem('storedData', JSON.stringify(dataContainer));
        });
        console.log(storedData);
      }
      catch (error) {
        window.alert(error);
      }
  }

  render () {
    return (
      <SafeAreaView style= {styles.safeArea}>
        <View>
          <StatusBar barStyle='light-content' hidden= {false}/>
          <Header placement= 'left' centerComponent={{ text: 'Add Reading', placement: 'center', style: { color: '#fff', fontFamily: 'Avenir', fontSize: 20, fontWeight: 'bold' } }} outerContainerStyles={{ backgroundColor: '#21B6A8', height: 60}}/>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style= {styles.background}>
            <View style= {styles.infocontainer}>
              <Text style= {styles.header}>Enter blood glucose:</Text>
                <View style= {styles.iconborder}>
                  <FontAwesome5 name= 'syringe' {...iconStyles}/>
                </View>
                <TextInput style= {styles.numericinput}
                 maxLength= {3}
                 keyboardType= 'numeric'
                 placeholder= 'Glucose'
                 onChangeText= {(reading) => this.setState({reading: reading})}/>
              <View style= {styles.buttoncontainer}>
                <TouchableOpacity onPress= {() => {this.saveReading()}}>
                  <View style={styles.button}>
                    <Text style= {styles.buttontext}>Enter</Text>
                  </View>
                </TouchableOpacity>

                <View>
                  <Text>Value: {this.state.persistedReading} </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

// Paste this to reset data when button is pressed.
// <TouchableOpacity onPress= {() => {this.clearData()}}>

const iconStyles = {
  size: 60,
  color: '#21B6A8',
  flex: 1
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
  infocontainer: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#d3d3d3',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    padding: 10,
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
  },
  numericinput: {
    width: WIDTH - 200,
    height: 45,
    fontSize: 16,
    fontFamily: 'Avenir',
    backgroundColor: '#ecf7f9',
    color: '#859593',
    marginVertical: 30,
    shadowColor: '#d3d3d3',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    borderRadius: 20,
    textAlign: 'center'
  },
  iconborder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: '#21B6A8',
    borderWidth: 10,
    shadowColor: '#d3d3d3',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttoncontainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    textAlign: 'center',
    shadowColor: '#d3d3d3',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    paddingVertical: 10
  },
  button: {
    width: WIDTH - 250,
    height: HEIGHT - 550,
    borderRadius: 60, // Rounded border
    backgroundColor: '#21B6A8',
    borderColor: '#21B6A8',
    paddingVertical: 50,

  },
  // Button text
  buttontext: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    textAlign: 'center'
  }

});
