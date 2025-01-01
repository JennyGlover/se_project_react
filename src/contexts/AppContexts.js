import React from "react";


const CurrentTemperatureUnitContext = React.createContext({

    currentTemperatureUnit: "",
    handleToggleSwitchChange: () => { }
});

const AuthenticationContext = React.createContext();

export { CurrentTemperatureUnitContext, AuthenticationContext };