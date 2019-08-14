import firebase from 'react-native-firebase';

const firestore = firebase.firestore();

// eslint-disable-next-line import/prefer-default-export
export function getRef() {
  return firestore.collection('news');
}
