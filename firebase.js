import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDmpRbbSkWVDuA4wuh9rVf_-SLqammzLwI',
  authDomain: 'clone-e179e.firebaseapp.com',
  projectId: 'clone-e179e',
  storageBucket: 'clone-e179e.appspot.com',
  messagingSenderId: '921248577716',
  appId: '1:921248577716:web:403ae5fda537e8530f3fe1',
  measurementId: 'G-JY7BS4MEC4',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export default db;
