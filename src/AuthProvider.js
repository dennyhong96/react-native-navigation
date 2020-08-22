import React, { useState } from "react";
import { AsyncStorage } from "react-native";

export const AuthContext = React.createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        login: async () => {
          const fakeUser = { username: "bob" };
          setUser(fakeUser);
          await AsyncStorage.setItem("user", JSON.stringify(fakeUser));
        },
        logout: async () => {
          await AsyncStorage.removeItem("user");
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
