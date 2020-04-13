import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

const Preloader = () => {
  return (
    <View style={styles.preloader}>
      <ActivityIndicator size="large" color="#43676A" />
    </View>
  )
}

const styles = StyleSheet.create({
  preloader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Preloader;