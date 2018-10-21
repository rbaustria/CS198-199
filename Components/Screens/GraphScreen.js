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
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis } from "victory-native";

const { width: WIDTH } = Dimensions.get('window')
const { height: HEIGHT } = Dimensions.get('window')

export default class GraphScreen extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  };

  clearData(){
    //AsyncStorage.clear();
    this.setState({test: []})
  }

  render () {
    // Formatted data to be graphed should be stored in an array called 'data'
    // Doesnt separate duplicates :c Dec 13, reading 60 will stack
    const data= [
      { date: 'Aug 1', reading: 150},
      { date: 'Dec 13', reading: 180},
      { date: 'Jul 11', reading: 70},
      { date: 'Oct 13', reading: 60},
      { date: 'Dec 13.2', reading: 180},
    ]

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
            <View style= {styles.infoContainer}>
              <VictoryChart
                  domainPadding={{x: 40}}
                  height={HEIGHT - 300}
                  width={WIDTH}
                >
                  <VictoryBar
                    style={{
                      data: { fill: d => d.reading >= 150 ? '#ff6961' : ( d.reading >= 70 ? '#ffb347' : '#aec6cf' )},
                    }}
                    data= { data }
                    x= 'date'
                    y= {(d) => d.reading + 100}
                  />
                  <VictoryAxis
                    label= 'date'
                    style= {{
                      axisLabel: { padding: 30 }
                    }}
                    fixLabelOverlap= { true }
                  />
                  <VictoryAxis dependentAxis
                    label= 'mg/dL'
                    style= {{
                      axisLabel: { padding: 35}
                    }}
                  />
              </VictoryChart>
            </View>
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
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    paddingTop: 30
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
  label: {
    marginTop: 20,
    color: '#000000',
    fontFamily: 'Avenir',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15
  }
});
