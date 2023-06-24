import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanks, fetchTags } from '../redux/slices/banks';
import Item from '../components/Item';
import './Main.css';
import TagsBlock from '../components/TagsBlock';

const Main = () => {
    const dispatch = useDispatch();

    const { banks, tags } = useSelector((state) => state.banks);
    const userData = useSelector((state) => state.auth.data);

    const isBanksLoading = banks.status === 'loading';

    React.useEffect(() => {
        dispatch(fetchBanks());
        dispatch(fetchTags());
    }, [dispatch]);

    return (
        <div className="mainWrapper">
            
            <div className="itemsWrapper">
                {(isBanksLoading ? [...Array(5)] : banks.items).map((item, index) =>
                    isBanksLoading ? (
                        <div key={index}>Загрузка</div>
                    ) : (
                        <Item key={index} item={item} isOwner={userData} tags={item.tags} />
                    ),
                )}
            </div>
            <div className="sideWrapper">
                <TagsBlock tags={tags.items}/>
            </div>
        </div>
    );
};

export default Main;
