import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Dimensions
} from 'react-native';

import { Header } from 'react-native-elements';
import { BarChart, LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import { VictoryBar, VictoryChart, VictoryTheme } from "victory-native";



const { width: WIDTH } = Dimensions.get('window')
const { height: HEIGHT } = Dimensions.get('window')

export default class GraphScreen extends Component {
  constructor(props) {
    super(props);
    this.state= {
      graphValue= ''
    };
  }

  returnBarColor(value) {
    // insert how to change BarColor based on the reading/value
  }

  render () {
    return (
      <SafeAreaView style= {styles.safeArea}>
        <View>
          <StatusBar barStyle='light-content' hidden= {false}/>
          <Header placement= 'left' centerComponent={{ text: 'Stats', placement: 'center', style: { color: '#fff', fontFamily: 'Avenir', fontSize: 20, fontWeight: 'bold' } }} outerContainerStyles={{ backgroundColor: '#21B6A8', height: 60}}/>
        </View>
        <ScrollView style= {styles.scrollContainer}
          bounces= {false}
          >
          <View style= {styles.background}>
            <VictoryChart height={HEIGHT - 300} width={WIDTH - 50}
              domainPadding={{ x: 60, y: [0, 20] }}
              scale={{ x: "time" }}
              >
              <VictoryBar
                style= {{ data: { fill: "tomato" } }}
                data={ [
                { x: 'Jun 21', y: 90 },
                { x: 'Jun 22', y: 100 },
                { x: 'Aug 1', y: 60 },
                { x: 'Dec 25', y: 70 }
              ] }
              />
            </VictoryChart>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}


const graphStyle = {
  flex: 1,
  alignSelf: 'stretch'
}

const styles = StyleSheet.create ({
  safeArea: {
    flex: 1,
    backgroundColor: '#21B6A8',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  background: {
    flex: 1,
    alignSelf: 'stretch',
    //alignContent: 'center',
    //justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    paddingLeft: 30,
  },
  label: {
    marginTop: 20,
    color: '#000000',
    fontFamily: 'Avenir',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15
  }
});
