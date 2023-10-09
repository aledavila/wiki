import classNames from 'classnames';
import { LOCALSTORAGE_KEY } from '../../constants';
import pinSvg from '../../assets/icons/pin.svg';
import pinnedSvg from '../../assets/icons/pin-fill.svg';
import './listitem.scss';

export default function ListItem({
  name,
  pinnedArticles,
  rank,
  setArticles,
  views,
}) {
  const handlePin = () => {
    // Update pinnedArticles Map
    if (pinnedArticles.has(name)) {
      pinnedArticles.delete(name);
    } else {
      pinnedArticles.set(name, { name, rank, views });
    }

    // Update localStorage
    localStorage.setItem(
      LOCALSTORAGE_KEY.pinnedArticles,
      JSON.stringify([...pinnedArticles])
    );

    // Update local state
    setArticles((prevState) => ({
      ...prevState,
      pinned: pinnedArticles,
    }));
  };

  return (
    <div className='list-item--container'>
      <div className='item-info'>
        {rank && <span>{rank}</span>}
        <h6>{name}</h6>
      </div>
      <div className='item-views'>
        <span className='item--views-count'>{views} views</span>
        <button
            className={classNames('pin-button', {
              pinned: pinnedArticles.has(name),
            })}
            onClick={handlePin}
            aria-label='Pin Article'
          >
            {pinnedArticles.has(name) ? <img alt="" aria-hidden="true" src={pinnedSvg} /> : <img alt="" aria-hidden="true" src={pinSvg} />}
        </button>
      </div>
    </div>
  );
}
