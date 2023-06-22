import React from 'react';
import { selectIsAuth } from '../redux/slices/auth';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import './AddBank.css';

const AddBank = () => {
    const isAuth = useSelector(selectIsAuth);

    const imageUrl = '';
    const [value, setValue] = React.useState('');
    console.log('value: ', value)
    const [title, setTitle] = React.useState('');
    console.log('title: ', title)
    const [tags, setTags] = React.useState('');
    console.log('tags: ', tags)

    const handleChangeFile = () => {};

    const onClickRemoveImage = () => {};

    const onChange = React.useCallback((value) => {
        setValue(value);
    }, []);

    const options = React.useMemo(
        () => ({
          spellChecker: false,
          maxHeight: '400px',
          autofocus: true,
          placeholder: 'Введите текст...',
          status: false,
          autosave: {
            enabled: true,
            delay: 1000,
            uniqueId: 'my-editor-text',
          },
        }),
        [],
      );

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
            <input className="title-input" type="text" placeholder="Заголовок статьи..." value={title} onChange={(e) => setTitle(e.target.value)} />
            <input className="tags-input" type="text" placeholder="Тэги" value={tags} onChange={(e) => setTags(e.target.value)}/>
            <SimpleMDE id="my-editor-text" className="editor" value={value} onChange={onChange} options={options} />
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
