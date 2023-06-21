import React from 'react';
import { selectIsAuth } from '../redux/slices/auth';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './AddBank.css'

const AddBank = () => {
    const isAuth = useSelector(selectIsAuth);

    const imageUrl = '';
    const [value, setValue] = React.useState('');

    const handleChangeFile = () => {};

    const onClickRemoveImage = () => {};

    const onChange = React.useCallback((value) => {
        setValue(value);
      }, []);

    if (!isAuth) {
        return <Navigate to="/" />;
    }
    return (
        <div className="paper-container">
            <button className="preview-button" variant="outlined" size="large">
                Загрузить превью
            </button>
            <input type="file" onChange={handleChangeFile} hidden />
            {imageUrl && (
                <button
                    className="delete-button"
                    variant="contained"
                    color="error"
                    onClick={onClickRemoveImage}
                >
                    Удалить
                </button>
            )}
            {imageUrl && (
                <img
                    className="uploaded-image"
                    src={`http://localhost:4444${imageUrl}`}
                    alt="Uploaded"
                />
            )}
            <br />
            <br />
            <input className="title-input" type="text" placeholder="Заголовок статьи..." />
            <input className="tags-input" type="text" placeholder="Тэги" />
            <textarea className="editor" value={value} onChange={onChange} />
            <div className="button-container">
                <button className="publish-button" size="large" variant="contained">
                    Опубликовать
                </button>
                <a href="/">
                    <button className="cancel-button" size="large">
                        Отмена
                    </button>
                </a>
            </div>
        </div>
    );
};

export default AddBank;
