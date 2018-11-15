import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  AsyncStorage,
  Modal,
  Platform
} from 'react-native';

import AppleHealthKit from 'rn-apple-healthkit';
import { RNHealthKit } from 'react-native-healthkit';
import { Header } from 'react-native-elements';
import { createStackNavigator } from 'react-navigation';
import Octicons from 'react-native-vector-icons/Octicons.js';

export default class ShareDataScreen extends Component {
  constructor() {
    super()

    this.state = {
      aboutIsVisible: false,
      ackIsVisible: false,
      termsIsVisible: false
    }
  }

  exportData() {


    if (Platform.OS === 'ios') {
      let option = {
            permissions: {
                read: ['BiologicalSex', 'DateOfBirth', 'BloodGlucose'],
            }
        };
      let temp = (new Date(2014,9,26)).toISOString();
      let options = {
        unit: 'mgPerdL',	// optional; default 'mmolPerL'
        startDate: temp, // required
        ascending: false, // optional; default false
      };


      const url = 'http://localhost:5000/logs';

      const data = {
        sex: null,
        dob: null,
        blood: null
      };

      const { initHealthKit, getBiologicalSex, getDateOfBirth, getBloodGlucoseSamples } = AppleHealthKit;

      initHealthKit(option, (err, results) => {
        getBiologicalSex(null, (err, sex) => {
          data.sex = sex;
          getDateOfBirth(null, (err, dob) => {
            data.dob = dob;
            getBloodGlucoseSamples(options, (err, blood) => {
              data.blood = blood;

              fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then((resp) => console.log(resp), (err) => console.error(err));
              // console.log(data);
            });
          });
        });
      });


    }
    else {
      // If GoogleFit still not working, do some magic
    }


    // AppleHealthKit.initHealthKit(option, (err, results) => {
    //       AppleHealthKit.getDateOfBirth(null, (err: Object, results: Object) => {
    //         console.log('Birthday: ', results)
    //       });
    //
    //       AppleHealthKit.getBloodGlucoseSamples(options, (err: Object, results: Array<Object>) => {
    //         if (err) {
    //           console.log('Error getting blood glucose.')
    //           return;
    //         }
    //         console.log('Results: ', results)
    //       });
    // });



    // AppleHealthKit.initHealthKit(option: Object, (err: string, results: Object) => {
    //     if (err) {
    //         console.log('error initializing Healthkit: ', err);
    //         return;
    //     }
    //     AppleHealthKit.getDateOfBirth(null, (err: Object, results: Object) => {
    //       console.log('Birthday: ',results)
    //     });
    //
    //     AppleHealthKit.getBloodGlucoseSamples(options, (err: Object, results: Array<Object>) => {
    //       if (err) {
    //         console.log('Error getting blood glucose.')
    //         return;
    //       }
    //       console.log('Results: ' ,results)
    //     });
    // });
  }

  showAbout() {
    this.setState({
      aboutIsVisible: true
    })
  }

  showAcknowledgement = async () => {
    this.setState({
      ackIsVisible: true
    })

    var temp = await AsyncStorage.getItem('achievements');
    var parsed = JSON.parse(temp);

    // Achievement 8 unclocked. View Acknowledgement.
    if (!parsed.includes('8')) {
      const tempArr = parsed;
      tempArr.push('8');
      AsyncStorage.setItem('achievements', JSON.stringify(tempArr));
    }
  }

  showTerms() {
    this.setState({
      termsIsVisible: true
    })
  }

  hideAbout() {
    this.setState({
      aboutIsVisible: false
    })
  }

  hideAcknowledgement() {
    this.setState({
      ackIsVisible: false
    })
  }

  hideTerms() {
    this.setState({
      termsIsVisible: false
    })
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

              <Modal visible= {this.state.aboutIsVisible}>
                <SafeAreaView style= {styles.safeArea}>
                  <StatusBar barStyle='light-content' hidden= {false}/>
                  <Header placement= 'left' centerComponent={{ text: 'About', placement: 'center', style: { color: '#fff', fontFamily: 'Avenir', fontSize: 20, fontWeight: 'bold' } }} outerContainerStyles={{ backgroundColor: '#21B6A8', height: 60}}/>
                  <View style= {styles.background}>
                    <Text style= {styles.text}> Insert About here </Text>
                      <View>
                        <Octicons name='arrow-left' {...iconStyles} onPress= {() => {this.hideAbout()}}/>
                      </View>
                  </View>
                </SafeAreaView>
              </Modal>

              <Modal visible= {this.state.ackIsVisible}>
                <SafeAreaView style= {styles.safeArea}>
                  <StatusBar barStyle='light-content' hidden= {false}/>
                  <Header placement= 'left' centerComponent={{ text: 'Acknowledgement', placement: 'center', style: { color: '#fff', fontFamily: 'Avenir', fontSize: 20, fontWeight: 'bold' } }} outerContainerStyles={{ backgroundColor: '#21B6A8', height: 60}}/>
                  <View style= {styles.background}>
                    <Text style= {styles.text}> Insert Acknowledgement here </Text>
                      <View>
                        <Octicons name='arrow-left' {...iconStyles} onPress= {() => {this.hideAcknowledgement()}}/>
                      </View>
                  </View>
                </SafeAreaView>
              </Modal>

              <Modal visible= {this.state.termsIsVisible}>
                <SafeAreaView style= {styles.safeArea}>
                  <StatusBar barStyle='light-content' hidden= {false}/>
                  <Header placement= 'left' centerComponent={{ text: 'Terms and Privacy', placement: 'center', style: { color: '#fff', fontFamily: 'Avenir', fontSize: 20, fontWeight: 'bold' } }} outerContainerStyles={{ backgroundColor: '#21B6A8', height: 60}}/>
                  <View style= {styles.background}>
                    <Text style= {styles.text}> Insert Terms here </Text>
                      <View>
                        <Octicons name='arrow-left' {...iconStyles} onPress= {() => {this.hideTerms()}}/>
                      </View>
                  </View>
                </SafeAreaView>
              </Modal>

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
