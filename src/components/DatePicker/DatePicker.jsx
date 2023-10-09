import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import calendarIcon from '../../assets/icons/calendar.svg';
import chevronSvg from '../../assets/icons/chevron.svg';
import 'react-day-picker/dist/style.css';
import './date-picker.scss';

const formatDate = (date = '') => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

export default function DatePicker({ onDateSelect, selectedDate }) {
  const [datePicker, setDatePicker] = useState({
    date: selectedDate || new Date(),
    isOpen: false,
  });
  const { date, isOpen } = datePicker;

  const handleDateSelect = (date) => {
    if (date) {
      setDatePicker((prevState) => ({
        ...prevState,
        date,
        isOpen: false,
      }));
      onDateSelect(date);
    }
  };

  const toggleDatePickerVisibility = () => {
    setDatePicker((prevState) => ({
      ...prevState,
      isOpen: !prevState.isOpen,
    }));
  };

  return (
    <div className='date-picker--container'>
      <button
        aria-expanded={isOpen}
        aria-haspopup='true'
        className='date-picker--button'
        onClick={toggleDatePickerVisibility}
      >
        <div className='icon-container icon-container__date-picker'>
          <img alt="" aria-hidden="true" src={calendarIcon} />
        </div>
        <div className='date-picker--text'>
          <span>
            Date <img alt="" aria-hidden="true" className='chevron-icon' src={chevronSvg} />
          </span>
          <p>{formatDate(date)}</p>
        </div>
      </button>
      {isOpen && (
        <DayPicker
          disabled={{ after: new Date() }}
          mode='single'
          onSelect={handleDateSelect}
          selected={date}
          showOutsideDays
        />
      )}
    </div>
  );
}
