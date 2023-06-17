import React from 'react';
import './Item.css';

const Item = ({ item }) => {
    return (
        <div className="itemWrapper">
            <p>{item.count}</p>
            <p>{item.createdAt}</p>
            <p>{item.title}</p>
            <p>{item.text}</p>
            <p>{item.updatedAt}</p>
            <div>
                <img src={item.user.avatarUrl} alt="avatar" />
                <p>{item.user.fullName}</p>
            </div>
            <p>{item.viewsCount}</p>
            <p>{item.tags}</p>
            
        </div>
    );
};

export default Item;
