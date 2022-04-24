import firebase from "firebase";
import "firebase/storage";

export const app = firebase.initializeApp({
  projectId: "car-cult",
  appId: "1:330579448926:web:39aaf97c084a45109cd0cf",
  storageBucket: "car-cult.appspot.com",
  locationId: "us-central",
  apiKey: "AIzaSyCBLfarsejb_UpD9_HfcHPi4OW8Jlho4ww",
  authDomain: "car-cult.firebaseapp.com",
  messagingSenderId: "330579448926",
  measurementId: "G-GC7PXK27GB",
});
