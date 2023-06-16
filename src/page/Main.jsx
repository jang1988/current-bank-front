import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanks } from '../redux/slices/banks';

const Main = () => {
    const dispatch = useDispatch()

    const {banks} = useSelector(state => state.banks)

    React.useEffect(() => {
        dispatch(fetchBanks())
    }, [dispatch])
    

    console.log(banks)

    return (
        <div>
            Mainnnnnn
        </div>
    );
}

export default Main;
