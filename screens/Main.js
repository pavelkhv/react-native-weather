import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { connect } from "react-redux";
import { getWeatherAction } from "../actions/index";

import Preloader from '../components/Preloader/Preloader';

import icons from "../assets/js/weatherIcons";

const getTime = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  let strTime = `${hours}:${minutes} ${ampm}`;

  return strTime;
}

const Main = (props) => {
  const {
    state: { geocode, weather, location, errorMessage },
    getWeatherAction,
  } = props;

  useEffect(() => {
    getWeatherAction();
  }, []);

  const sunrise = getTime(new Date(weather && weather.sys.sunrise * 1000));
  const sunset = getTime(new Date(weather && weather.sys.sunset * 1000));

  return (weather && geocode) ? (
    <View style={styles.overlay}>
      <View style={styles.header}>
        <Text style={styles.city}>{geocode[0].city}, {geocode[0].isoCountryCode}</Text>
        <Text style={styles.street}>{geocode[0].street}</Text>
        <Text style={styles.coords}>{location.latitude}, {location.longitude}</Text>
      </View>

      <View style={styles.main}>
        <Image source={icons[weather.weather[0].icon]} style={{ width: 130, height: 130 }} />
        <Text style={styles.temp}>{weather.main.temp.toFixed()} &#8451;</Text>
        <Text style={styles.description}>{weather.weather[0].main}</Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.sunrise}>
          <Text style={styles.sunriseTime}>{sunrise}</Text>
          <View style={styles.sunriseWrap}>
            <Image source={require('../assets/img/icons/sunrise.png')} style={{width: 24, height: 24}}/>
            <Text style={styles.sunriseText}>sunrise</Text>
          </View>
        </View>
        <View style={styles.sunset}>
          <Text style={styles.sunsetTime}>{sunset}</Text>
          <View style={styles.sunsetWrap}>
            <Image source={require('../assets/img/icons/sunset.png')} style={{width: 24, height: 24}}/>
            <Text style={styles.sunsetText}>sunset</Text>
          </View>
        </View>
      </View>
      
    </View>
  ) : (
    <Preloader />
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  city: {
    color: '#43676A',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10
  },
  street: {
    color: '#ccc',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5
  },
  coords: {
    color: '#ccc',
  },
  main: {
    alignItems: 'center'
  },
  temp: {
    color: "#fff",
    fontSize: 50
  },
  description: {
    color: '#ccc',
    fontSize: 36
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  sunset: {
    alignItems: 'center'
  },
  sunsetTime: {
    fontSize: 40,
    color: '#43676A',
  },
  sunsetWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  sunsetText: {
    fontSize: 24,
    textTransform: 'uppercase',
    color: '#bbb',
    marginLeft: 10
  },
  sunrise: {
    alignItems: 'center'
  },
  sunriseTime: {
    fontSize: 40,
    color: '#43676A',
  },
  sunriseWrap: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  sunriseText: {
    fontSize: 24,
    textTransform: 'uppercase',
    color: '#bbb',
    marginLeft: 10
  }
});

const mapStateToProps = (state) => ({
  state: state.weather,
});

export default connect(mapStateToProps, { getWeatherAction })(Main);
