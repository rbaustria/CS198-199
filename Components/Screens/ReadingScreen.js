import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TextInput,
  Platform,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  AsyncStorage,
  DeviceEventEmitter,
  KeyboardAvoidingView
} from 'react-native';

import { Header } from 'react-native-elements';
import { RNHealthKit } from 'rn-healthkit';
import AchievementScreen from './AchievementScreen.js';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons.js';
import * as Animatable from 'react-native-animatable';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import AwesomeAlert from 'react-native-awesome-alerts';

const { width: WIDTH } = Dimensions.get('window')
const { height: HEIGHT } = Dimensions.get('window')

export default class ReadingScreen extends Component {

  constructor(props){
    super(props);
    this.state={
      storedData: [],
      date: '',
      formatDate: '',
      tempGraphTime: '',
      reading: '',
      level: '',
      feedback: 'What is your blood glucose today?',
      displayIcon: 'comment-question-outline',
      displayLevel: '',
      readingValidate: false,
      count: '',
      keyboardShown: false,
      showAlert: false
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
    var date = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds; // Date to be stored in HealthKit
    var currFormatDate = months[month - 1] + '\n' + day;
    var currFormatTime;

    // For graph formatting. Ex. Add '0' for 17:02 instead of 17:2
    if (minutes <= 9) {
        currFormatTime = currFormatDate + '\n' + hour + ':' + '0' + minutes; // Date to be displayed in the graph
    }
    else {
        currFormatTime = currFormatDate + '\n' + hour + ':' + minutes; // Date to be displayed in the graph
    }

    this.setState({
      formatDate: currFormatDate,
      tempGraphTime: currFormatTime
    })
    return date;
  }

  // Function to get time for when achievements are unlocked.
  getCurrentTime() {
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    var currFormatTime;
    if (minutes <= 9) {
        currFormatTime = hour + ':' + '0' + minutes; // Date to be displayed in the graph
    }
    else {
        currFormatTime = hour + ':' + minutes; // Date to be displayed in the graph
    }
    return currFormatTime;
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
      'Are you sure you still want to breathe? Keep that blood sugar down would you?',
      'Have you heard about the cure for diabetes? Cause I haven’t, so keep that blood sugar low.',
      'I said, "Help yourself" not help yourself with more food.',
      'Life is sweet and so are candies. How much did you have?!',
      'Did you know that having high blood sugar is not cool? Oh, guess you`re not cool then.',
      'Stop lying to me! I saw you gobble that ice cream up. If you want me to be happy, keep your sugar low.',
      'May the force ~to keep your blood sugar low~ be with you.',
      'My great great great great great great grandapp told me I should yell at someone for having high blood sugar. *YELLS*'
    ];

    var normalFeedbackArray = [
      'Good job! Now we just have to keep this up until FOREVER!',
      'Nice! If you keep this up, I won’t be snooping around your text messages. Kidding!',
      'That’s what I’m talking about! I heard keeping a normal blood sugar will earn you something nice.',
      'Looks like someone`s got a normal blood sugar! Yes that`s you! Good job!',
      'I have good news for you: you`re NORMAL! Both blood sugar and everything else.',
      'I would like to use this opportunity to give you a digital pat for having a normal blood sugar level. *pats*',
      'Pssst. Hey you! Yes you! I like that blood sugar of yours. *wink*'
    ];

    var belowFeedbackArray = [
      'I think you should sit down, reflect on your blood sugar and munch on a banana.',
      'You need sugar too you know! Get that blood glucose to normal level so I can talk to you again.',
      'There’s a secret I want to tell you. But first, you should go yourself some sugar.',
      'I told you that too much sugar is not healthy. Did you think too less is better? Work on getting that to a normal level.',
      'What? Your blood sugar is that LOW? That`s it, I`m reading the next text message that comes.',
      'Your blood sugar is low. It is just like my patience with you-running low. Get that to normal level will you!!',
      'If you want this relationship to work, you have to munch on some bananas to get your sugar to normal.'
    ];

    var index;
    if (value >= 150) {
      index = this.getRandomInt(aboveFeedbackArray.length);
      // console.log(index)
      var temp = aboveFeedbackArray[index];
      this.setState({
        feedback: temp,
        displayIcon: 'emoticon-sad',
        displayLevel: 'Above'
      })
    }
    else if (value >= 70) {
      index = this.getRandomInt(normalFeedbackArray.length);
      var temp = normalFeedbackArray[index];
      this.setState({
        feedback: temp,
        displayIcon: 'emoticon-excited',
        displayLevel: 'Normal'
      })
    }
    else {
      index = this.getRandomInt(belowFeedbackArray.length);
      var temp = belowFeedbackArray[index];
      this.setState({
        feedback: temp,
        displayIcon: 'emoticon-neutral',
        displayLevel: 'Below'
      })
    }
  }

