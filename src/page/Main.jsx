import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanks, fetchTags } from '../redux/slices/banks';
import Item from '../components/Item';
import './Main.css';
import TagsBlock from '../components/TagsBlock';

const Main = () => {
    const dispatch = useDispatch();

    const { banks, tags } = useSelector((state) => state.banks);

    const isBanksLoading = banks.status === 'loading';

    React.useEffect(() => {
        dispatch(fetchBanks());
        dispatch(fetchTags());
    }, [dispatch]);

    console.log(banks);

    return (
        <div className="mainWrapper">
            
            <div className="itemsWrapper">
                {(isBanksLoading ? [...Array(5)] : banks.items).map((item, index) =>
                    isBanksLoading ? (
                        <div key={index}>Загрузка</div>
                    ) : (
                        <Item key={index} item={item} />
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
