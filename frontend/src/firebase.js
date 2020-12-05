import * as firebase from "firebase";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCEaH4iu_itfh_I1j8S4mwlI0PnDCq3fGs",
  authDomain: "ecommerce-b25c9.firebaseapp.com",
  projectId: "ecommerce-b25c9",
  storageBucket: "ecommerce-b25c9.appspot.com",
  messagingSenderId: "492037753448",
  appId: "1:492037753448:web:8cd78c696aaabc23e909dd",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export auth

export const auth = firebase.auth();

export const googleAuthProvider = new firebase.auth.googleAuthProvider();
