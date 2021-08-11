import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyDuT8ngOzC0n3IF6oBrxSZE5ceKQKQrgq0",
    authDomain: "rabbit-db.firebaseapp.com",
    projectId: "rabbit-db",
    storageBucket: "rabbit-db.appspot.com",
    messagingSenderId: "39667453943",
    appId: "1:39667453943:web:9e83ee5034ed151b68e8f2",
    measurementId: "G-XT3FC68X5P"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;