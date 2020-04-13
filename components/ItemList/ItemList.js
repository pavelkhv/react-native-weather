import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ItemList = ({ item }) => {
  return (
    <View style={styles.item}>
      <View style={styles.column1}>
        <Text style={styles.dateTitle}>{item.created}</Text>
      </View>
      <View style={styles.column2}>
        <Text style={styles.locationTitle}>
          {item.geocode[0].city}, {item.geocode[0].country}
        </Text>
        <Text style={styles.locationTitle}>
          {item.location.latitude}, {item.location.longitude}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#aaa',
    paddingVertical: 15
  },
  dateTitle: {
    color: '#ccc',
    fontSize: 16
  },
  locationTitle: {
    color: '#ccc',
    fontSize: 16
  },
  column1: {
    textAlign: 'center',
    width: 100,
    paddingLeft: 20
  }
});

export default ItemList;
