import React, { useContext, useState, useEffect, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, TouchableOpacity, FlatList, Button } from "react-native";
import faker from "faker";

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

const Product = ({ route, navigation }) => {
  // Get passed params from route.params (usually id)
  const productName = route.params.productName;
  return (
    <Center>
      <Text>{productName}</Text>
      <Button
        title="Edit this product"
        onPress={() => navigation.navigate("EditProduct", { productName })}
      />
    </Center>
  );
};

const EditProduct = ({ route, navigation }) => {
  // navigation.setOptions({});

  const submit = useRef();
  submit.current = () => {
    // Store the submit Api call in to ref.current
    navigation.goBack();
  };

  useEffect(() => {
    // Pass into param so we can call it in Screen options
    navigation.setParams({ submit });
  }, []);

  // Get passed params from route.params (usually id)
  return (
    <Center>
      <Text>{route.params.productName}</Text>
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
      <Stack.Screen
        options={({ route, navigation }) => ({
          // Change headerTitle dynamically
          headerTitle: `Product: ${route.params.productName}`,
        })}
        name="Product"
        component={Product}
      />
      <Stack.Screen
        options={({ route, navigation }) => ({
          headerTitle: `Edit: ${route.params.productName}`,
          // Customize header right
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // Submit form api call
                // if (route.params.submit) route.params.submit();
                route.params.submit?.current();
              }}
            >
              <Text style={{ marginRight: 10, color: "red" }}>Done</Text>
            </TouchableOpacity>
          ),
        })}
        name="EditProduct"
        component={EditProduct}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
