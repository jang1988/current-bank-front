import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchRemoveBank } from '../redux/slices/banks';
import './Item.css';

const Item = ({ item, isOwner, tags }) => {
    const dispatch = useDispatch()

    const onClickRemove = () => {
        if (window.confirm('Вы действительно хотите удалить банку?')) {
            dispatch(fetchRemoveBank(item._id));
          }
    };

    return (
        <div className="itemWrapper">
            <p>{item.count}</p>
            <p>{item.createdAt}</p>
            <img
                className="itemImg"
                src={item.imageUrl ? `http://localhost:4444${item.imageUrl}` : ''}
                alt="itemImg"
            />
            <Link to={`/banks/${item._id}`}>{item.title}</Link>
            <p>{item.text}</p>
            <p>{item.updatedAt}</p>
            <div className='userWrapper'>
                <img className="avatarImg" src={item.user.avatarUrl} alt="avatar" />
                <p>{item.user.fullName}</p>
            </div>
            <p>{item.viewsCount}</p>
            <ul className="tagsList">
                {tags.map((name) => (
                    <li key={name}>
                        <Link to={`/tag/${name}`}>#{name}</Link>
                    </li>
                ))}
            </ul>
            {isOwner && (
                <div className='buttonsEdit'>
                    <Link to={`/bank/${item._id}/edit`}>
                        <button className="editButton" >
                            Редактировать
                        </button>
                    </Link>
                    <button onClick={onClickRemove} className="delete-button-main">
                        Удалить
                    </button>
                </div>
            )}
        </div>
    );
};

export default Item;
