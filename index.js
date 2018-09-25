import React, { Component } from 'react';
import {
  AppRegistry,    // Registers the app
  StatusBar,      // Allows to hide the satatus bar
} from 'react-native';
import App from './Components/App';
//import SplashScreen from './Components/SplashScreen';

export default class Sugar extends Component {
  componentDidMount() {
    // Hide the status bar
    StatusBar.setHidden(true);
  }
  render() {
    return (
      <App />
      //<SplashScreen/>
    );
  }
}

AppRegistry.registerComponent('Sugar', () => Sugar);
