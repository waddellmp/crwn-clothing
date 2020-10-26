import React from 'react';
import ShopData from './shop.data';
import CollectionPreview from '../../components/collection-preview/collection-preview';

class ShopPage extends React.Component {
    constructor(props) {
        super(props);

        // Assign React.Component state property
        // Be sure to call super(props) to access this.state
        // from within the ctor
        this.state = {
            collections: ShopData,
        };
    }

    render() {
        return (
            <div className="shop-page">
                {this.state.collections.map(({ id, ...rest }) => (
                    <CollectionPreview key={id} {...rest} />
                ))}
            </div>
        );
    }
}

export default ShopPage;
