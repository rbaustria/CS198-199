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
  AsyncStorage,
  DeviceEventEmitter
} from 'react-native';

import { Header } from 'react-native-elements';
import { RNHealthKit } from 'react-native-healthkit';
import Entypo from 'react-native-vector-icons/Entypo.js';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5.js';

const { width: WIDTH } = Dimensions.get('window')
const { height: HEIGHT } = Dimensions.get('window')

export default class ReadingScreen extends Component {

  constructor(props){
    super(props);
    this.state={
      storedData: [],
      date: '',
      formatDate: '',
      reading: '',
      level: '',
      feedback: '',
      displayIcon: 'emoji-flirt',
      readingValidate: false
    }

  };

  // For debugging, clearing data
  clearData(){
    AsyncStorage.clear();
    console.log('Data cleared. App will reset.');
  }

  getInputDate() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hour = new Date().getHours();
    var minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();
    var date = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
    var currFormatDate = months[month - 1] + '\n' + day;
    this.setState({
      formatDate: currFormatDate
    })
    return date;
  }

  getReadingLevel(value) {
    var level = '';
    if (value >= 150) {
      level = 'Above';
    }
    else if (value >= 70) {
      level = 'Normal';
    }
    else {
      level = 'Below';
    }
    return level;
  }

  validateReading(value) {
    if (value != null) {
      currDate = this.getInputDate();
      currLevel = this.getReadingLevel(value);
      this.setState({
        date: currDate,
        reading: value,
        level: currLevel,
        readingValidate: true
      });
    }
    else {
      window.alert('Please do not input a blank value.');
    }
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  displayFeedback (value) {
    var aboveFeedbackArray = [
      'Are you sure you still want to live? Keep that blood sugar down would you?',
      'Have you heard about the cure for diabetes? Cause I haven’t, so keep that blood sugar low.',
      'I said, "Help yourself" not help yourself with more food.',
      'Life is sweet and so are candies. How much did you have?!',
    ];

    var normalFeedbackArray = [
      'Good job! Now we just have to keep this up until FOREVER!',
      'Nice! If you keep this up, I won’t be snooping around your text messages. Kidding!',
      'That’s what I’m talking about! I heard keeping a normal blood sugar will earn you something nice.'
    ];

    var belowFeedbackArray = [
      'I think you should sit down, reflect on your blood sugar and eat a chocolate bar.',
      'You need sugar too you know! Get that blood glucose to normal level so I can talk to you again.',
      'There’s a secret I want to tell you. But first, you should go yourself some sugar.',
      'I told you that too much sugar is not healthy. Did you think too less is better? Work on getting that to a normal level.'

    ];

    var index;
    if (value >= 150) {
      index = this.getRandomInt(aboveFeedbackArray.length);
      console.log(index)
      var temp = aboveFeedbackArray[index];
      this.setState({
        feedback: temp,
        displayIcon: 'emoji-sad'
      })
    }
    else if (value >= 70) {
      index = this.getRandomInt(normalFeedbackArray.length);
      var temp = normalFeedbackArray[index];
      this.setState({
        feedback: temp,
        displayIcon: 'emoji-happy'
      })
    }
    else {
      index = this.getRandomInt(belowFeedbackArray.length);
      var temp = belowFeedbackArray[index];
      this.setState({
        feedback: temp,
        displayIcon: 'emoji-neutral'
      })
    }
  }

  saveReading = () => {
      try {
        let loadedDate = this.state.date
        let loadedReading = parseInt(this.state.reading)
        let loadedLevel = this.state.level
        let loadedFormatDate = this.state.formatDate

        this.displayFeedback(loadedReading);

        let newData = {
          date: loadedDate,
          reading: loadedReading,
          level: loadedLevel,
          formatDate: loadedFormatDate
        }
        console.log(newData);

        // Writing the data to HealthKit
        let healthData = {
          HKType: 'BloodGlucose',
          BloodGlucose: loadedReading,
          Date: loadedDate,
          Unit: 'mg/dL'
        }
        RNHealthKit.saveHealthData(healthData, (error, events) => {
          console.log(events);
        })

        AsyncStorage.getItem('storedData')
        .then((storedData) => {
          const dataContainer = storedData ? JSON.parse(storedData) : [];
          dataContainer.push(newData);
          AsyncStorage.setItem('storedData', JSON.stringify(dataContainer));
        });
        this.clearText('GlucoseTextInput')
        this.setState({
          readingValidate: false
        })
      }
      catch (error) {
        window.alert(error);
      }
  }

  clearText(fieldName) {
    this.refs[fieldName].setNativeProps({text: ''});
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
            <View style= {styles.feedbackbackground}>
              <View style= {{justifyContent: 'center'}}>
                <Entypo name={this.state.displayIcon} {...feedbackIcon}/>
              </View>
              <Text style= {styles.text}>{this.state.feedback}</Text>
            </View>

            <View style= {styles.infocontainer}>
              <Text style= {styles.header}>Enter blood glucose:</Text>
                <View style= {styles.iconborder}>
                  <FontAwesome5 name= 'syringe' {...iconStyles}/>
                </View>
                <TextInput style= {styles.numericinput}
                 ref={'GlucoseTextInput'}
                 maxLength= {3}
                 keyboardType= 'numeric'
                 placeholder= 'Blood Glucose'
                 onChangeText= {(reading) => this.validateReading(reading)}
                 />
              <View style= {styles.buttoncontainer}>
                <TouchableOpacity disabled= {!this.state.readingValidate ? true : false} onPress= {() => {this.saveReading()}}>
                  <View style={styles.button}>
                    <Text style= {styles.buttontext}>Enter</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}
// <TouchableOpacity style= {{flex: 1, padding: 20}}onPress= {() => {this.clearData()}}>
//     <Text style= {{color: '#d3d3d3', fontFamily: 'Avenir', textAlign: 'center'}}>Clear</Text>
// </TouchableOpacity>
const feedbackIcon = {
  size: 50,
  color: '#21B6A8'
};

const iconStyles = {
  size: 50,
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
  feedbackbackground: {
    flexDirection: 'row',
    backgroundColor: 'white',
    shadowColor: '#d3d3d3',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 15,
    height: 100,
    paddingHorizontal: 5
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
  },
  header: {
    marginTop: 20,
    color: '#859593',
    fontFamily: 'Avenir',
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 15
  },
  text: {
    color: '#859593',
    fontFamily: 'Avenir',
    fontSize: 18,
    textAlign: 'left',
    paddingLeft: 5,
    paddingRight: 50,
    paddingTop: 5
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
    width: 100,
    height: 100,
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
    textAlign: 'center',
    shadowColor: '#d3d3d3',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  button: {
    justifyContent: 'center',
    width: 90,
    height: 90,
    borderRadius: 60, // Rounded border
    backgroundColor: '#21B6A8',
    borderColor: '#21B6A8',
    marginBottom: 5
  },
  // Button text
  buttontext: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Avenir',
    textAlign: 'center',
  }

});
