const MAX_PAGES = 5;
const HALF_MAX_PAGES = Math.floor(MAX_PAGES / 2);

export const getTruncatedPageNumbers = (currentPage, pageNumbers) => {
  if (pageNumbers.length <= MAX_PAGES) {
    return pageNumbers;
  }

  const visiblePageNumbers = [];

  if (currentPage <= HALF_MAX_PAGES + 1) {
    visiblePageNumbers.push(
      ...pageNumbers.slice(0, MAX_PAGES - 2),
      'ellipsis',
      pageNumbers.length
    );
  } else if (currentPage >= pageNumbers.length - HALF_MAX_PAGES) {
    visiblePageNumbers.push(
      1,
      'ellipsis',
      ...pageNumbers.slice(-MAX_PAGES + 2)
    );
  } else {
    visiblePageNumbers.push(
      1,
      'ellipsis',
      ...pageNumbers.slice(
        currentPage - HALF_MAX_PAGES,
        currentPage + HALF_MAX_PAGES
      ),
      'ellipsis',
      pageNumbers.length
    );
  }

  return visiblePageNumbers;
};
