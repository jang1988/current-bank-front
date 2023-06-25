import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Item from '../components/Item';
import { useParams } from 'react-router-dom';

const TagPage = () => {
    const { name } = useParams();
    const { banks } = useSelector((state) => state.banks);
    const [taggedItems, setTaggedItems] = useState([]);

    useEffect(() => {
        if (banks.status === 'loaded') {
            const filteredItems = banks.items.filter((item) => item.tags.includes(name));
            setTaggedItems(filteredItems);
        }
    }, [banks, name]);

    return (
        <div>
            <h1>Tag: {name}</h1>
            {taggedItems.length > 0 ? (
                taggedItems.map((item, i) => (
                    <Item key={i} item={item} tags={item.tags} />
                ))
            ) : (
                <p >No items found with this tag.</p>
            )}
        </div>
    );
};

export default TagPage;
