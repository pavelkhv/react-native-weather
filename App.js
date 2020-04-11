import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { Provider } from 'react-redux';

import Main from './screens/Main';
import History from './screens/History';
import TabBar from './components/TabBar/TabBar';

import store from './store';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <SafeAreaView style={{flex: 1}}>
            <Tab.Navigator tabBar={props => <TabBar {...props} />}>
              <Tab.Screen name="Home" component={Main} />
              <Tab.Screen name="History" component={History} />
            </Tab.Navigator>
          </SafeAreaView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
