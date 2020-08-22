import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity, FlatList, Button } from "react-native";
import faker from "faker";

import addProductRoutes from "../addProductRoutes"; // Set of reusable screens
import { AuthContext } from "../AuthProvider";
import Center from "../components/Center";

const Feed = ({ navigation }) => {
  return (
    <Center>
      <FlatList
        style={{ width: "100%" }}
        keyExtractor={(product, idx) => `${product}-${idx}`}
        data={Array.from(Array(50), () => faker.commerce.product())}
        renderItem={({ item }) => (
          <Button
            title={item}
            onPress={
              () => navigation.navigate("Product", { productName: item }) // Pass params to another screen
            }
          />
        )}
      />
    </Center>
  );
};

const Stack = createStackNavigator();

const HomeStack = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Stack.Navigator initialRouteName="Feed">
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
      {addProductRoutes(Stack)}
    </Stack.Navigator>
  );
};

export default HomeStack;
