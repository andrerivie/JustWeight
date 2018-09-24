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


  render() {
    const workouts = this.state.workouts
    if (this.state.loading === true) {
      return (<Text>Loading...</Text>

      )
    } else {
    return (

      <ScrollView style={{paddingTop: 24}}>
        <Button
        onPress={()=>this.setState({
          loading: true
        })}
        title='Refresh Data'
        color="#841584"
        />
        <ScrollView style={styles.container}>

        {workouts.slice(0).reverse().map((workout, index) => {
          if (workout === null || !workout.exercises.PUSHUPS[0]) {}
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
      </ScrollView>
    );
  }
}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 20,
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
  }
});
