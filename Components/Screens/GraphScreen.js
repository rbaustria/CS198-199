import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Dimensions,
  AsyncStorage,
  TouchableOpacity
} from 'react-native';

import { Header } from 'react-native-elements';
import Octicons from 'react-native-vector-icons/Octicons.js';
import { VictoryBar, VictoryChart, VictoryAxis } from 'victory-native';

const { width: WIDTH } = Dimensions.get('window')
const { height: HEIGHT } = Dimensions.get('window')

export default class GraphScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      parsedData: [],
    }

  };

  componentDidMount() {
    this.loadData();
    this.reloadGraphData = this.props.navigation.addListener('willFocus', this.loadData) // listener to reload graph data when tab is pressed
  }

  componentWillUnmount () {
    this.reloadGraphData.remove();
  }

  loadData = async () => {
    try {

      let parsedData = this.state.parsedData;
      const storedData = await AsyncStorage.getItem('storedData');
      const parsed = JSON.parse(storedData);
      const graphData = []

      if (parsed != null) {
        console.log('Parsed Data: ', parsed);
        if (parsed.length < 6) {
          this.setState({
            parsedData: parsed,
          })
        }
        else {
          var lastFive = parsed.length - 6;
          for (let i=lastFive; i < parsed.length; i++) {
            graphData.push(parsed[i])
          }
          this.setState({
            parsedData: graphData,
          })
        }
      }
      else {
        console.log('No data to be graphed yet. Try to refresh.');
        return;
      }
    }
    catch (error) {
      console.log(error);
    }

  }

  render () {
    // Formatted Dates
    const dataX = this.state.parsedData.map(obj => obj.formatDate);

    return (
      <SafeAreaView style= {styles.safeArea}>
        <View>
          <StatusBar barStyle='light-content' hidden= {false}/>
          <Header placement= 'left' centerComponent={{ text: 'Stats', placement: 'center', style: { color: '#fff', fontFamily: 'Avenir', fontSize: 20, fontWeight: 'bold' } }} outerContainerStyles={{ backgroundColor: '#21B6A8', height: 60}}/>
        </View>
        <ScrollView style= {styles.scrollContainer}>
          <View style= {styles.background}>
              <VictoryChart style={{ parent: { maxWidth: "50%" } }}
              domainPadding={{x: [50, 0]}}
              height= {HEIGHT - 300}
              width= {WIDTH}
              >
                <VictoryBar
                  style={{
                    data: { fill: d => d.reading >= 150 ? '#ff6961' : ( d.reading >= 70 ? '#ffb347' : '#aec6cf' )},
                  }}
                  animate={{ duration: 1000 }}
                  data= {this.state.parsedData}
                  x= 'date'
                  y= {(d) => d.reading}
                />
                <VictoryAxis
                  style={{
                    axisLabel: {padding: 20},
                  }}
                  tickFormat= {dataX}
                />
                <VictoryAxis dependentAxis
                  style= {{
                    axisLabel: { padding: 35}
                  }}
                />
            </VictoryChart>
            <View style= {{flexDirection: 'column', justifyContent: 'center'}}>
              <View style= {styles.legendContainer}>
                <Octicons name='primitive-square' {...redSquare} />
                <Text style= {styles.text}> Above </Text>
              </View>
              <View style= {styles.legendContainer}>
                <Octicons name='primitive-square' {...orangeSquare} />
                <Text style= {styles.text}> Normal </Text>
              </View>
              <View style= {styles.legendContainer}>
                <Octicons name='primitive-square' {...blueSquare} />
                <Text style= {styles.text}> Below </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const redSquare = {
  size: 30,
  color: '#ff6961',
  flex: 1,
};

const orangeSquare = {
  size: 30,
  color: '#ffb347',
  flex: 1,
};

const blueSquare = {
  size: 30,
  color: '#aec6cf',
  flex: 1,
};

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
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 15
  },
  legendContainer: {
    paddingLeft: 40,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignContent: 'flex-start',
  },
  text: {
    color: '#859593',
    fontFamily: 'Avenir',
    fontSize: 15,
    paddingTop: 5
  }
});
