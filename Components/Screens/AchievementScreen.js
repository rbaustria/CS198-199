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
import LinearGradient from 'react-native-linear-gradient';

/* achievements:
    1 - enter your first normal reading                      /
    2 - enter 4 normal blood readings after an above reading /
    3 - enter 5 consecutive normal readings                   /
    4 - enter 4 normal blood readings after a below reading   /
    5 - enter 10 consecutive normal readings                  /
    6 - have a normal reading streak for 3 days               /
    7 - send data to researchers
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
      achievementDesc1: '???',
      achievementDesc2: '???',
      achievementDesc3: '???',
      achievementDesc4: '???',
      achievementDesc5: '???',
      achievementDesc6: '???',
      achievementDesc7: '???',
      achievementDesc8: '???'
    }
  };

  checkAchievement = async () => {
    var temp = await AsyncStorage.getItem('achievements');
    var completedAchievements = JSON.parse(temp);
    const achievementDescription = [
        'Enter your first reading!',
        'Enter four (4) consecutive normal readings after being above normal.',
        'Enter five (5) consecutive normal readings.',
        'Enter four (4) consecutive normal readings after being below normal.',
        'Enter ten (10) consecutive normal readings.',
        'Have a normal reading streak for three (3) days.',
        'Send data to the researchers.',
        'Read the Acknowledgement page.',
    ];

    // Set the achievement's corresponding icon and description message if unlocked.
    if (completedAchievements.includes('1')) {
      this.setState({
        icon1Name: 'vial',
        achievementDesc1: achievementDescription[0]
      })
    }
    if (completedAchievements.includes('2')) {
      this.setState({
        icon2Name: 'sort-amount-down',
        achievementDesc2: achievementDescription[1]
      })
    }
    if (completedAchievements.includes('3')) {
      this.setState({
        icon3Name: 'star-half-alt',
        achievementDesc3: achievementDescription[2]
      })
    }
    if (completedAchievements.includes('4')) {
      this.setState({
        icon4Name: 'sort-amount-up',
        achievementDesc4: achievementDescription[3]
      })
    }
    if (completedAchievements.includes('5')) {
      this.setState({
        icon5Name: 'american-sign-language-interpreting',
        achievementDesc5: achievementDescription[4]
      })
    }
    if (completedAchievements.includes('6')) {
      this.setState({
        icon6Name: 'rocket',
        achievementDesc6: achievementDescription[5]
      })
    }
    if (completedAchievements.includes('7')) {
      this.setState({
        icon7Name: 'user-graduate',
        achievementDesc7: achievementDescription[6]
      })
    }
    if (completedAchievements.includes('8')) {
      this.setState({
        icon8Name: 'award',
        achievementDesc8: achievementDescription[7]
      })
    }
  }

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
        <View style= {styles.background}>
          <View style= {styles.infoContainer}>
            <Icon name= 'ios-trophy' color= '#21B6A8' size= {40} />
            <Text style= {styles.text}>Welcome to your achievement case!</Text>
          </View>
          <View style= {styles.achievementContainer}>
            <View style= {styles.achievementIndivBox}>
              <FontAwesome5 name= {this.state.icon1Name} size={50} color= '#21B6A8' onPress={() => window.alert(this.state.achievementDesc1)}/>
            </View>
            <View style= {styles.achievementIndivBox}>
              <FontAwesome5 name= {this.state.icon2Name} size={50} color= '#21B6A8' onPress={() => window.alert(this.state.achievementDesc2)}/>
            </View>
            <View style= {styles.achievementIndivBox}>
              <FontAwesome5 name= {this.state.icon3Name} size={50} color= '#21B6A8' onPress={() => window.alert(this.state.achievementDesc3)}/>
            </View>
          </View>
          <View style= {styles.achievementContainer}>
            <View style= {styles.achievementIndivBox}>
              <FontAwesome5 name= {this.state.icon4Name} size={50} color= '#21B6A8' onPress={() => window.alert(this.state.achievementDesc4)}/>
            </View>
            <View style= {styles.achievementIndivBox}>
              <FontAwesome5 name= {this.state.icon5Name} size={50} color= '#21B6A8' onPress={() => window.alert(this.state.achievementDesc5)}/>
            </View>
            <View style= {styles.achievementIndivBox}>
              <FontAwesome5 name= {this.state.icon6Name} size={50} color= '#21B6A8' onPress={() => window.alert(this.state.achievementDesc6)}/>
            </View>
          </View>
          <View style= {styles.achievementContainer}>
            <View style= {styles.achievementIndivBox}>
              <FontAwesome5 name= {this.state.icon7Name} size={50} color= '#21B6A8' onPress={() => window.alert(this.state.achievementDesc7)}/>
            </View>
            <View style= {styles.achievementIndivBox}>
              <FontAwesome5 name= {this.state.icon8Name} size={50} color= '#21B6A8' onPress={() => window.alert(this.state.achievementDesc8)}/>
            </View>
          </View>
        </View>
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
});

AppRegistry.registerComponent('Achievements', () => Achievement);
