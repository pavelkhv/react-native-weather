import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

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