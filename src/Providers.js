import React from "react";
import AuthProvider from "./AuthProvider";
import Routes from "./Routes";

const Providers = () => {
  return (
    // Other providers
    <AuthProvider>
      <Routes />
    </AuthProvider>
    // Other providers
  );
};

export default Providers;
