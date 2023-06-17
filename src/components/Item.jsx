import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css';

const Item = ({ item }) => {
    return (
        <div className="itemWrapper">
            <p>{item.count}</p>
            <p>{item.createdAt}</p>
            <Link to={`/banks/${item._id}`}>{item.title}</Link>
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
