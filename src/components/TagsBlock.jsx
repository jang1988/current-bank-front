import React from 'react';
import './TagsBlock.css'

const TagsBlock = ({tags}) => {
    return (
        <div>
            TAGS
            {
                tags.map((tag, i) => <p key={i}>{tag}</p>)
            }
        </div>
    );
}

export default TagsBlock;
