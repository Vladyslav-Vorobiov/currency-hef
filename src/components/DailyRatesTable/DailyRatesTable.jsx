import { useState, useEffect, memo } from "react";
import dayjs from "dayjs";
import { fetchDailyRates } from "@/services/currencyApi";
import styles from "./DailyRatesTable.module.scss";

const TIMES = ["00:00", "06:00", "12:00", "18:00"];

export default function DailyRatesTable({ currency, selectedDate }) {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadRates() {
      setLoading(true);
      setError(null);
      const formattedDate = dayjs(selectedDate).format("DD-MM-YYYY");

      try {
        const data = await fetchDailyRates(formattedDate, currency);
        setRates(data || {});
      } catch (e) {
        setError("Ошибка при загрузке курсов");
      } finally {
        setLoading(false);
      }
    }

    loadRates();
  }, [selectedDate, currency]);

  const roundedRates = TIMES.map((time) => {
    const rate = rates[time]?.["1"]?.course;
    return rate ? Number(rate).toFixed(2) : "—";
  });

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className={styles.wrapper}>
        <div className={styles.row}>
          <div className={styles.headerCell}>Время</div>
          {TIMES.map((time) => (
            <div key={time} className={styles.cell}>
              {time}
            </div>
          ))}
        </div>

        <div className={styles.row}>
          <div className={styles.headerCell}>Курс</div>
          {roundedRates.map((value, i) => (
            <div key={TIMES[i]} className={styles.cell}>
              {value}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
