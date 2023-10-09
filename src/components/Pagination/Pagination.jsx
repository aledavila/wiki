import { useMemo } from 'react';
import classNames from 'classnames';
import leftArrow from '../../assets/icons/left-arrow.svg';
import rightArrow from '../../assets/icons/right-arrow.svg';
import { getTruncatedPageNumbers } from './helpers';
import './pagination.scss';

function Pagination({
  articlesPerPage,
  currentPage,
  onPageChange,
  totalArticles,
}) {
  const pageNumbers = useMemo(() => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
      pageNumbers.push(i);
    }

    return getTruncatedPageNumbers(currentPage, pageNumbers);
  }, [articlesPerPage, currentPage, totalArticles]);

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  return (
    <nav aria-label='Pagination' className='pagination'>
      <ul className='pagination-list'>
        <li
          className={classNames('pagination-item', {
            disabled: currentPage === 1,
          })}
        >
          <button
            aria-label='Previous Page'
            className='pagination-link pagination-arrow'
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <img alt="" aria-hidden="true" className='left-arrow-icon' src={leftArrow} />
          </button>
        </li>
        {pageNumbers.map((page, index) => (
          <li
            key={index}
            className={classNames('pagination-item', {
              active: currentPage === page,
            })}
          >
            <button
              aria-current={currentPage === page ? 'page' : undefined}
              aria-label={`Go to Page ${page}`}
              className={classNames('pagination-link', {
                ellipsis: page === 'ellipsis',
              })}
              onClick={() => handlePageChange(page)}
              {...(page === 'ellipsis' && {
                'aria-label': page,
                disabled: true,
              })}
            >
              {page === 'ellipsis' ? '...' : page}
            </button>
          </li>
        ))}
        <li
          className={`pagination-item ${
            currentPage === Math.ceil(totalArticles / articlesPerPage) &&
            'disabled'
          }`}
        >
          <button
            aria-label='Next Page'
            className='pagination-link'
            disabled={
              currentPage === Math.ceil(totalArticles / articlesPerPage)
            }
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <img alt="" aria-hidden="true" className='right-arrow-icon' src={rightArrow} />
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
