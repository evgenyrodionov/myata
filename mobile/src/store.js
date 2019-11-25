import createStore from 'storeon';

const placesReducer = (store) => {
  store.on('@init', () => ({ places: [], placesById: {} }));

  store.on('places/update', (prevState, state) => state);
  store.on('places/orderBy', (prevState, { key }) => ({
    ...prevState,
    orderBy: key,
  }));
};

const userReducer = (store) => {
  store.on('user/setLocation', (prevState, location) => ({
    location,
  }));

  store.on('user/update', (prevState, user) => ({
    user,
  }));
};

export default createStore([placesReducer, userReducer]);
