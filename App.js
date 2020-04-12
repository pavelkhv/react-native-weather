import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

import { Provider } from 'react-redux';

import Main from './screens/Main';
import History from './screens/History';
import TabBar from './components/TabBar/TabBar';

import store from './store';

const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

StatusBar.setBarStyle('light-content', true);

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <NavigationContainer theme={MyTheme}>
            <Tab.Navigator tabBar={props => <TabBar {...props} />}>
              <Tab.Screen name="Home" component={Main} />
              <Tab.Screen name="History" component={History} />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c2f'
  },
});
