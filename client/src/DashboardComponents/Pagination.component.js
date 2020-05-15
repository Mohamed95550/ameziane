import React from 'react';

const Pagination = ({ tasksPerPage, totalTasks, paginate, currentP}) => {
  const pageNumbers = [];
  //pageNumbers.push('<<');
 // pageNumbers.push('<');
  for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
      pageNumbers.push(i);
  }
  //pageNumbers.push('>');
  //pageNumbers.push('>>');
  return (   
    <nav>
      <ul>  
          {/*(currentP - 1)=== 0?null:currentP--
          (currentP === Math.ceil(totalTasks / tasksPerPage))?null:currentP++*/}
        {pageNumbers.map(number => (
          <li key={number} onClick={() => paginate(number)}> 
        {number === currentP ? <b>{number}</b> :  <a> {number}</a>}
          </li>
            ))} 
      </ul>
    </nav>
  );
};

export default Pagination;
