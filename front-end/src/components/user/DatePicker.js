import React, { useState, useEffect } from "react";
import { getMonth, getYear } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BirthPick(props) {
  console.log(props.birth);
  console.log(props.setStartDate);
  var temp = new Date(
    parseInt(props.birth.substr(0, 4)),
    parseInt(props.birth.substr(5, 2)) - 1,
    parseInt(props.birth.substr(8, 2))
  );
  const [startDate, setStartDate] = useState(new Date(temp));
  // if (props.birth) {

  console.log(temp);

  const range = (start, end) => {
    return new Array(end - start).fill().map((d, i) => i + start);
  };
  const years = range(1990, getYear(new Date()) + 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const sendTextValue = (date) => {
    setStartDate(date);
  };
  return (
    <DatePicker
      dateFormat="yyyy-MM-dd"
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
          </button>
          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
          </button>
        </div>
      )}
      selected={startDate}
      onChange={(date) => {
        // console.log(date);
        setStartDate(date);
        sendTextValue(date);
      }}
    />
  );
}

export default BirthPick;
