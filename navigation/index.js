// If you are not familiar with React Navigation, check out the "Fundamentals" guide:
// https://reactnavigation.org/docs/getting-started
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import NotFoundScreen from "../screens/NotFoundScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import RegistrationScreen from "../screens/Registration";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import BottomSignInNavigator from "./BottomSignInNavigator";
import QuizzHistory from "../screens/QuizzHistory";

export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator();

function RootNavigator() {
  const defaultUser = useSelector((state) => state.user.defaultUser)

  let [signedIn, setSignedIn] = useState(false)

  useEffect(() => {
    setSignedIn(defaultUser.isSignedIn)
  }, [defaultUser.isSignedIn])
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {signedIn == true ? (
        <>
          <Stack.Screen name="Root" component={BottomTabNavigator} />
          <Stack.Screen name="quizHistory" component={QuizzHistory} />
          <Stack.Screen
            name="NotFound"
            component={NotFoundScreen}
            options={{ title: "Oops!" }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Root" component={BottomSignInNavigator} />
        </>
      )}
    </Stack.Navigator>
  );
}
