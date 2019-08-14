import React from 'react';

import './Pagination.scss';

const pagination = (props) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="pagination-container">
      <ul className="pagination">
        {pageNumbers.map(number => {
          return <li key={number}>
                  <button 
                    onClick={() => props.paginate(number)}
                    className={props.activePage === number ? 'active-page' : ''}>
                    {number}
                  </button>
                 </li>
        })}
      </ul>
    </nav>
  )
}

export default pagination;
