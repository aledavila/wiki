import './button.scss';

export default function Button({ label, onClick }) {
  return (
    <button className='grow-button__primary' onClick={onClick}>
      {label}
    </button>
  );
}
