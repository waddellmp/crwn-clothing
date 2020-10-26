# React Router DOM

Installation: `yarn add react-router-dom`

React router dom is the web implementation code for the react router lib.

--

## Components of React Router DOM

### BrowserRouter

Topmost react-router-dom component that wraps all app `<Route/>` components.

```jsx
// BrowserRouter is the topmost react-router-dom component.****
<BrowserRouter>
    <Route />
    <Route />
    <Route />
</BrowserRouter>
```

### Route

Route components controls when a react componenent renders based on the browser URL.

Components are rendered to the screen if the `path` prop matches the `Route` component.

```jsx
    // For url "https://localhost:8000/about"
    <Route path="/" component={Home} />
    <Route exact path="/about" component={About} />
```

Above both would render on the same page. To fix this place `exact` prop on the Route component.

The `<Route/>` component has access to and passes down
props to its direct children.

```jsx
// The history prop is provided by the wrapping <Route/> component.
// Any non-direct children doesn't have access to the Route props.
const HomePage = ({ history }) => (
    <div className="homepage">
        <Directory />
    </div>
);
```

Props

### Switch

The switch component is a more controlled method that renders the first matching nested component. It prevents multiple components from rendering on a single page.

```jsx
// Switch component
// For url "https://localhost:8000/about"
<Switch>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
</Switch>
```

Above, the first route would render the Home component since the `exact` keyword was not used.

To make only the About component render, use the `exact` keyword on the first route.

```jsx
// Switch component
// For url "https://localhost:8000/about"
<Switch>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
</Switch>
```

### withRouter(component)

Returns ad-hoc component that wraps the component you pass in.

The wrapping causes our componenet to have access to the props defined inside of our Router.

```js
import React from 'react';
import { Route } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>Home Component</h1>
        </div>
    );
}

// Use the ad-hoc component design pattern to ship out Home
export default withRouter(Home);
```

### Route Props

The <Route/> component passes props (history, location, and match) down to the immediate child component.

```jsx
import Homepage from 'homepage.component';

// Here Homepage gets the history, location, and match props
const App = () => <Route component={HomePage} />;
```

The props for an object can be shared further down the tree of components using the withRouter() higher order component. This prevents prop tunneling.

Match

A match object contains information about how a <Route path> matched the URL.

match objects contain the following properties:
params - (object) Key/value pairs parsed from the URL corresponding to the dynamic segments of the path
isExact - (boolean) true if the entire URL was matched (no trailing characters)
path - (string) The path pattern used to match. Useful for building nested <Route>s
url - (string) The matched portion of the URL. Useful for building nested <Link>s

The url match.url can be used to build nested urls that you can trust even if you change the <Route/> path property.

```jsx
// For instance if you changed the path of the Hompage to "/shop"

<Switch>
    <Route path="/shop" component={Homepage} />
    <Route path="/hats" component={HatsPage} />
</Switch>;

// menu-item.component.js
// linkUrl = 'hats'
// match.url = '/clothing/hats'

// Since the list of menu items is rendered on the Homepage route
// and your "hats" menuItem will have the linkUrl of "hats"
// just calling history.push(linkUrl) would render nothing since "hats" is not a valid route.
// You need to make a relative route based on the current matched url.
// match.url gives you the matched portion the url
// So ${match.url}${linkUrl} should always give you the right route relative to the <Route> path.
const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => {
    return (
        <div
            onClick={() => history.push(`${match.url}${linkUrl}`)}
            className={`menu-item ${size}`}
            style={{
                backgroundImage: `url(${imageUrl})`,
            }}
        >
            <div
                className="background-image"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            />
            <div className="content">
                <h1 className="title">{title.toUpperCase()}</h1>
                <span className="subtitle">SHOP NOW</span>
            </div>
        </div>
    );
};
```
