const getData = async () => {
  const counter = await AsyncStorage.getItem('counter')
  const id = parseInt(counter - 1)
  const response = await AsyncStorage.getItem(`WID${id}`)
  const data = JSON.parse(response)
  return {data, id, counter}
}

const getCounter = async () => {
  const counter = await AsyncStorage.getItem('counter')
  return counter
}

const getAllData = async () => {
  const counter = await AsyncStorage.getItem('counter')
  const workouts = []
  for (i=0; i<counter; i++) {
    const data = await AsyncStorage.getItem(`WID${i}`)
    const workout = JSON.parse(data)
    workouts.push(workout)
  }
  return workouts
}

const getMax = (workouts, str) => {
  let arr = []
  for (i=0; i<workouts.length; i++) {
    arr.push(workouts[i][str])
  }
  return Math.max(...arr)
}

export default {getData, getCounter, getAllData, getMax}
