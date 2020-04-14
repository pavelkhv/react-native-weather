import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const ItemFooter = ({ title, value, src }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.itemTime}>{value}</Text>
      <View style={styles.itemWrap}>
        <Image source={src} style={{ width: 24, height: 24 }} />
        <Text style={styles.itemText}>{title}</Text>
      </View>
    </View>
  );
};

export default ItemFooter;

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
  },
  itemTime: {
    fontSize: 40,
    color: "#43676A",
  },
  itemWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    fontSize: 24,
    textTransform: "uppercase",
    color: "#bbb",
    marginLeft: 10,
  },
});
