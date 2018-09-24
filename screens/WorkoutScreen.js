import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TextInput,
  AsyncStorage,
  Button
} from 'react-native'
// import { ExpoConfigView } from '@expo/samples';

const defaultState = {
  ex:
    [{
      name: 'PUSHUPS',
      count: 0
    },{
      name: 'PULLUPS',
      count: 0
    },{
      name: 'HANDSTAND',
      count: 0
    },{
      name: 'LEGLIFTS',
      count: 0
    },{
      name: 'SQUATS',
      count: 0
    }],
  set: 1,
  counter: 0,
  workoutCompleted: false,
  workoutCreated: false,
  ready: false
}

export default class WorkoutScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.state = defaultState
    this.setNewWorkout = this.setNewWorkout.bind(this)
  }

  setNewWorkout = async () => {
    const dateNow = new Date();
    const dateString = dateNow.toDateString()
    if (dateNow.getMinutes().toString().length === 2) {
      var startTime = `${dateNow.getHours()}:${dateNow.getMinutes()}`
    } else {
      var startTime = `${dateNow.getHours()}:0${dateNow.getMinutes()}`
    }
    const counter = await AsyncStorage.getItem('counter')
    await AsyncStorage.setItem(`WID${counter}`,
      JSON.stringify({
        id: counter,
        date: dateString,
        startTime: startTime,
        endTime: '',
        exercises: {
          PUSHUPS: [],
          PULLUPS: [],
          HANDSTAND: [],
          LEGLIFTS: [],
          SQUATS: [],
        }
      }))
    await AsyncStorage.setItem('counter', `${(parseInt(counter)+1)}`)
    const data = await AsyncStorage.getItem(`WID${counter}`)
    console.log(JSON.parse(data))
  }

  async componentDidMount() {
    this.setState(defaultState)
  }

  async componentDidUpdate() {
    if (this.state.workoutCompleted === true) {
      this.setState({
        workoutCompleted: false
      })
    }
  }

  render() {

    let wkout = this.state;
    let num = (wkout.counter + 5) % 5;
    let ex = wkout.ex[num]
    let name = ex.name
    const getData = async () => {
      const counter = await AsyncStorage.getItem('counter')
      const id = parseInt(counter - 1)
      const response = await AsyncStorage.getItem(`WID${id}`)
      const data = JSON.parse(response)
      return {data, id}
    }
    if (this.state.set === 4) {
      return (
        <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.workoutText}>
              WORKOUT COMPLETE - GET IT GET ITTT!
            </Text>
            <Button
              onPress={async () => {

                const {data} = await getData();
                const dateNow = new Date();
                if (dateNow.getMinutes().toString().length === 2) {
                  var endTime = `${dateNow.getHours()}:${dateNow.getMinutes()}`
                } else {
                  var endTime = `${dateNow.getHours()}:0${dateNow.getMinutes()}`
                }
                await AsyncStorage.mergeItem(`WID${data.id}`, JSON.stringify({endTime: endTime}))
                this.setState(defaultState)
                this.setState({
                  workoutCompleted: true
                })
                this.props.navigation.navigate('Data', { loading: true})}}
              title="Go to Data"
              color="#841584"
              />
            </View>
            </ScrollView>
            </View>
      )
    }
    if (this.state.ready === false) {
      return (
        <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} >
          <View style={styles.workoutTextContainer}>
            <Text style={styles.workoutText}>
              The Workout{'\n'}
            </Text>
            <Text style={{fontSize: 24, textAlign: 'center'}}>Three sets of five body weight exercises: {'\n\n'}Pushups{'\n'}Pullups{'\n'}Handstands{'\n'}Leg Lifts{'\n'}Squats{'\n\n'}meant to be done with 30-45 seconds of rest{'\n\n'}</Text>
            <Button
            title={`READY`}
            color='purple'
            onPress={() => {
              this.setState({
                ready: true
              })
            }}
            />
            </View>
            </ScrollView>
            </View>
      )
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} >
          <View style={styles.welcomeContainer}>
            <Text style={styles.workoutText}>
              SET: {wkout.set} {'\n'}
              EXERCISE: {ex.name}
            </Text>
            <TextInput
            style={{height: 200, width: 300, fontSize: 60, textAlign: 'center'}}
            keyboardType="numeric"
            autoFocus={true}
            caretHidden={true}
            underlineColorAndroid='transparent'
            blurOnSubmit={false}
            placeholder={`reps/${'\n'}seconds`}
            ref={input => {this.textInput = input}}
            onChangeText={(count) =>
              ex.count = count
              }
            onSubmitEditing={async () => {
                 try {
                    if (this.state.workoutCreated === false) {
                      await this.setNewWorkout()
                      await this.setState({
                        workoutCreated: true
                      })
                    }

                    const {data} = await getData()
                   const delta = {
                     exercises: {
                       [name]: [...data.exercises[name], ex.count]
                     }
                   }
                   await AsyncStorage.mergeItem(`WID${data.id}`, JSON.stringify(delta))
                   if (num === 4 && this.state.counter !== 0) {
                     await this.setState({
                       set: parseInt(this.state.set + 1),
                       counter: parseInt(this.state.counter+1)
                     })
                   } else {
                   await this.setState({
                     counter: parseInt(this.state.counter+1)
                   })
                  }
                  this.textInput.clear()



                 } catch (error) {
                   console.log(error)
                 }
            }}


             />
          </View>
          </ScrollView>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    alignItems: 'center',
  },
  contentContainer: {
    paddingTop: 30,
    alignItems: 'center',
  },
  welcomeContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  workoutTextContainer: {
    flex: 1,
    padding: 20,
  },
  workoutText: {
    flex: 1,
    fontSize: 40,
    textAlign: 'center'
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
