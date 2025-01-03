import React from 'react';

export const CurrentTemperatureUnitContext = React.createContext({
  currentTemperatureUnit: '',
  handleToggleSwitchChange: () => {},
});

export const AuthenticationContext = React.createContext();

export const CurrentUserContext = React.createContext();
