import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import tabIcons from "../../assets/js/tabIcons";

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ["selected"] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.button}
            key={label}
          >
            <Image
              source={isFocused ? tabIcons[`${label}-active`] : tabIcons[label]}
              style={{ width: 32, height: 32 }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    alignItems: "center",
    borderTopColor: "#43676A",
    borderTopWidth: 1,
  },
  tabIcon: {
    textAlign: "center",
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
  },
});
