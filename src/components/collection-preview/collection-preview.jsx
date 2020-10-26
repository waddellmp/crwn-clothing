import React from 'react';
import CollectionItem from '../collection-item/collection-item.component';
import './collection-preview.component.scss';

const CollectionPreview = ({ id, title, items }) => (
    <div key={id} className="collection-preview">
        <h1 className="title">{title.toUpperCase()}</h1>
        <div className="preview">
            {items
                .filter((item, index) => index < 4)
                .map(({ id, ...rest }) => {
                    return <CollectionItem key={id} {...rest} />;
                })}
        </div>
    </div>
);

export default CollectionPreview;