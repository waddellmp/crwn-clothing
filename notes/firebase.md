# Firebase

Terms

Collection: is a group of relating documents.

Document: is a record with fields.

Query: instruction for firebase to request a resource.

Query Reference: an object returned by firebase that contains metadata about the query and some info about the result.

Document Reference: an object returned by firebase that contains methods to perform CRUD operations.

1. Add firebase to project `yarn add firebase`.
2. Create folder in src called `firebase` and create file called `firebase.util.js`.
3. Add firebase config code for firebase itself, auth, and firestore (db). Get `config` object from project settings.

```js
// firebase.utils.js
// Purpose of file is to confire firebase, auth, and firestore. You then export the objects for the rest of the app to consume.
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
/* 
    Firebase Configuration

    1. Init app with config object.
    2. 
*/
const config = {
    apiKey: 'AIzaSyDUgSLX0mDGL7ix5a8Vy1l4U4LOZWlngK8',
    authDomain: 'crwn-db-cd36a.firebaseapp.com',
    projectId: 'crwn-db-cd36a',
    storageBucket: 'crwn-db-cd36a.appspot.com',
    messagingSenderId: '439068386104',
    appId: '1:439068386104:web:82e9ac20810a0b6a65d7cd',
    measurementId: 'G-WZ8KLS1G63',
};

// Initialize app instance on the firebase object.
firebase.initializeApp(config);

// Create and export separately the firebase authentication and database services.
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Create Google auth provider on the firebase.auth object.
const provider = new firebase.auth.GoogleAuthProvider();

// Pass in params to OAuth request for redirect and sign-in operations on the provider object.
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
```

4. Add subscription to `auth` inside a useEffect hook in App.jsx. Then return a function that kills the subscription.

```js
useEffect(() => {
    // Open subscription for detecting auth state changes.
    // A login attempt would reflect a state change and would set the use object in state.
    // An change to password would cause a state change
    const unsubscribeFromAuth = auth.onAuthStateChanged((authUser) => {
        // setUser(authUser);
        createUserProfileDocument(authUser);
    });

    // Cleanup and close subscription
    return function cleanUp() {
        return unsubscribeFromAuth();
    };
}, []);
```

### Query Reference

Returned by firebase auth methods that describes the current place in the database that we are querying.

Examples

```js
firestore.doc('/users/:id');
firestore.collections('/users');
```

The Query Reference does **NOT** have the actual data of the collection or document. It instead contains properties that tell us details about it.

### Document Reference

The **documentRef** objects allow us to perform CRUD operations.

We can use the documentRef.add() (.get(), .set(), .update()) method to add documents to collections.

### Collection Reference

The **collectionReference** object allows us to add documents to collections.

### Snapshots

We get a **snapshot** object by using the documentRef.get() or collectionRef.get().

documentRef.get() => documentSnapshot
collectionRef.get() => querySnapshot
