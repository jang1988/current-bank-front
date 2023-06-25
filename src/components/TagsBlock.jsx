import React from 'react';
import { Link } from 'react-router-dom';
import './TagsBlock.css';

const TagsBlock = ({ tags }) => {
  return (
    <div className="TagsBlock">
      <div className="TagsBlock__title">TAGS</div>
      <ul className="TagsBlock__list">
        {tags.map((name, i) => (
          <li className="TagsBlock__item" key={i}>
            <Link to={`/tag/${name}`} className="TagsBlock__link">
              #{name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagsBlock;
