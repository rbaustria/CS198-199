import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';

import { Header } from 'react-native-elements';
import Octicons from 'react-native-vector-icons/Octicons.js';

export default class ShareDataScreen extends Component {

  exportData() {
    window.alert('Pressed');
  }

  showAbout() {
    window.alert('About');
  }

  showAcknowledgement() {
    window.alert('Acknowledgement');
  }

  showTerms() {
    window.alert('Terms and Privacy');
  }

  render () {
    return (
      <SafeAreaView style= {styles.safeArea}>
        <View>
          <StatusBar barStyle='light-content' hidden= {false}/>
          <Header placement= 'left' centerComponent={{ text: 'Info', placement: 'center', style: { color: '#fff', fontFamily: 'Avenir', fontSize: 20, fontWeight: 'bold' } }} outerContainerStyles={{ backgroundColor: '#21B6A8', height: 60}}/>
        </View>
        <View style= {styles.background}>
          <View style= {styles.infoContainer}>
            <View style= {styles.iconCircle}>
              <View style= {styles.container}>
                <Octicons name='file' {...iconStyles} />
              </View>
            </View>

            <View style= {{flex: 1, paddingTop: 50, textAlign: 'center'}}>
              <TouchableOpacity style= {styles.touchablestyle} onPress={() => {this.exportData()}}>
                <View style={styles.button}>
                  <Text style= {styles.buttontext}>Send Data</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style= {styles.touchablestyle} onPress= {() => {this.showAbout()}}>
                <Text style= {styles.text}>About</Text>
              </TouchableOpacity>
              <TouchableOpacity style= {styles.touchablestyle} onPress= {() => {this.showAcknowledgement()}}>
                <Text style= {styles.text}>Acknowledgement</Text>
              </TouchableOpacity>
              <TouchableOpacity style= {styles.touchablestyle} onPress= {() => {this.showTerms()}}>
                <Text style= {styles.text}>Terms and Privacy</Text>
              </TouchableOpacity>
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
    elevation: 1,
    alignSelf: 'center'
  },
  container: {
    flex:1,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#859593',
    fontFamily: 'Avenir',
    fontSize: 18,
    textAlign: 'left'
  },
  button: {
    borderRadius: 50, // Rounded border
    borderWidth: 2, // 2 point border widht
    borderColor: '#21B6A8',
    paddingHorizontal: 50, // Horizontal padding
    paddingVertical: 10, // Vertical padding
    width: 250,
    alignSelf: 'center'
  },
  buttontext: {
    textAlign: 'center',
    color: '#21B6A8',
    fontWeight: 'bold',
    fontFamily: 'Avenir'
  },
  text: {
    color: '#859593',
    fontFamily: 'Avenir',
    fontSize: 18,
    textAlign: 'center'
  },
  touchablestyle: {
    paddingVertical: 15,
  }

});
