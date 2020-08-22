import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, Button } from "react-native";

import { AuthContext } from "../AuthProvider";
import Center from "../components/Center";

// navigation, route prop from Stack.Screen
const Login = ({ navigation, route }) => {
  const { login } = useContext(AuthContext);
  return (
    <Center>
      <Text>I am {route.name} screen</Text>
      <Button title="Log me in!" onPress={login} />
      <Button
        title="Go to register screen"
        onPress={() => navigation.navigate("Register")}
      />
    </Center>
  );
};

const Resgister = ({ navigation, route }) => {
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

const AuthStack = () => {
  // Stack navigator creates a 'stack' with back btn on header
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null, // Can also pass in custom component here for header
      }}
      initialRouteName="Login"
    >
      <Stack.Screen
        name="Login" // name is used for navigate
        options={{
          headerTitle: "Sign in", // headerTitle is for display
        }}
        component={Login}
      />
      <Stack.Screen
        name="Register"
        options={{ headerTitle: "Sign Up" }}
        component={Resgister}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
