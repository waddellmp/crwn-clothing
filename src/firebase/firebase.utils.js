import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: 'AIzaSyDUgSLX0mDGL7ix5a8Vy1l4U4LOZWlngK8',
    authDomain: 'crwn-db-cd36a.firebaseapp.com',
    projectId: 'crwn-db-cd36a',
    storageBucket: 'crwn-db-cd36a.appspot.com',
    messagingSenderId: '439068386104',
    appId: '1:439068386104:web:82e9ac20810a0b6a65d7cd',
    measurementId: 'G-WZ8KLS1G63',
};

// Initialize firebase.
firebase.initializeApp(config);

// Get Auth and Firestore service from firebase object.
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
    // Prevent sign outs from triggering
    if (!userAuth) return;

    // User signed in
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    // Create user if it doesn't exist
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData,
            });
        } catch (error) {
            console.log('Error creating user', error.message);
        }
    }

    return userRef;
};
// Instantiate Google auth provider on the firebase.auth object.
const provider = new firebase.auth.GoogleAuthProvider();

// Pass in params to OAuth request for redirect and sign-in operations on the provider object.
provider.setCustomParameters({ prompt: 'select_account' });

// Create sign in handler that opens the select Google accounts popup.
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
