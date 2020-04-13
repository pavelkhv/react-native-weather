import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import * as firebase from 'firebase';
import 'firebase/firestore';

const getTime = (date) => {
  let dd = date.getDate();
  dd = (dd < 10) ? `0${dd}` : dd;

  let mm = date.getMonth() + 1;
  mm = (mm < 10) ? `0${mm}` : mm;

  let yy = date.getFullYear() % 100;
  yy = (yy < 10) ? `0${yy}` : yy;

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = (hours >= 12) ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = (minutes < 10) ? `0${minutes}` : minutes;

  let strTime = `${dd}.${mm}.${yy} ${hours}:${minutes} ${ampm}`;

  return strTime;
}

export const getHistory = history => ({
  type: "GET_HISTORY",
  history
});

export const getWeatherAction = () => {
  return async dispatch => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') getWeatherError();
    
    const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    const { latitude , longitude } = location.coords;
  
    const geocode = await Location.reverseGeocodeAsync({latitude, longitude});
  
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=77f13d7c88e47c161fe89d5d7494a68c`)
      .then(response => response.json())
      .then(data => {
        dispatch(getWeatherSuccess(data, geocode, { latitude , longitude }));

        const uid = firebase.auth().currentUser.uid;

        firebase.firestore().collection("History").doc(uid).collection("list").add({
          data: data,
          geocode: geocode,
          location: {latitude, longitude},
          created: getTime(new Date())
        })
      });
  }
}

const getWeatherSuccess = (data, geocode, coords) => ({
  type: "GET_WEATHER",
  data,
  geocode,
  coords
});

const getWeatherError = () => ({
  type: "ERROR_WEATHER"
});