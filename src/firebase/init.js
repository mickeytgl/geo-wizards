import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBicpPhxo0sQ9fODBoNa5-kT7zFFfG1D4Y",
  authDomain: "geo-wizards.firebaseapp.com",
  databaseURL: "https://geo-wizards.firebaseio.com",
  projectId: "geo-wizards",
  storageBucket: "geo-wizards.appspot.com",
  messagingSenderId: "999127908302"
};

const firebaseApp = firebase.initializeApp(config);
firebaseApp.firestore().settings({ timestampsInSnapshots: true })

export default firebaseApp.firestore()
