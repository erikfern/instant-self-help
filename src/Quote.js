import React from 'react';

const Quote = (props) => {

  return (
    <div className='quoteStyle'>
      <h2>{props.selectedQuote}</h2>
    </div>
  );
}; 

export default Quote;