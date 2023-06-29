import React from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios';
import { Link } from 'react-router-dom';
import './FullBank.css'


const FullBank = () => {
    const [item, setItem] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);

    const { id } = useParams();

    React.useEffect(() => {
        axios
            .get(`/banks/${id}`)
            .then((res) => {
                setItem(res.data);
                setIsLoading(false)
            })
            .catch((err) => {
                alert('Ошибка при получении банки');
            });
    }, [id]);

    if (isLoading) {
        return <>LOADING</>;
    }

    return (
        <div className='fullBankWrapper'>
            <p>{item.count}</p>
            <p>{item.createdAt}</p>
            <Link to={`/banks/${item._id}`}>{item.title}</Link>
            <p>{item.text}</p>
            <img src={item.imageUrl ? `http://localhost${item.imageUrl}` : ''} alt="itemImg" />
            <p>{item.updatedAt}</p>
            <p>{item.viewsCount}</p>
            <p>{item.tags}</p>
        </div>
    );
};

export default FullBank;
