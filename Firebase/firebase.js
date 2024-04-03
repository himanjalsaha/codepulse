//firebase creds here
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import  {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwhaD_tqbJRvtIHvLBUsdrwvcPZR1pEH8",
  authDomain: "ambimed-2c82f.firebaseapp.com",
  databaseURL: "https://ambimed-2c82f-default-rtdb.firebaseio.com",
  projectId: "ambimed-2c82f",
  storageBucket: "ambimed-2c82f.appspot.com",
  messagingSenderId: "905162468439",
  appId: "1:905162468439:web:caf42d53d667816c49c712",
  measurementId: "G-WPZKZ06DH8"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore();
