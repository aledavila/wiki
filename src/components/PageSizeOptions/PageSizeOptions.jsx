import { useState } from 'react';
import chevronSvg from '../../assets/icons/chevron.svg';
import listIcon from '../../assets/icons/list.svg';
import './page-size-options.scss';

const DEFAULT_PAGE_SIZE = 100;
const OPTIONS = [25, 50, 75, 100, 200];

export default function PageSizeOptions({
  onPageSizeSelect,
  selectedPageSize,
}) {
  const [pageSizeOptions, setPageSizeOptions] = useState({
    isOpen: false,
    pageSize: selectedPageSize || DEFAULT_PAGE_SIZE,
  });
  const { isOpen, pageSize } = pageSizeOptions;

  const handleClick = () => {
    setPageSizeOptions((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,
    }));
  };

  const handleSelect = (pageSize) => {
    setPageSizeOptions((prevState) => ({
      ...prevState,
      isOpen: false,
      pageSize,
    }));
    onPageSizeSelect(pageSize);
  };

  const handleKeyDown = (e, option) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(option);
    } else if (e.key === 'Escape') {
      setPageSizeOptions((prevState) => ({
        ...prevState,
        isOpen: false,
      }));
    }
  };

  return (
    <div className='page-size-options--container'>
      <button
        aria-expanded={isOpen}
        aria-haspopup='listbox'
        className='page-size-options--button'
        onClick={handleClick}
        tabIndex='0'
      >
        <div className='icon-container icon-container__page-size-options'>
          <img alt="" aria-hidden="true" src={listIcon} />
        </div>
        <div className='page-size-options--text'>
          <span>
            Num Results <img className='chevron-icon' src={chevronSvg} />
          </span>
          <p>{pageSize}</p>
        </div>
      </button>
      {isOpen && (
        <ul className='dropdown-list' role='listbox'>
          {OPTIONS.map((option, index) => (
            <li
              key={index}
              aria-selected={pageSize === option}
              className='list-item'
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => handleKeyDown(e, option)}
              role='option'
              tabIndex='0'
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
