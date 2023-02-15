import React, { useState, useEffect } from 'react';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

function App() {
    const [user, setUser] = useState(null);
    console.log('Mounting <App/>')

    // Run after successful mount (1x)
    useEffect(() => {
        let unsubscribeUserSnapShot;

        // Adds observer for changes to the user's sign-in auth state.
        // Triggered only on sign-in and sign-out
        // Returns a unsubscribe function for auth state changes
        const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            // Run only for logins
            if (userAuth) {
                // Create user in db if new. Returns a a userRef object.
                const userRef = await createUserProfileDocument(userAuth);

                // Adds listener for documentSnapshot events
                // In this case, get the newly created user remotely from the previous step.
                // Returns a unsubscribe function for cancelling the snapshot listener.
                unsubscribeUserSnapShot = await userRef.onSnapshot((snapShot) => {
                    setUser({ id: snapShot.id, ...snapShot.data() });
                });
                return;
            }

            // Run only for logout
            setUser(userAuth);
        });

        // Close subscriptions
        return () => {
            console.log('Unsubscribing')
            unsubscribeFromAuth();

            if (unsubscribeUserSnapShot) {
                unsubscribeUserSnapShot();
            }
        };
    }, []);

    return (
        <div>
            <Header currentUser={user} />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/shop" component={ShopPage} />
                <Route path="/signin" component={SignInAndSignUp} />
            </Switch>
        </div>
    );
}

export default App;
