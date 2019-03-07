import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  AsyncStorage
} from 'react-native';

import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons.js';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5.js';
import Entypo from 'react-native-vector-icons/Entypo.js';
import * as Animatable from 'react-native-animatable';
import AwesomeAlert from 'react-native-awesome-alerts';

/* achievements:
    1 - enter your first normal reading                      /
    2 - enter 4 normal blood readings after an above reading /
    3 - enter 5 consecutive normal readings                   /
    4 - enter 4 normal blood readings after a below reading   /
    5 - enter 10 consecutive normal readings                  /
    6 - have a normal reading streak for 3 days               /
    7 - send data to researchers                              /
    8 - read Acknowledgement                                  /
*/

export default class AchievementScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      icon1Name: 'lock',
      icon2Name: 'lock',
      icon3Name: 'lock',
      icon4Name: 'lock',
      icon5Name: 'lock',
      icon6Name: 'lock',
      icon7Name: 'lock',
      icon8Name: 'lock',
      achievementDesc1: 'This achievement is locked. Continue using SugarTraces to unlock it!',
      achievementDesc2: 'This achievement is locked. Continue using SugarTraces to unlock it!',
      achievementDesc3: 'This achievement is locked. Continue using SugarTraces to unlock it!',
      achievementDesc4: 'This achievement is locked. Continue using SugarTraces to unlock it!',
      achievementDesc5: 'This achievement is locked. Continue using SugarTraces to unlock it!',
      achievementDesc6: 'This achievement is locked. Continue using SugarTraces to unlock it!',
      achievementDesc7: 'This achievement is locked. Continue using SugarTraces to unlock it!',
      achievementDesc8: 'This achievement is locked. Continue using SugarTraces to unlock it!',
      achievement1Color: '#389e94',
      achievement2Color: '#389e94',
      achievement3Color: '#389e94',
      achievement4Color: '#389e94',
      achievement5Color: '#389e94',
      achievement6Color: '#389e94',
      achievement7Color: '#389e94',
      achievement8Color: '#389e94',
      showAlert: false
    }
  };

  checkAchievement = async () => {
    var temp = await AsyncStorage.getItem('achievements');
    var parsedAchievements = JSON.parse(temp);
    var achDateArray = parsedAchievements.map(obj => obj.date);
    var completedAchievements = parsedAchievements.map(obj => obj.number);


    const achievementDescription = [
        'Entered your first reading!',
        'Entered four (4) consecutive normal readings after an above normal reading.',
        'Entered five (5) consecutive normal readings.',
        'Entered four (4) consecutive normal readings after a below normal reading.',
        'Entered ten (10) consecutive normal readings.',
        'Had a normal blood glucose streak for three (3) days!',
        'Shared your data!',
        'Read the Acknowledgement page.',
    ];

    // Set the achievement's corresponding icon and description message if unlocked.
    if (completedAchievements.includes('1')) {
      let dateIndex = completedAchievements.indexOf('1')
      // Remove \n to formatDate
      let unlockDate = (achDateArray[dateIndex]).replace(/\n/g, ' ')
      // Full description with date achieved.
      let fullDesc = achievementDescription[0] + '\n' + "Date unlocked: " + unlockDate

      this.setState({
        icon1Name: 'vial',
        achievementDesc1: fullDesc,
        achievement1Color: '#21B6A8'
      })
    }
    if (completedAchievements.includes('2')) {
      let dateIndex = completedAchievements.indexOf('2')
      let unlockDate = achDateArray[dateIndex].replace(/\n/g, ' ')
      let fullDesc = achievementDescription[1] + '\n' + "Date unlocked: " + unlockDate
      this.setState({
        icon2Name: 'sort-amount-down',
        achievementDesc2: fullDesc,
        achievement2Color: '#21B6A8'
      })
    }
    if (completedAchievements.includes('3')) {
      let dateIndex = completedAchievements.indexOf('3')
      let unlockDate = achDateArray[dateIndex].replace(/\n/g, ' ')
      let fullDesc = achievementDescription[2] + '\n' + "Date unlocked: " + unlockDate
      this.setState({
        icon3Name: 'star-half-alt',
        achievementDesc3: fullDesc,
        achievement3Color: '#21B6A8'
      })
    }
    if (completedAchievements.includes('4')) {
      let dateIndex = completedAchievements.indexOf('4')
      let unlockDate = achDateArray[dateIndex].replace(/\n/g, ' ')
      let fullDesc = achievementDescription[3] + '\n' + "Date unlocked: " + unlockDate
      this.setState({
        icon4Name: 'sort-amount-up',
        achievementDesc4: fullDesc,
        achievement4Color: '#21B6A8'
      })
    }
    if (completedAchievements.includes('5')) {
      let dateIndex = completedAchievements.indexOf('5')
      let unlockDate = achDateArray[dateIndex].replace(/\n/g, ' ')
      let fullDesc = achievementDescription[4] + '\n' + "Date unlocked: " + unlockDate
      this.setState({
        icon5Name: 'american-sign-language-interpreting',
        achievementDesc5: fullDesc,
        achievement5Color: '#21B6A8'
      })
    }
    if (completedAchievements.includes('6')) {
      let dateIndex = completedAchievements.indexOf('6')
      let unlockDate = achDateArray[dateIndex].replace(/\n/g, ' ')
      let fullDesc = achievementDescription[5] + '\n' + "Date unlocked: " + unlockDate
      this.setState({
        icon6Name: 'rocket',
        achievementDesc6: fullDesc,
        achievement6Color: '#21B6A8'
      })
    }
    if (completedAchievements.includes('7')) {
      let dateIndex = completedAchievements.indexOf('7')
      let unlockDate = achDateArray[dateIndex].replace(/\n/g, ' ')
      let fullDesc = achievementDescription[6] + '\n' + "Date unlocked: " + unlockDate
      this.setState({
        icon7Name: 'user-graduate',
        achievementDesc7: fullDesc,
        achievement7Color: '#21B6A8'
      })
    }
    if (completedAchievements.includes('8')) {
      let dateIndex = completedAchievements.indexOf('8')
      let unlockDate = achDateArray[dateIndex].replace(/\n/g, ' ')
      let fullDesc = achievementDescription[7] + '\n' + "Date unlocked: " + unlockDate
      this.setState({
        icon8Name: 'award',
        achievementDesc8: fullDesc,
        achievement8Color: '#21B6A8'
      })
    }
  }

  showAlert(message) {
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

  // Rerenders the Achievement page to check if a new one is unlocked and to display it.
  componentDidMount(){
    this.checkAchievement();
    this.reload = this.props.navigation.addListener('willFocus', this.checkAchievement) // listener to reload graph data when tab is pressed
  }

  componentWillUnmount () {
    this.reload.remove();
  }

  render () {
    return (
      <SafeAreaView style= {styles.safeArea}>
        <View>
          <StatusBar barStyle='light-content' hidden= {false}/>
          <Header placement= 'left' centerComponent={{ text: 'Achievements', placement: 'center', style: { color: '#fff', fontFamily: 'Avenir', fontSize: 20, fontWeight: 'bold' } }} outerContainerStyles={{ backgroundColor: '#21B6A8', height: 60}}/>
        </View>
        <ScrollView style= {styles.scrollContainer}>
        <View style= {styles.background}>
          <View style= {styles.infoContainer}>
            <Icon name= 'ios-trophy' color= '#21B6A8' size= {40} style = {{paddingLeft: 30}} />
            <Text style= {styles.text}>These are your current achievements.</Text>
          </View>
          <View style= {styles.achievementContainer}>
            <View style= {styles.achievementIndivBox}>
              <FontAwesome5 name= {this.state.icon1Name} size={50} color= {this.state.achievement1Color} onPress={() => this.showAlert(this.state.achievementDesc1)}/>
            </View>
            <View style= {styles.achievementIndivBox}>
              <FontAwesome5 name= {this.state.icon2Name} size={50} color= {this.state.achievement2Color} onPress={() => this.showAlert(this.state.achievementDesc2)}/>
            </View>
            <View style= {styles.achievementIndivBox}>
              <FontAwesome5 name= {this.state.icon3Name} size={50} color= {this.state.achievement3Color} onPress={() => this.showAlert(this.state.achievementDesc3)}/>
            </View>
          </View>
          <View style= {styles.achievementContainer}>
            <View style= {styles.achievementIndivBox}>
              <FontAwesome5 name= {this.state.icon4Name} size={50} color= {this.state.achievement4Color} onPress={() => this.showAlert(this.state.achievementDesc4)}/>
            </View>
            <View style= {styles.achievementIndivBox}>
              <FontAwesome5 name= {this.state.icon5Name} size={50} color= {this.state.achievement5Color} onPress={() => this.showAlert(this.state.achievementDesc5)}/>
            </View>
            <View style= {styles.achievementIndivBox}>
              <FontAwesome5 name= {this.state.icon6Name} size={50} color= {this.state.achievement6Color} onPress={() => this.showAlert(this.state.achievementDesc6)}/>
            </View>
          </View>
          <View style= {styles.achievementContainer}>
            <View style= {styles.achievementIndivBox}>
              <FontAwesome5 name= {this.state.icon7Name} size={50} color= {this.state.achievement7Color} onPress={() => this.showAlert(this.state.achievementDesc7)}/>
            </View>
            <View style= {styles.achievementIndivBox}>
              <FontAwesome5 name= {this.state.icon8Name} size={50} color= {this.state.achievement8Color} onPress={() => this.showAlert(this.state.achievementDesc8)}/>
            </View>
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

        </ScrollView>
      </SafeAreaView>
    );
  }
}


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
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#d3d3d3',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    padding: 20,
    marginBottom: 15
  },
  achievementContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  achievementIndivBox: {
    padding: 20
  },
  text: {
    color: '#859593',
    fontFamily: 'Avenir',
    fontSize: 18,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 5
  },
  scrollContainer: {
    backgroundColor: '#f2f2f2'
  },
});

AppRegistry.registerComponent('Achievements', () => Achievement);