  saveReading = () => {
      Keyboard.dismiss()
      try {
        let loadedDate = this.state.date
        let loadedReading = parseInt(this.state.reading)
        let loadedLevel = this.state.level
        let loadedFormatDate = this.state.formatDate
        let loadedGraphTime = this.state.tempGraphTime

        this.displayFeedback(loadedReading);

        let newData = {
          date: loadedDate,
          reading: loadedReading,
          level: loadedLevel,
          formatDate: loadedFormatDate,
          graphTime: loadedGraphTime
        }
        // console.log(newData);

        // Writing the data to HealthKit
        try {
          if (Platform.OS === 'ios') {
            let healthData = {
              HKType: 'BloodGlucose',
              BloodGlucose: loadedReading,
              Date: loadedDate,
              Unit: 'mg/dL'
            }
            RNHealthKit.saveHealthData(healthData, (error, events) => {
               console.log(events);
            })
          }
        }
        catch(error) {
          console.log(error);
        }

        AsyncStorage.getItem('storedData')
        .then((storedData) => {
          const dataContainer = storedData ? JSON.parse(storedData) : [];
          dataContainer.push(newData);
          // console.log(dataContainer);
          AsyncStorage.setItem('storedData', JSON.stringify(dataContainer));
        });
        this.clearText('GlucoseTextInput')
        this.setState({
          readingValidate: false
        })
        this.incrementCounter(); // Increment recordedReading counter
      }
      catch (error) {
        window.alert(error);
      }
  }

