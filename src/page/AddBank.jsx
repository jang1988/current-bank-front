import React from 'react';
import { selectIsAuth } from '../redux/slices/auth';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import axios from '../axios';
import 'easymde/dist/easymde.min.css';
import './AddBank.css';

const AddBank = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isAuth = useSelector(selectIsAuth);
    const [isLoading, setLoading] = React.useState(false);
    const [text, setText] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [tags, setTags] = React.useState('');
    const [volume, setVolume] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');
    const inputFileRef = React.useRef(null);

    console.log('isLoading: ', isLoading)
    const isEditing = Boolean(id);

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append('image', file);
            const { data } = await axios.post('/upload', formData);
            setImageUrl(data.url);
        } catch (err) {
            console.warn(err);
            alert('Ошибка при загрузке файла!');
        }
    };

    const onClickRemoveImage = () => {
        setImageUrl('');
    };

    const onSubmit = async () => {
        try {
            setLoading(true);

            const fields = {
                title,
                imageUrl,
                tags,
                text,
                volume,
            };

            const { data } = isEditing
                ? await axios.patch(`/banks/${id}`, fields)
                : await axios.post('/banks', fields);

            const _id = isEditing ? id : data._id;

            navigate(`/banks/${_id}`);
        } catch (err) {
            console.warn(err);
            alert('Ошибка при создании статьи!');
        }
    };

    React.useEffect(() => {
        if (id) {
          axios
            .get(`/banks/${id}`)
            .then(({ data }) => {
              setTitle(data.title);
              setText(data.text);
              setImageUrl(data.imageUrl);
              setTags(data.tags.join(','));
            })
            .catch((err) => {
              console.warn(err);
              alert('Ошибка при получении статьи!');
            });
        }
      }, [id]);

    if (!isAuth) {
        return <Navigate to="/" />;
    }
    return (
        <div className="paper-container">
            <button
                onClick={() => inputFileRef.current.click()}
                className="preview-button"
                variant="outlined"
                size="large"
            >
                Загрузить превью
            </button>
            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
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
            <input
                className="title-input"
                type="text"
                placeholder="Заголовок статьи..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                className="tags-input"
                type="text"
                placeholder="Тэги"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
            />
            <input
                className="tags-input"
                type="text"
                placeholder="Обьём тары"
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
            />
            <input
                className="tags-input"
                type="text"
                placeholder="Введите текст"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <div className="button-container">
                <button
                    onClick={onSubmit}
                    className="publish-button"
                    size="large"
                    variant="contained"
                >
                    {isEditing ? 'Сохранить' : 'Опубликовать'}
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
