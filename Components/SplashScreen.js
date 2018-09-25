// Splash screen, show this screen first every time the app opens.
// If first time opening, direct to onboarding screens
// Otherwise go to the Homepage.


import React, { Component } from "react";
import { AsyncStorage } from "react-native";

import App from './App';
import HomeScreen from './Screens/HomeScreen';

export default class SplashScreen extends Component {

    constructor(props){
      super(props);
      this.state = {
          timePassed: false,
      };
    }

    componentDidMount() {
      setTimeout( () => {
          this.setTimePassed();
      },1000);
    }

    setTimePassed() {
      this.setState({timePassed: true});
    }

    render() {
      if (!this.state.timePassed) {
          return <App/>;
      } else {
          return <HomeScreen/>;
      }
    }
      return <SplashScreen/>
  }
