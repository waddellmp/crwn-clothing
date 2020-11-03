import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import HeaderComponent from './components/header/header.component';

const HatsPage = () => (
    <div>
        <h1>Hats Page</h1>
    </div>
);

function App() {
    return (
        <div>
            <HeaderComponent />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/shop" component={ShopPage} />
            </Switch>
        </div>
    );
}

export default App;
