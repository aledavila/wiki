export default function Results({ children, results = [] }) {
  
  if (results.length === 0) {
    return (
      <div className='results-list'>
        <p>No results</p>
      </div>
    );
  }

  return (
    <div className='results-list'>
      {children}
    </div>
  );
}
