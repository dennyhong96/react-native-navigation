import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Text, Button } from "react-native";

import Center from "./components/Center";

// Stack navigator creates a 'stack' with back btn on header
const Stack = createStackNavigator();

// navigation prop from Stack.Screen
const Login = ({ navigation, route }) => (
  <Center>
    <Text>I am {route.name} screen</Text>
    <Button
      title="Go to register screen"
      onPress={() => navigation.navigate("Register")}
    />
  </Center>
);

const Resgister = ({ navigation, route }) => {
  console.log(navigation, route);
  return (
    <Center>
      <Text>I am {route.name} screen</Text>
      <Button
        title="Go to login screen"
        onPress={() => {
          // navigation.goBack(); // Back to last screen
          navigation.navigate("Login");
        }}
      />
    </Center>
  );
};

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // screenOptions={{
        //   header: () => null, // Can also pass in custom component here for header
        // }}
        initialRouteName="Login"
      >
        <Stack.Screen
          name="Login" // name is used for navigate
          options={{
            headerTitle: "Sign in",
          }}
          component={Login}
        />
        <Stack.Screen
          name="Register"
          options={{ headerTitle: "Sign Up" }}
          component={Resgister}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
