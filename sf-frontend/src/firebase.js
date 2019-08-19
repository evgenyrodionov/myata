// import firebase from 'firebase/app';
import FirebaseClass from './utils/FirebaseClass';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

export default new FirebaseClass(config);

// export const googleProvider = new firebase.auth.GoogleAuthProvider();
// googleProvider.addScope('https://www.googleapis.com/auth/userinfo.profile');

// export const facebookProvider = new firebase.auth.FacebookAuthProvider();
// facebookProvider.addScope('email');
// facebookProvider.setCustomParameters({ display: 'popup' });
