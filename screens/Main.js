import React, { useEffect, useCallback, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Image, RefreshControl } from "react-native";
import { connect } from "react-redux";
import { getWeatherAction } from "../actions/index";

import Preloader from "../components/Preloader/Preloader";
import ItemFooter from "../components/ItemFooter/ItemFooter";

import icons from "../assets/js/weatherIcons";

const getTime = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  let strTime = `${hours}:${minutes} ${ampm}`;

  return strTime;
};

const Main = (props) => {
  const [refreshing, setRefreshing] = useState(false);

  const {state: { geocode, weather, location }, getWeatherAction } = props;

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getWeatherAction();
    setRefreshing(false);
  }, [refreshing]);

  useEffect(() => {
    getWeatherAction();
  }, []);

  const sunrise = getTime(new Date(weather && weather.sys.sunrise * 1000));
  const sunset = getTime(new Date(weather && weather.sys.sunset * 1000));

  return weather && geocode ? (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.city}>
            {geocode[0].city}, {geocode[0].isoCountryCode}
          </Text>
          <Text style={styles.street}>
            {geocode[0].street}
          </Text>
          <Text style={styles.coords}>
            {location.latitude}, {location.longitude}
          </Text>
        </View>

        <View style={styles.main}>
          <Image source={icons[weather.weather[0].icon]} style={styles.icon} />
          <Text style={styles.temp}>{weather.main.temp.toFixed()} &#8451;</Text>
          <Text style={styles.description}>{weather.weather[0].main}</Text>
        </View>

        <View style={styles.footer}>
          <ItemFooter
            title={"sunrise"}
            value={sunrise}
            src={require("../assets/img/icons/sunrise.png")}
          />
          <ItemFooter
            title={"sunset"}
            value={sunset}
            src={require("../assets/img/icons/sunset.png")}
          />
        </View>
      </View>
    </ScrollView>
  ) : (
    <Preloader />
  );
};

const mapStateToProps = (state) => ({
  state: state.weather,
});

export default connect(mapStateToProps, { getWeatherAction })(Main);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  city: {
    color: "#43676A",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  street: {
    color: "#ccc",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  coords: {
    color: "#ccc",
  },
  main: {
    alignItems: "center",
  },
  icon: {
    width: 130,
    height: 130,
    marginBottom: 5,
  },
  temp: {
    color: "#fff",
    fontSize: 50,
    marginBottom: 5,
  },
  description: {
    color: "#ccc",
    fontSize: 36,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sunset: {
    alignItems: "center",
  },
  sunsetTime: {
    fontSize: 40,
    color: "#43676A",
  },
  sunsetWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  sunsetText: {
    fontSize: 24,
    textTransform: "uppercase",
    color: "#bbb",
    marginLeft: 10,
  },
  sunrise: {
    alignItems: "center",
  },
  sunriseTime: {
    fontSize: 40,
    color: "#43676A",
  },
  sunriseWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  sunriseText: {
    fontSize: 24,
    textTransform: "uppercase",
    color: "#bbb",
    marginLeft: 10,
  },
});
