import React from "react";
import { StyleSheet, StatusBar } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { Provider } from "react-redux";

import * as firebase from "firebase";
import "firebase/firestore";

import Main from "./screens/Main";
import History from "./screens/History";
import HistoryDetails from "./screens/HistoryDetails";
import TabBar from "./components/TabBar/TabBar";

import store from "./store";

const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent",
  },
};

const firebaseConfig = {
  apiKey: "AIzaSyDu7RM1D2Oeftm2j8N-YIvgdk2HpdxMe1k",
  authDomain: "react-native-weather-c963a.firebaseapp.com",
  databaseURL: "https://react-native-weather-c963a.firebaseio.com",
  projectId: "react-native-weather-c963a",
  storageBucket: "react-native-weather-c963a.appspot.com",
  messagingSenderId: "149007658554",
  appId: "1:149007658554:web:1a37af9da29e7e44b2cf03",
  measurementId: "G-J0GLJ2PC1Y",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
    firebase
      .auth()
      .signInAnonymously()
      .catch((err) => {});
  }
});

StatusBar.setBarStyle("light-content", true);

const HistoryStack = createStackNavigator();

const HistoryStackScreen = () => (
  <HistoryStack.Navigator>
    <HistoryStack.Screen
      name="history"
      component={History}
      options={{ headerShown: false }}
    />
    <HistoryStack.Screen
      name="details"
      component={HistoryDetails}
      options={{ headerShown: false }}
    />
  </HistoryStack.Navigator>
);

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <NavigationContainer theme={MyTheme}>
            <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
              <Tab.Screen name="home" component={Main} />
              <Tab.Screen name="history" component={HistoryStackScreen} />
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
    backgroundColor: "#282c2f",
  },
});
