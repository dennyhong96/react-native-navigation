import React, { useContext } from "react";
import { Text, Button } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AuthContext } from "../AuthProvider";
import Center from "../components/Center";

const Home = () => {
  const { logout } = useContext(AuthContext);
  return (
    <Center>
      <Text>Home</Text>
      <Button title="Log me out" onPress={logout} />
    </Center>
  );
};

const Search = () => {
  return (
    <Center>
      <Text>Search</Text>
    </Center>
  );
};

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

export default MainTabs;
