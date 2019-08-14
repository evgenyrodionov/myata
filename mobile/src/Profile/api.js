import firebase from 'react-native-firebase';

const firestore = firebase.firestore();

export function getAuth() {
  return firebase.auth();
}

export function getCurrentUser() {
  const { currentUser } = getAuth();

  return currentUser;
}

export function getRef(userId) {
  return firestore.collection('users').doc(userId);
}

export function updateByKey(userId, key, value) {
  return getRef(userId).update({
    [key]: value,
  });
}

export function updateWithMerge(userId, data) {
  return getRef(userId).set(data, { merge: true });
}
