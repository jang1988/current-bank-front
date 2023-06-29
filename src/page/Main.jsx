import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanks, fetchBanksByTags, fetchTags } from '../redux/slices/banks';
import { useLocation } from 'react-router-dom';
import Item from '../components/Item';
import TagsBlock from '../components/TagsBlock';
import './Main.css';

const Main = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [tags, setTags] = React.useState([]);

    const { banks, tags: allTags } = useSelector((state) => state.banks);
    const userData = useSelector((state) => state.auth.data);

    const isBanksLoading = banks.status === 'loading';

    React.useEffect(() => {
        dispatch(fetchBanks());
        dispatch(fetchTags());
    }, [dispatch]);

    React.useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const tagsParam = searchParams.get('tags');
        if (tagsParam) {
            const tagsArray = tagsParam.split(',');
            setTags(tagsArray);
            dispatch(fetchBanksByTags(tagsArray));
        } else {
            setTags([]);
        }
    }, [location, dispatch]);

    return (
        <div className="mainWrapper">
            <div className="itemsWrapper">
                {isBanksLoading
                    ? [...Array(5)].map((_, index) => <div key={index}>Загрузка</div>)
                    : banks.items.map((item) => (
                          <Item key={item._id} item={item} isOwner={userData} tags={item.tags} />
                      ))}
            </div>
            <div className="sideWrapper">
                <TagsBlock tags={allTags.items} selectedTags={tags} />
            </div>
        </div>
    );
};

export default Main;
