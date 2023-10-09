import { useEffect, useState } from 'react';
import ActionBar from './components/ActionBar/ActionBar';
import ActionBarDivider from './components/ActionBarDivider/ActionBarDivider';
import Button from './components/Button/Button';
import DatePicker from './components/DatePicker/DatePicker';
import ListItem from './components/ListItem/ListItem';
import PageSizeOptions from './components/PageSizeOptions/PageSizeOptions';
import Pagination from './components/Pagination/Pagination';
import Results from './components/Results/Results';
import { fetchArticles } from './api';
import { LOCALSTORAGE_KEY } from './constants';
import { paginate } from './helpers';
import './styles/App.scss';

const DATE_YESTERDAY = new Date(Date.now() - 1000 * 60 * 60 * 24);

function App() {
  const [articles, setArticles] = useState({
    pinned: new Map(
      JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY.pinnedArticles))
    ),
    results: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    selectedDate: DATE_YESTERDAY,
    selectedPageSize: 100,
  });
  const { selectedPageSize, selectedDate } = filters;

  const handleDateSelect = (selectedDate) => {
    setFilters((prevState) => ({
      ...prevState,
      selectedDate,
    }));
  };

  const handlePageSizeSelect = (selectedPageSize) => {
    setFilters((prevState) => ({
      ...prevState,
      selectedPageSize,
    }));
  };

  const handleSearch = async () => {
    try {
      const { items = {} } = await fetchArticles(selectedDate);
      setArticles((prevState) => ({
        ...prevState,
        results: items[0]?.articles ?? [],
      }));
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  console.log(articles.pinned.size)

  return (
    <>
      <header className='header' />
      <main className='content'>
        <h2 className='page--title'>Top Wikipedia articles</h2>
        <ActionBar>
          <DatePicker
            onDateSelect={handleDateSelect}
            selectedDate={selectedDate}
          />
          <ActionBarDivider />
          <PageSizeOptions
            onPageSizeSelect={(value) => {
              handlePageSizeSelect(value);
              setCurrentPage(1);
            }}
            selectedPageSize={selectedPageSize}
          />
          <Button label='Search' onClick={handleSearch} />
        </ActionBar>
        {
          articles.pinned.size !== 0 && (
            <div className='results-list pinned-list'>
              {Array.from(articles.pinned.entries()).map(([key, value]) => (
                <ListItem
                  key={key}
                  name={value.name.replace(/_/g, ' ')}
                  pinnedArticles={articles.pinned}
                  setArticles={setArticles}
                  views={value.views.toLocaleString()}
                />
              ))}
            </div>
          )
        }
        <Results results={articles.results}>
          {paginate(articles.results, currentPage, selectedPageSize).map(
              ({ article, rank, views }, index) => (
                <ListItem
                  key={index}
                  name={article.replace(/_/g, ' ')}
                  pinnedArticles={articles.pinned}
                  rank={rank}
                  setArticles={setArticles}
                  views={views.toLocaleString()}
                />
              )
            )}
        </Results>
        <Pagination
          articlesPerPage={selectedPageSize}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalArticles={articles.results.length}
        />
      </main>
    </>
  );
}

export default App;
