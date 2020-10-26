#Rest Parameters

ES6 allows allows the use of the rest parameter.

Syntax:

```es6
const cars = { id: 1, make: 'Ford', model: 'Mach 1' };

// Plain JavaScript method --use a list of params
function printCarSpecReport(id, make, model) {
    console.log('Printing some report with the following car specs:', id, make, model);
}

// ES6 Rest
function printCarSpecReport(id, ...rest) {
    console.log(`Printing some report for carId ${id} and the following specs {$...rest}`);
}
```

A rest parameter is a variable that can take any amount of values.It can represent a single param or a list of params.

Example

```jsx
const sections = [
    {
        title: 'hats',
        imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
        id: 1,
        linkUrl: 'shop/hats',
    },
];

class Directoy extends React.Component {
    constructor() {
        super();
        this.state = {
            sections: sections,
        };
    }
    // Here we use a ...rest
    render() {
        return (
            <div className="directory-menu">
                {this.state.sections.map(({ id, ...rest }) => (
                    <MenuItem key={id} {...rest} />
                ))}
            </div>
        );
    }
}
export default Directoy;
```
