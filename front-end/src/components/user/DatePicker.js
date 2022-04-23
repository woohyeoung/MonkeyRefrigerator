import React, { useState, useEffect } from "react";
import { getMonth, getYear } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function BirthPick(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [birthday, setBirthday] = useState(new Date());

  useEffect(() => {
    if (props.type === "profile" && props.birthday) {
      setTimeout(() => {
        setStartDate(
          new Date(
            parseInt(props.birthday.substr(0, 4)),
            parseInt(props.birthday.substr(5, 2)) - 1,
            parseInt(props.birthday.substr(8, 2)) + 1
          )
        );
      }, 200);
    }
  }, [props?.birthday]);

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
    if (props.type == "profile") {
      props.setBirthday(date);
    } else if (props.type == "signup") {
      props.setStartDate(date);
    }
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
      onChange={async (date) => {
        setStartDate(date);
        sendTextValue(date);
      }}
    />
  );
}

export default BirthPick;
