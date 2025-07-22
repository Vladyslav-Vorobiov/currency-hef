import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { ru } from "date-fns/locale";
import CustomDropdown from "@/components/CustomDropdown/CustomDropdown";

const monthOptions = Array.from({ length: 12 }, (_, i) => ({
  value: i,
  label: new Date(0, i).toLocaleString("ru-RU", { month: "long" }),
}));

const getYearOptions = (from = 2022, to = new Date().getFullYear()) =>
  Array.from({ length: to - from + 1 }, (_, i) => {
    const year = to - i;
    return { value: year, label: year.toString() };
  });

export default function DateSelector({ selectedDate, onChange }) {
  const [visibleDate, setVisibleDate] = useState({
    month: selectedDate.getMonth(),
    year: selectedDate.getFullYear(),
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setVisibleDate({
      month: selectedDate.getMonth(),
      year: selectedDate.getFullYear(),
    });
  }, [selectedDate]);

  const updateToFirstDayOfMonth = (month, year) => {
    setVisibleDate({ month, year });
    onChange(new Date(year, month, 1));
  };

  const toggleCalendar = () => setIsOpen((prev) => !prev);

  return (
    <div className="datepicker-wrapper">
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        open={isOpen}
        onInputClick={toggleCalendar}
        onCalendarClose={() => setIsOpen(false)}
        dateFormat="dd.MM.yyyy"
        maxDate={new Date()}
        locale={ru}
        showPopperArrow={false}
        wrapperClassName={isOpen ? "datepicker-open" : ""}
        openToDate={new Date(visibleDate.year, visibleDate.month, 1)}
        filterDate={(date) =>
          date.getMonth() === visibleDate.month &&
          date.getFullYear() === visibleDate.year
        }
        renderCustomHeader={() => (
          <div className="react-datepicker__header__dropdown">
            <CustomDropdown
              value={visibleDate.month}
              options={monthOptions}
              onChange={(month) =>
                updateToFirstDayOfMonth(month, visibleDate.year)
              }
            />
            <CustomDropdown
              value={visibleDate.year}
              options={getYearOptions()}
              onChange={(year) =>
                updateToFirstDayOfMonth(visibleDate.month, year)
              }
            />
          </div>
        )}
      />
    </div>
  );
}
