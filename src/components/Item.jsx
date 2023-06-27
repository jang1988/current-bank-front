import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchRemoveBank, addCurrentBank } from '../redux/slices/banks';
import { Link } from 'react-router-dom';
import axios from '../axios';
import './Item.css';

const Item = ({ item, isOwner, tags }) => {
    const dispatch = useDispatch();

    const [countValue, setCountValue] = React.useState('');

    const imageSVG = (
        <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="20.000000pt"
            height="10.000000pt"
            viewBox="0 0 1280.000000 662.000000"
            preserveAspectRatio="xMidYMid meet"
        >
            <metadata>Created by potrace 1.15, written by Peter Selinger 2001-2017</metadata>
            <g
                transform="translate(0.000000,662.000000) scale(0.100000,-0.100000)"
                fill="#000000"
                stroke="none"
            >
                <path
                    d="M6330 6610 c-1399 -91 -2792 -594 -4189 -1515 -694 -457 -1415 -1050
   -1957 -1609 l-183 -189 100 -108 c140 -151 583 -569 839 -794 1446 -1267 2965
   -2053 4445 -2299 423 -70 660 -90 1105 -90 383 -1 517 7 845 49 1006 129 1985
   482 2960 1068 876 526 1767 1287 2429 2075 l78 93 -19 22 c-11 12 -75 87 -144
   167 -1111 1299 -2373 2239 -3644 2718 -576 216 -1111 340 -1725 398 -195 18
   -747 26 -940 14z m421 -580 c562 -56 1096 -275 1534 -627 306 -246 561 -564
   734 -916 91 -184 137 -304 187 -486 136 -496 123 -1033 -37 -1521 -81 -246
   -179 -448 -324 -665 -109 -163 -193 -264 -349 -420 -232 -232 -450 -387 -751
   -535 -280 -138 -550 -222 -875 -271 -196 -30 -580 -33 -775 -5 -680 94 -1246
   378 -1705 852 -422 437 -671 963 -746 1574 -20 166 -15 517 11 680 159 1029
   879 1869 1890 2205 218 72 403 111 655 138 80 9 455 6 551 -3z"
                />
                <path
                    d="M6330 5359 c-375 -31 -742 -175 -1035 -404 -87 -68 -237 -217 -308
   -306 -110 -136 -228 -347 -286 -512 -79 -225 -106 -402 -98 -657 7 -242 36
   -385 119 -595 277 -703 983 -1174 1760 -1175 434 0 863 146 1203 412 80 62
   242 226 310 313 182 232 307 512 359 804 l6 34 -42 -40 c-142 -130 -319 -224
   -510 -270 -56 -14 -114 -18 -248 -18 -159 0 -184 3 -275 28 -381 104 -674 395
   -767 763 -32 125 -32 371 0 486 51 185 144 348 274 478 90 90 171 148 285 204
   140 69 261 101 426 113 l89 6 -68 44 c-347 219 -785 327 -1194 292z"
                />
            </g>
        </svg>
    );

    const onClickRemove = () => {
        if (window.confirm('Вы действительно хотите удалить банку?')) {
            dispatch(fetchRemoveBank(item._id));
        }
    };

    const onClickAdd = async () => {
        const updatedItem = {
            ...item,
            count: item.count + Number(countValue), // Обновляем count
        };

        try {
            // Отправляем асинхронный PUT-запрос на сервер для обновления числа
            await axios.put(`/banks/${item._id}/count`, updatedItem);
            dispatch(addCurrentBank({ id: item._id, value: Number(countValue) }));
        } catch (error) {
            console.error('Ошибка при добавлении числа в базу данных', error);
        }
        setCountValue('')
    };

    return (
        <div className="itemWrapper">
            {isOwner && (
                <>
                    <input
                        className="bankValue"
                        type="number"
                        placeholder="Введите количество..."
                        value={countValue}
                        onChange={(e) => setCountValue(e.target.value)}
                    />
                    <button className="add-count-btn" onClick={onClickAdd}>
                        Добавить
                    </button>
                </>
            )}
            <p>количество - {item.count}</p>
            <Link to={`/banks/${item._id}`} className="title-link">
                {item.title}
            </Link>
            <p>обьём тары - {item.volume}</p>
            <img
                className="itemImg"
                src={item.imageUrl ? `https://elated-deer-loincloth.cyclic.app${item.imageUrl}` : ''}
                alt="itemImg"
            />

            <p>{item.text}</p>
            <p>дата приёма</p>
            <p>{item.updatedAt.slice(0, -5)}</p>
            <div className="userWrapper">
                <img className="avatarImg" src={item.user.avatarUrl} alt="avatar" />
                <p>{item.user.fullName}</p>
            </div>
            <p>
                {imageSVG} {item.viewsCount}
            </p>
            <ul className="tagsList">
                {tags.map((name, i) => (
                    <li className="tagsItem" key={i}>
                        <Link to={`/tag/${name}`}>#{name}</Link>
                    </li>
                ))}
            </ul>
            {isOwner && (
                <div className="buttonsEdit">
                    <Link to={`/bank/${item._id}/edit`}>
                        <button className="editButton">Редактировать</button>
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
