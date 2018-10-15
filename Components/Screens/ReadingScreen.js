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
  TouchableOpacity
} from 'react-native';

import { Header } from 'react-native-elements';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5.js';
import LinearGradient from 'react-native-linear-gradient';

const { width: WIDTH } = Dimensions.get('window')

export default class ReadingScreen extends Component {
  render () {
    return (
      <SafeAreaView style= {styles.safeArea}>
        <View>
          <StatusBar barStyle='light-content' hidden= {false}/>
          <Header placement= 'left' centerComponent={{ text: 'Add Reading', placement: 'center', style: { color: '#fff', fontFamily: 'Avenir', fontSize: 20, fontWeight: 'bold' } }} outerContainerStyles={{ backgroundColor: '#21B6A8', height: 60}}/>
        </View>

        <View style= {styles.background}>
          <View style= {styles.infocontainer}>
            <Text style= {styles.header}>Enter blood glucose:</Text>
              <View style= {styles.iconborder}>
                <FontAwesome5 name= 'syringe' {...iconStyles}/>
              </View>
            <TextInput style= {styles.numericinput} keyboardType= 'numeric'/>

            <View>
              <TouchableOpacity onPress= {() => {window.alert('You pressed');}}>
                <View style={styles.button}>
                  <Text style= {styles.buttontext}>Enter</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

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
    padding: 20,
    marginBottom: 15
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
    paddingLeft: 20,
    backgroundColor: '#ecf7f9',
    color: '#859593',
    marginHorizontal: 25,
    marginVertical: 50,
    shadowColor: '#d3d3d3',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
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
