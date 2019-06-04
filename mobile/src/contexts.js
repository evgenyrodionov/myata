import React from 'react';

export const UserContext = React.createContext({
  user: {},
  update: () => {},
});

export const LikedPlaces = React.createContext({
  ids: [],
  update: () => {},
});
