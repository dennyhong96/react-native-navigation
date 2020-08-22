import React, { useState, useEffect, useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, AsyncStorage } from "react-native";

import { AuthContext } from "./AuthProvider";
import AuthStack from "./stacks/AuthStack";
import MainTabs from "./stacks/MainTabs";
import Center from "./components/Center";

const Routes = () => {
  // Set loading when app boots up
  const [loading, setLoading] = useState(true);
  const { user, login } = useContext(AuthContext);

  useEffect(() => {
    // Check if authenticated
    (async () => {
      const userString = await AsyncStorage.getItem("user");
      if (userString) {
        login();
      }

      // Clear loading
      setLoading(false);
    })();
  }, []);

  // Render spinner during loading
  if (loading) {
    return (
      <Center>
        <ActivityIndicator size="large" />
      </Center>
    );
  }

  // Render MainTabs if user logged in, AuthStack otherwise
  return (
    <NavigationContainer>
      {user ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Routes;
