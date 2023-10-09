export const formatDate = (selectedDate) => {
  const year = selectedDate.getFullYear();
  const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to month since it's zero-based
  const day = String(selectedDate.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
};

export const paginate = (array, currentPage, itemsPerPage) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return array.slice(startIndex, endIndex);
};
