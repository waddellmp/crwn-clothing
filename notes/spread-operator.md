# Spread Operator

In ES6 we can use the spread operator ...spread

The spread operator can be used to expand values from an iterable.

```js
// iterable array
const states = ['Texas', 'Utah', 'Florida'];

// Use a spread operator to unpack an iterable
printStatesArray(...states);

function printStatesArray(state1, state2, state3) {
    console.log(state1, state2, state3);
}
```
