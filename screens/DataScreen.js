import React from 'react';
import {
  ScrollView,
  StyleSheet,
  AsyncStorage,
  Text,
  View,
  Button
} from 'react-native';

export default class DataScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.state = {workouts: {}, loading: true, newWorkout: false}
    this.getData = this.getData.bind(this)
  }

  getData = async () => {
    const counter = await AsyncStorage.getItem('counter')
    const workouts = []
    for (i=0; i<counter; i++) {
      const data = await AsyncStorage.getItem(`WID${i}`)
      const workout = JSON.parse(data)
      workouts.push(workout)
    }
    return workouts
  }

  async componentDidMount() {
    const workouts = await this.getData()
    await this.setState({
      workouts: workouts
    })
    this.setState({loading: false})
  }

  async componentDidUpdate() {
    if (this.state.loading === true) {
    const workouts = await this.getData()
    await this.setState({
      workouts: workouts
    })
    this.setState({loading: false})
  }
  }

  componentWillReceiveProps() {
    this.setState({
      loading: true
    })
  }


  render() {
    const workouts = this.state.workouts
    if (this.state.loading === true) {
      return (<Text>Loading...</Text>

      )
    } else if (workouts.length === 1) {
      return (
        <ScrollView style={styles.container}>
            <View >
            <Text style={styles.nodata}>Complete a workout to see stats here!</Text>
            </View>
            </ScrollView>

      )
    } else {
    return (
        <ScrollView style={styles.container}>

        {workouts.slice(0).reverse().map((workout, index) => {
          if (workout === null) {}
          else return (
            <View key ={workout.id} style={styles.wkoutContainer}>
            <View style={styles.wkoutLeft}>
              <Text key={workout.id} style={styles.wkoutTitle}>Workout {workout.id}</Text>
              <Text>Date: {workout.date}</Text>
              <Text>Start Time: {workout.startTime}</Text>
              <Text>End Time: {workout.endTime}</Text>
            </View>
            <View style={styles.wkoutRight}>
              <Text>Pushups: {workout.exercises.PUSHUPS.join(", ")}</Text>
              <Text>Pullups: {workout.exercises.PULLUPS.join(", ")}</Text>
              <Text>Handstand: {workout.exercises.HANDSTAND.join(", ")}</Text>
              <Text>Leg Lifts: {workout.exercises.LEGLIFTS.join(", ")}</Text>
              <Text>Squats: {workout.exercises.SQUATS.join(", ")}</Text>
              </View>
            </View>
          )})}



        <View>
        <Text>{'\n'}</Text>
        </View>

      </ScrollView>
    );
  }
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 40,
    backgroundColor: 'lightgrey',
  },
  wkoutContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 10,
    paddingBottom: 10
  },
  wkoutLeft: {
    flex: 1
  },
  wkoutRight: {
    flex: 1
  },
  wkoutTitle: {
    fontWeight: 'bold'
  },
  nodata: {
    padding: 30,
    fontSize: 24,
    textAlign: 'center'

  }
});
