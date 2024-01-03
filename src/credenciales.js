// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe2kTXEhdVyiigHxRoO8jUCV7sZGgVuHc",
  authDomain: "proyecto-kudivet.firebaseapp.com",
  projectId: "proyecto-kudivet",
  storageBucket: "proyecto-kudivet.appspot.com",
  messagingSenderId: "1085980493083",
  appId: "1:1085980493083:web:b4443674988d3caa6c3fbe"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;