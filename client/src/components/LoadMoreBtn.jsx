import React from 'react';

const LoadMoreBtn = ({ handleLoadMore, page, result, load }) => {
  return (
    <>
      {result < 3 * (page - 1)
        ? ''
        : !load && (
            <button
              className="btn btn-dark mx-auto d-block"
              onClick={handleLoadMore}
            >
              Load more
            </button> 
          )}
    </>
  );
};

export default LoadMoreBtn;
