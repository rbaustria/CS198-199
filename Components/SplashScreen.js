// Splash screen, show this screen first every time the app opens.
// If first time opening, direct to onboarding screens
// Otherwise go to the Homepage.


import React, { Component, Text} from 'react';
import { AsyncStorage } from 'react-native';

import App from './App';
import HomeScreen from './Screens/HomeScreen';
import EditInfo from './Screens/EditInfo';

export default class SplashScreen extends Component {

    constructor(props){
      super();
        this.state = {firstLaunch: null};
    }

    componentDidMount() {
      AsyncStorage.getItem('alreadyLaunched').then(value => {
            if(value == null){
                 AsyncStorage.setItem('alreadyLaunched', 'true'); // No need to wait for `setItem` to finish, although you might want to handle errors
                 this.setState({firstLaunch: 'true'});
            }
            else{
                 this.setState({firstLaunch: 'false'});
            }})
    }

    // Handles event where Onboarding should only be shown once unless app is reinstalled.
    render() {
      if (this.state.firstLaunch == null) {
          return null;
      }
      else if (this.state.firstLaunch == 'true') {
          return <App/>;
      }
      else {
          return <HomeScreen/>;
      }
    }
}