  // Check the previous month if it is currMonth - 1
  checkMonth(value, value2) {
    const months = [' ', ' ', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var i, newInd, prevInd;
    var first = value[0];
    var second = value[1];
    var third = value[2];

    var month1 = first.concat(second.concat(third));

    var first2 = value2[0];
    var second2 = value2[1];
    var third2 = value2[2];
    var month2 = first2.concat(second2.concat(third2));

    for (i=0; i<months.length; i++) {
      if (months[i] == month1) {
        newInd = i;
      }
    }

    for (i=0; i<months.length; i++) {
      if (months[i] == month2) {
        prevInd = i;
      }
    }
    if (newInd - prevInd == 1 || newInd - prevInd == -11) { // -11 for if dec -> jan
      return true;
    }
    return false;
  }

  // Given the formatDate, return the integer day of the date
  getDay (value) {
    var day;
    if (value.length > 5) {
      var tens = value[4];
      var ones = value[5];
      day = parseInt(tens.concat(ones));
      // console.log(day)
    }
    else if (value.length == 5) {
      //get the last 1 digit
      day = parseInt(value[4]);
    }
    return day;
  }

  checkStreak = async (value) => {
    const storedData = await AsyncStorage.getItem('storedData');
    const parsed = JSON.parse(storedData);
    var arrLen = parsed.length-1;

    // compareDay is the current day - 1 to check the streak
    var compareDay;
    var previousDay;
    var previousDayLevel;

    const streakCount = await AsyncStorage.getItem('streak');
    const parsedStreakCount = JSON.parse(streakCount);

    // Temporary streak count to be incremented based on the previous dates and levels
    var tempStreakCount = parseInt(parsedStreakCount);

    // If user's reading is normal, check streak
    if (parsed[arrLen].level == 'Normal') {
      // If user's first reading inputted is normal, increment the streak by 1
      if (this.state.count == 1) {
        tempStreakCount += 1;
        AsyncStorage.setItem('streak', JSON.stringify(tempStreakCount)).done();
      }
      // If it's not the first entry
      else {
        // Check if there is another reading inputted for the same day, if there is, ignore it
        var counter = 1;
        while (parsed[arrLen].formatDate == parsed[arrLen-counter].formatDate) {
          ++counter;
          if (counter > arrLen) {
            --counter;
            break;
          }
        }

        compareDay = this.getDay(parsed[arrLen].formatDate);
        previousDay = this.getDay(parsed[arrLen-counter].formatDate);
        previousDayLevel = parsed[arrLen-counter].level;
        // console.log("LEVEL: ", previousDayLevel)

        if (parsed[arrLen].formatDate == parsed[arrLen-1].formatDate ) {
          if (parsed[arrLen].level == 'Normal' && parsed[arrLen-1].level == 'Normal') {

          }
          else {
            tempStreakCount += 1;
            AsyncStorage.setItem('streak', JSON.stringify(tempStreakCount)).done();
          }
        }
        else {
          // Check if month is the same or is the prev month
          if ((parsed[arrLen].formatDate[0] == parsed[arrLen-counter].formatDate[0] && parsed[arrLen].formatDate[1] == parsed[arrLen-counter].formatDate[1] && parsed[arrLen].formatDate[2] == parsed[arrLen-counter].formatDate[2]) || this.checkMonth(parsed[arrLen].formatDate,parsed[arrLen-counter].formatDate)) { // add or
            // If previous month is indeed the previous month of the new month, check if the current day is 1, if yes, increment

            if (this.checkMonth(parsed[arrLen].formatDate, parsed[arrLen-counter].formatDate)) {
              if (compareDay == 1 && previousDayLevel == 'Normal') {
                tempStreakCount += 1;
                AsyncStorage.setItem('streak', JSON.stringify(tempStreakCount)).done();
              }
              else if (compareDay == 1 && previousDayLevel != 'Normal') {
                tempStreakCount = 1;
                AsyncStorage.setItem('streak', JSON.stringify(tempStreakCount)).done();
              }
              else {
                // If previous entry wasn't entered 1 day before current date, reset streak to 1
                tempStreakCount = 1;
                AsyncStorage.setItem('streak', JSON.stringify(tempStreakCount)).done();
              }
            }
            else {
              // Compare if last reading of the previous day has a Normal reading, if yes, increment
              if ((compareDay-1) == previousDay && previousDayLevel == 'Normal') {
                tempStreakCount += 1;
                AsyncStorage.setItem('streak', JSON.stringify(tempStreakCount)).done();
              }
              else if ((compareDay-1) == previousDay && previousDayLevel != 'Normal') {
                tempStreakCount = 1;
                AsyncStorage.setItem('streak', JSON.stringify(tempStreakCount)).done();
              }
              else {
                // If previous entry wasn't entered 1 day before current date, reset streak to 1
                tempStreakCount = 1;
                AsyncStorage.setItem('streak', JSON.stringify(tempStreakCount)).done();
              }
            }

          }
          // If month isnt the same && month is not the prev month (i.e. new entry is Feb, prev month must be Jan)
          else {
            tempStreakCount = 1;
            AsyncStorage.setItem('streak', JSON.stringify(tempStreakCount)).done();
          }
        }
      }
    }
    // Else user entered a reading that is below/above, reset streak.
    else {
      tempStreakCount = 0;
      AsyncStorage.setItem('streak', JSON.stringify(tempStreakCount)).done();
    }

    // Check if on a 3 day normal streak
    if (tempStreakCount == 3) {
      var temp = await AsyncStorage.getItem('achievements');
      var temp2 = JSON.parse(temp);

      // Mapping to get date and number array from the achievements array stored in async
      const achDateArray = this.state.temp2.map(obj => obj.date);
      const achNumberArray = this.state.temp2.map(obj => obj.number);

      if (!achNumberArray.includes('6')) {
        window.alert('You got an achievement for having a normal blood sugar level streak for three (3) days! Check your achievements page!')
        const tempArr = temp2;
        let tempDate = this.state.formatDate + ', ' + yr + ' ' + currTime
        let achievementData = {
          date: tempDate,
          number: '6'
        }

        tempArr.push(achievementData);
        AsyncStorage.setItem('achievements', JSON.stringify(tempArr));
      }
    }
  }

  incrementCounter = async () => {
    try {
      const storedCount = await AsyncStorage.getItem('recordedReading');
      // String representation of the number of recorded readings.
      const parsedCount = JSON.parse(storedCount);

      // Increment it since a new reading is entered.
      var tempCount = parseInt(parsedCount) + 1;
      // Store the new count.
      this.setState({
        count: tempCount
      })

      AsyncStorage.setItem('recordedReading', JSON.stringify(tempCount)).done();
      this.hasAchievement(tempCount);
      this.checkStreak();
    }
    catch (error) {
      console.log(error);
    }
  }

  hasAchievement = async (value) => {
    // Load achievement array and storedData to check achievements
    var temp = await AsyncStorage.getItem('achievements');
    const asyncData = await AsyncStorage.getItem('storedData');
    var temp2 = JSON.parse(temp);
    const parsed = JSON.parse(asyncData);
    var arrLen = parsed.length-1

    // Only split dates and achievements when at least one is unlocked to prevent errors
    if (temp2 != null) {
      const achDateArray = temp2.map(obj => obj.date);
      const achNumberArray = temp2.map(obj => obj.number);
      let yr = new Date().getFullYear();
      let currTime = this.getCurrentTime();

      // Achievement 1 unlocked. Enter your first reading.
      if (value == '1') {
        this.pushAlert('Horray! You got an achievement for entering your first reading! Check your achievements page!')
        const tempArr = temp2;
        let tempDate = this.state.formatDate + ', ' + yr + ' ' + currTime
        let achievementData = {
          date: tempDate,
          number: '1'
        }

        tempArr.push(achievementData);
        AsyncStorage.setItem('achievements', JSON.stringify(tempArr));
      }

      // Achievement 2 unlocked. Enter 4 normal readings after an above reading.
      if (value >= 5 && parsed[arrLen].level == 'Normal' && parsed[arrLen-1].level == 'Normal' && parsed[arrLen-2].level == 'Normal' && parsed[arrLen-3].level == 'Normal' && parsed[arrLen-4].level == 'Above' ) {
        if (!achNumberArray.includes('2')) {
          this.pushAlert('You got an achievement for entering four normal readings after being above normal! Check your achievements page!')
          const tempArr = temp2;
          let tempDate = this.state.formatDate + ', ' + yr + ' ' + currTime
          let achievementData = {
            date: tempDate,
            number: '2'
          }

          tempArr.push(achievementData);
          AsyncStorage.setItem('achievements', JSON.stringify(tempArr));
        }
      }

      // Achievement 3 unlocked. Enter 5 normal readings in a row.
      if (value >= 5) {
        if (!achNumberArray.includes('3') && parsed[arrLen].level == 'Normal' && parsed[arrLen-1].level == 'Normal' && parsed[arrLen-2].level == 'Normal' && parsed[arrLen-3].level == 'Normal' && parsed[arrLen-4].level == 'Normal') {
              this.pushAlert('You got an achievement for entering five normal readings in a row! Check your achievements page!');
              const tempArr = temp2;
              let tempDate = this.state.formatDate + ', ' + yr + ' ' + currTime
              let achievementData = {
                date: tempDate,
                number: '3'
              }

              tempArr.push(achievementData);
              AsyncStorage.setItem('achievements', JSON.stringify(tempArr));
            }

        // Achievement 4 unlocked. Enter 4 normal readings after being below normal.
        if (!achNumberArray.includes('4') && parsed[arrLen].level == 'Normal' && parsed[arrLen-1].level == 'Normal' && parsed[arrLen-2].level == 'Normal' && parsed[arrLen-3].level == 'Normal' && parsed[arrLen-4].level == 'Below') {
              this.pushAlert('You got an achievement for entering four normal readings after being below normal! Check your achievements page!');
              const tempArr = temp2;
              let tempDate = this.state.formatDate + ', ' + yr + ' ' + currTime
              let achievementData = {
                date: tempDate,
                number: '4'
              }

              tempArr.push(achievementData);
              AsyncStorage.setItem('achievements', JSON.stringify(tempArr));
            }
      }

      // Achievement 5 unlocked. Enter 10 normal readings in a row.
      if (value >= 10) {
        if (!achNumberArray.includes('5') && parsed[arrLen].level == 'Normal' && parsed[arrLen-1].level == 'Normal' && parsed[arrLen-2].level == 'Normal' && parsed[arrLen-3].level == 'Normal' && parsed[arrLen-4].level == 'Normal' && parsed[arrLen-5].level == 'Normal' && parsed[arrLen-6].level == 'Normal' && parsed[arrLen-7].level == 'Normal' && parsed[arrLen-8].level == 'Normal' && parsed[arrLen-9].level == 'Normal') {
            this.pushAlert('You got an achievement for entering ten normal readings in a row! Check your achievements page!');
            const tempArr = temp2;
            let tempDate = this.state.formatDate + ', ' + yr + ' ' + currTime
            let achievementData = {
              date: tempDate,
              number: '5'
            }

            tempArr.push(achievementData);
            AsyncStorage.setItem('achievements', JSON.stringify(tempArr));
          }
      }
    }
  }

  clearText(fieldName) {
    this.refs[fieldName].setNativeProps({text: ''});
  }

  pushAlert(message) {
    this.setState({
      alertMessage: message,
      showAlert: true
    })
  }

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  render () {
    if(Platform.OS === 'android'){
            return (
   <KeyboardAvoidingView style={styles.safeArea} behavior="null">     
      <SafeAreaView style= {styles.safeArea}>
        <HideWithKeyboard>
        <View>
          <StatusBar barStyle='light-content' hidden= {false}/>
          <Header placement= 'left' centerComponent={{ text: 'Add Reading', placement: 'center', style: { color: '#fff', fontFamily: 'Avenir', fontSize: 20, fontWeight: 'bold' } }} outerContainerStyles={{ backgroundColor: '#21B6A8', height: 60}}/>
        </View>
        </HideWithKeyboard>        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style= {styles.background}>
            <HideWithKeyboard>
            <View style= {styles.feedbackbackground}>
              <View style= {{justifyContent: 'center'}}>
                <MaterialCommunityIcons name={this.state.displayIcon} {...feedbackIcon}/>
              </View>
              <Text style= {styles.text}>{this.state.feedback}</Text>
            </View>
            </HideWithKeyboard>
            <View style= {styles.infocontainer}>

              <HideWithKeyboard>
                <Text style= {styles.header}>My blood glucose is</Text>
              </HideWithKeyboard>

                <TextInput style= {styles.numericinput}
                 ref={'GlucoseTextInput'}
                 maxLength= {3}
                 keyboardType= 'numeric'
                 placeholder= 'Tap here to type'
                 onChangeText= {(reading) => this.validateReading(reading)}
                 />

              <View style= {styles.buttoncontainer}>
                <TouchableOpacity disabled= {!this.state.readingValidate ? true : false} onPress= {() => {this.saveReading()}}>
                <View style= {styles.iconborder}>
                  <FontAwesome5 name= 'syringe' {...iconStyles}/>
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
    else{
      return (
        <KeyboardAvoidingView style={styles.safeArea} behavior="padding">
        <SafeAreaView style= {styles.safeArea}>
          <View>
            <StatusBar barStyle='light-content' hidden= {false}/>
            <Header placement= 'left' centerComponent={{ text: 'Add Reading', placement: 'center', style: { color: '#fff', fontFamily: 'Avenir', fontSize: 20, fontWeight: 'bold' } }} outerContainerStyles={{ backgroundColor: '#21B6A8', height: 60}}/>
          </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
              <View style= {styles.background}>
                <View style= {styles.feedbackbackground}>
                  <View style= {{justifyContent: 'center', flexDirection: 'column'}}>
                    <MaterialCommunityIcons name= {this.state.displayIcon} {...feedbackIcon}/>
                    <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite" style= {styles.levelText}>{this.state.displayLevel}</Animatable.Text>
                  </View>
                  <Text style= {styles.text}>{this.state.feedback}</Text>
                </View>
                <View style= {styles.infocontainer}>

                  <HideWithKeyboard>
                    <View style= {styles.iconborder}>
                       <FontAwesome5 name= 'syringe' {...iconStyles}/>
                    </View>
                  </HideWithKeyboard>

                  <HideWithKeyboard>
                    <Text style= {styles.header}>My blood glucose is</Text>
                  </HideWithKeyboard>

                    <TextInput style= {styles.numericinput}
                     ref={'GlucoseTextInput'}
                     maxLength= {3}
                     keyboardType= 'numeric'
                     placeholder= 'Tap here to type'
                     onChangeText= {(reading) => this.validateReading(reading)}
                     />
                  <View style= {styles.buttoncontainer}>
                    <TouchableOpacity disabled= {!this.state.readingValidate ? true : false} onPress= {() => {this.saveReading()}}>
                      <Animatable.View animation="pulse" easing="ease-out" iterationCount="infinite" style={styles.button}>
                        <Text style= {styles.buttontext}>Save</Text>
                      </Animatable.View>
                    </TouchableOpacity>
                  </View>
                </View>

                <AwesomeAlert
                  show={this.state.showAlert}
                  showProgress={false}
                  title="Achievement"
                  message= {this.state.alertMessage}
                  closeOnTouchOutside={true}
                  closeOnHardwareBackPress={false}
                  showCancelButton={true}
                  cancelText="Close"
                  onCancelPressed={() => {
                    this.hideAlert();
                  }}
                />
                
              </View>
            </TouchableWithoutFeedback>
            </SafeAreaView>
          </KeyboardAvoidingView>
    );
    }

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
    backgroundColor: '#21B6A8'
  },
  background: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#f2f2f2',
    padding: 20
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
    paddingBottom: 20,
    paddingVertical: 20
    // justifyContent: 'flex-end'
  },
  header: {
    marginTop: 15,
    color: '#859593',
    fontFamily: 'Avenir',
    fontSize: 25,
    fontWeight: 'bold'
  },
  text: {
    color: '#859593',
    fontFamily: 'Avenir',
    fontSize: 16,
    textAlign: 'left',
    paddingRight: 50,
    paddingTop: 5,
    paddingLeft: 15
  },
  numericinput: {
    width: WIDTH - 200,
    height: 45,
    fontSize: 16,
    fontFamily: 'Avenir',
    backgroundColor: '#ecf7f9',
    color: '#859593',
    marginVertical: 25,
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
  },
  levelText: {
    color: '#859593',
    fontFamily: 'Avenir'
  }

});
