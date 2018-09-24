import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Button
} from 'react-native';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props)
    this.state = {
      pushMax: 0,
      pullMax: 0,
      handMax: 0,
      legMax: 0,
      squatMax: 0,
      totalWorkouts: 0,
      loading: true,
      refresh: false
    }
    this.getData = this.getData.bind(this)
    this.getMax = this.getMax.bind(this)
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

  getMax = (workouts, str) => {
    let arr = []
    if (workouts[1] === undefined) return 0
    else {
      for (let i=1; i<workouts.length; i++) {
        arr.push(...workouts[i].exercises[`${str}`])
      }
    return Math.max(...arr)
    }
  }

  async componentDidMount() {
    const newUserCheck = async () => {
      const counter = await AsyncStorage.getItem('counter')
      if (!counter || counter === NaN || counter === null) {
        await AsyncStorage.setItem('counter', '1')
      }
    }
    await newUserCheck();
    const workouts = await this.getData()
    const pushMax = await this.getMax(workouts, 'PUSHUPS')
    const pullMax = await this.getMax(workouts, 'PULLUPS')
    const handMax = await this.getMax(workouts, 'HANDSTAND')
    const legMax = await this.getMax(workouts, 'LEGLIFTS')
    const squatMax = await this.getMax(workouts, 'SQUATS')
    this.setState({
      pushMax, pullMax, handMax, legMax, squatMax,
      totalWorkouts: workouts.length-1,
      loading: false
    })

  }

  async componentDidUpdate() {
    if (this.state.loading === true) {
    const workouts = await this.getData()
    const pushMax = await this.getMax(workouts, 'PUSHUPS')
    const pullMax = await this.getMax(workouts, 'PULLUPS')
    const handMax = await this.getMax(workouts, 'HANDSTAND')
    const legMax = await this.getMax(workouts, 'LEGLIFTS')
    const squatMax = await this.getMax(workouts, 'SQUATS')
    this.setState({
      pushMax, pullMax, handMax, legMax, squatMax,
      totalWorkouts: workouts.length-1,
      loading: false
    })
  }

  }



  render() {



    if (this.state.loading === true) {
      return (
        <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/logo.png')
                  : require('../assets/images/logo.png')
              }
              style={styles.welcomeImage}
            />
          </View>
          <View style={{alignItems: 'center'}}>
        <Text style={{padding: 10, fontSize: 24}}>
          Loading...
        </Text>
        </View>
        </ScrollView>
        </View>

      )
    }
    else {
      return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/logo.png')
                  : require('../assets/images/logo.png')
              }
              style={styles.welcomeImage}
            />
          </View>
          <View style={{alignItems: 'center'}}>
        <Text style={{padding: 10, fontSize: 42}}>
          Achievements
        </Text>
        <Text style={{fontSize: 24}}>Total Workouts: {this.state.totalWorkouts}{`\n`}</Text>
        <Text style={{fontSize: 24}}>Personal Records{'\n'}</Text>
        <Text style={{fontSize: 18}}>Pushups: {this.state.pushMax}</Text>
        <Text style={{fontSize: 18}}>Pullups: {this.state.pullMax}</Text>
        <Text style={{fontSize: 18}}>Handstand: {this.state.handMax} sec</Text>
        <Text style={{fontSize: 18}}>Leg Lifts: {this.state.legMax}</Text>
        <Text style={{fontSize: 18}}>Squats: {this.state.squatMax}{'\n\n'}</Text>
        </View>
        <Button
          onPress={()=>this.setState({
            loading: true
          })}
          title='Refresh Data'
          color="#841584"
          />
        </ScrollView>

        </View>
    );
  }
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
  welcomeImage: {
    // width: 100,
    // height: 80,
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
