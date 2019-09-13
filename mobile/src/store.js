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
  store.on('@init', () => ({ user: {} }));

  store.on('user/update', (prevState, user) => ({ user }));
  store.on('user/setPermission', (prevState, { permission, status }) => ({
    user: {
      ...prevState.user,
      permissions: { ...prevState.user.permissions, [permission]: status },
    },
  }));
};

export default createStore([placesReducer, userReducer]);
