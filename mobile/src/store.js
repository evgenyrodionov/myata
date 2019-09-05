import createStore from 'storeon';

const placesReducer = (store) => {
  store.on('@init', () => ({ places: [], placesById: {} }));

  store.on('places/update', (prevState, state) => state);
};

export default createStore([placesReducer]);
