import { formatDate } from './helpers';

const URL =
  'https://wikimedia.org/api/rest_v1/metrics/pageviews/top/en.wikipedia/all-access';

export const fetchArticles = async (selectedDate) => {
  const response = await fetch(`${URL}/${formatDate(selectedDate)}`);
  const data = await response.json();
  return data;
};
