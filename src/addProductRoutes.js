import React, { Fragment, useEffect, useRef } from "react";
import { TouchableOpacity, Text, Button } from "react-native";

import Center from "./components/Center";

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

// A set of screens that are shown together and reusable
export default (Stack) => {
  return (
    <Fragment>
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
    </Fragment>
  );
};
