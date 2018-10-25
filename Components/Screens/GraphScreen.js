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
    this.props.navigation.addListener('willFocus', this.loadData) // listener to reload graph data when tab is pressed
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

    // const data= [
    //   { date: 'Aug 1', reading: 150},
    //   { date: 'Dec 13', reading: 180},
    //   { date: 'Jul 11', reading: 70},
    //   { date: 'Oct 13', reading: 60},
    //   { date: 'Dec 13.2', reading: 180},
    //   { date: 'Dec 13.2', reading: 180}
    //
    // ]

    // Formatted Dates
    const dataX = this.state.parsedData.map(obj => obj.formatDate);
    console.log(dataX);

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
              <VictoryChart style={{ parent: { maxWidth: "50%" } }}
              domainPadding={{x: [50, 0]}}
              height= {HEIGHT - 300}
              width= {WIDTH}
              >
                <VictoryBar
                  style={{
                    data: { fill: d => d.reading >= 150 ? '#ff6961' : ( d.reading >= 70 ? '#ffb347' : '#aec6cf' )},
                  }}
                  animate={{ duration: 2000 }}
                  data= {this.state.parsedData}
                  x= 'date'
                  y= {(d) => d.reading}
                />
                <VictoryAxis
                  style={{
                    axisLabel: {padding: 20}
                  }}
                  tickFormat= {dataX}
                />
                <VictoryAxis dependentAxis
                  style= {{
                    axisLabel: { padding: 35}
                  }}
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
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15
  },
  xAxis: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingLeft: 80,
  }
});
