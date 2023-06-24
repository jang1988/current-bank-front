import React from 'react';
import { Link } from 'react-router-dom';
import './Item.css';

const Item = ({ item, isOwner, tags }) => {

    const onClickRemove = () => {};
    
    return (
        <div className="itemWrapper">
            <p>{item.count}</p>
            <p>{item.createdAt}</p>
            <img className='itemImg' src={item.imageUrl} alt="itemImg" />
            <Link to={`/banks/${item._id}`}>{item.title}</Link>
            <p>{item.text}</p>
            <p>{item.updatedAt}</p>
            <div>
                <img className='avatarImg' src={item.user.avatarUrl} alt="avatar" />
                <p>{item.user.fullName}</p>
            </div>
            <p>{item.viewsCount}</p>
            <ul className='tagsList'>
            {tags.map((name) => (
              <li key={name}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
            {isOwner && <button onClick={onClickRemove} className="delete-button">Удалить</button>}
        </div>
    );
};

export default Item;
