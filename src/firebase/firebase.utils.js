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

export const createUserProfileDocument = async (userAuth, additionalData) => {
     if(!userAuth) return;

     const userRef = firestore.doc('users/'+ userAuth.uid)
     
     const snapShot = await userRef.get()

     if(!snapShot.exists){
        const { displayName, email } = userAuth; 
        const createdAt = new Date();
        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(err){
            console.log(err.message);
        }
     }
     return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Only Login with Google is Accepted for now
const googleprovider = new firebase.auth.GoogleAuthProvider();
googleprovider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(googleprovider);

export default firebase;