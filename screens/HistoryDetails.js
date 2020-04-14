import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import HistoryItem from "../components/HistoryItem/HistoryItem";

import icons from "../assets/js/weatherIcons";

const HistoryDetails = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.created}</Text>
      </View>
      <View style={styles.main}>
        <View>
          <Text style={styles.city}>
            {item.geocode[0].city}, {item.geocode[0].isoCountryCode}
          </Text>
          <Text style={styles.street}>
            {item.geocode[0].street}
          </Text>
          <Text style={styles.coords}>
            {item.location.latitude}, {item.location.longitude}
          </Text>
        </View>

        <View style={styles.info}>
          <Image source={icons[item.data.weather[0].icon]} style={styles.icon} />
          <Text style={styles.description}>{item.data.weather[0].main}</Text>
        </View>

        <View style={styles.tempBlock}>
          <HistoryItem
            title={"Wind"}
            temp={item.data.wind.speed.toFixed(1)}
            unit={"m/s"}
          />
          <HistoryItem
            title={"Temp"}
            temp={item.data.main.temp.toFixed()}
            unit={"℃"}
          />
          <HistoryItem
            title={"Humid"}
            temp={item.data.main.humidity.toFixed()}
            unit={"%"}
          />
        </View>
      </View>
    </View>
  );
};

export default HistoryDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282c2f",
  },
  header: {
    padding: 20,
    borderBottomColor: "#43676A",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 26,
    color: "#ccc",
    fontWeight: "600",
  },
  main: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
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
  info: {
    alignItems: "center",
  },
  icon: {
    width: 130,
    height: 130,
    marginBottom: 5,
  },
  tempBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  temp: {
    color: "#43676A",
    fontSize: 30,
    marginBottom: 10,
    fontWeight: "600",
  },
  tempType: {
    fontSize: 24,
    color: "#ccc",
    fontWeight: "600",
    textAlign: "center",
  },
  description: {
    color: "#ccc",
    fontSize: 36,
  },
});
