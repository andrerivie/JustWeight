import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ScrollView,
  TextInput,
  AsyncStorage,
} from 'react-native'
// import { ExpoConfigView } from '@expo/samples';

export default class WorkoutScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    const dateNow = new Date();
    const dateString = dateNow.toDateString()
    const setNewWorkout = async () => {
      const counter = await AsyncStorage.getItem('counter')
      await AsyncStorage.setItem(`WID${counter}`,
        JSON.stringify({
          date: dateString,
          set1: {
            pushups: '', pullups: '', handstand: '', lls: '', squats: ''
          },
          set2: {
            pushups: '', pullups: '', handstand: '', lls: '', squats: ''
          },
          set3: {
            pushups: '', pullups: '', handstand: '', lls: '', squats: ''
          },
        }))
      await AsyncStorage.setItem('counter', `${(parseInt(counter)+1)}`)
      const data = await AsyncStorage.getItem('WID2')
      console.log(JSON.parse(data))
    }
    setNewWorkout()
    this.state = {
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
      date: dateString,
    }
  }

  render() {
    let wkout = this.state;
    let num = (wkout.counter + 5) % 5;
    let ex = wkout.ex[num]
    const getData = async () => {
      const data = await AsyncStorage.getAllKeys()
      console.log('ALL KEYS', data)
    }
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.workoutText}>
              SET: {wkout.set} {'\n'}
              EXERCISE: {ex.name}
            </Text>
            <TextInput
            style={{height: 40}}
            keyboardType="numeric"
            autoFocus={true}
            onChangeText={(count) =>
              ex.count = count
              }
            onSubmitEditing={async () =>
              console.log(getData(), await AsyncStorage.getItem('counter'))
              //  async () => {
                //  try {
                //    await AsyncStorage.setItem(`${wkout.date}`,
                //     `${ex.name}-${wkout.set}: ${ex.count}`);
                //  } catch (error) {
                //    console.log(error)
                 }


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
    backgroundColor: '#fff',
    marginTop: 30,
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  workoutText: {
    fontSize: 40,
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
