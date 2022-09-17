// Learn more about createBottomTabNavigator:
// https://reactnavigation.org/docs/bottom-tab-navigator
import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";

import Colors from "../constants/Colors";
import LoginScreen from "../screens/LoginScreen";
import RegistrationScreen from "../screens/Registration";

const BottomTab = createBottomTabNavigator();

export default function BottomSignInNavigator() {
const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Login"
      screenOptions={{ tabBarActiveTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Login"
        component={LoginScreen}
      />
      <BottomTab.Screen
        name="Registration"
        component={RegistrationScreen}
      />
    </BottomTab.Navigator>
  );
}
