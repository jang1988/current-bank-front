import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanks } from '../redux/slices/banks';
import Item from '../components/Item';
import './Main.css'

const Main = () => {
    const dispatch = useDispatch();

    const { banks } = useSelector((state) => state.banks);

    const isBanksLoading = banks.status === 'loading';

    React.useEffect(() => {
        dispatch(fetchBanks());
    }, [dispatch]);

    console.log(banks);

    return (
        <>
            MAIN
            <div className='itemsWrapper'>
                {(isBanksLoading ? [...Array(5)] : banks.items).map((item, index) =>
                    isBanksLoading ? (
                        <div key={index}>Загрузка</div>
                    ) : (
                        <Item key={index} item={item} />
                    ),
                )}
            </div>
        </>
    );
};

export default Main;
