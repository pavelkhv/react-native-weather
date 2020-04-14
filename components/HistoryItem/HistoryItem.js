import React from "react";
import { StyleSheet, Text, View } from "react-native";

const HistoryItem = ({ title, temp, unit }) => {
  return (
    <View style={styles.block}>
      <Text style={styles.temp}>{temp}{unit}</Text>
      <Text style={styles.tempType}>{title}</Text>
    </View>
  );
};

export default HistoryItem;

const styles = StyleSheet.create({
  block: {
    alignItems: "center",
  },
  temp: {
    color: "#43676A",
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "600",
  },
  tempType: {
    fontSize: 22,
    color: "#ccc",
    fontWeight: "600",
  },
});
