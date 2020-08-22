import React, { useState } from "react";
import { Text, Button, FlatList } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import faker from "faker";

import addProductRoutes from "../addProductRoutes"; // Set of reusable screens
import Center from "../components/Center";

const Search = ({ navigation }) => {
  const [show, setShow] = useState(false);
  return (
    <Center>
      <Button
        title="Search Products"
        onPress={() => {
          setShow(true);
        }}
      />
      <Text>Search</Text>
      {show && (
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
      )}
    </Center>
  );
};

const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen name="Search" component={Search} />
      {addProductRoutes(Stack)}
    </Stack.Navigator>
  );
};

export default SearchStack;
