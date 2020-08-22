import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity } from "react-native";

import { AuthContext } from "../AuthProvider";
import Center from "../components/Center";

const Feed = () => {
  return (
    <Center>
      <Text>Feed</Text>
    </Center>
  );
};

const Stack = createStackNavigator();

const HomeStack = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={{
          // Logout button on header right side
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 10 }} onPress={logout}>
              <Text>Logout</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
