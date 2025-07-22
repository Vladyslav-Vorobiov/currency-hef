import { useState, useEffect, memo } from "react";
import dayjs from "dayjs";
import { fetchDailyRates } from "@/services/currencyApi";
import styles from "./DailyRatesTable.module.scss";

const TIMES = ["00:00", "06:00", "12:00", "18:00"];

const RatesRows = memo(({ rates }) => {
  return (
    <tbody>
      {TIMES.map((time) => (
        <tr key={time}>
          <td>{time}</td>
          <td>{rates[time]?.["1"]?.course || "—"}</td>
        </tr>
      ))}
    </tbody>
  );
});

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

  return (
    // <div>
    //   {error && <p style={{ color: "red" }}>{error}</p>}

    //   <div className={styles.tableWrapper}>
    //     <table className={styles.table}>
    //       <thead>
    //         <tr>
    //           <th>Время</th>
    //           <th>Курс</th>
    //         </tr>
    //       </thead>
    //       <RatesRows rates={rates} />
    //     </table>
    //   </div>
    // </div>

    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className={styles.wrapper}>
        {/* Заголовок с временем */}
        <div className={styles.row}>
          <div className={styles.headerCell}>Время</div>
          {TIMES.map((time) => (
            <div key={time} className={styles.cell}>
              {time}
            </div>
          ))}
        </div>

        {/* Ряд с курсами */}
        <div className={styles.row}>
          <div className={styles.headerCell}>Курс</div>
          {TIMES.map((time) => (
            <div key={time} className={styles.cell}>
              {rates[time]?.["1"]?.course ?? "—"}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
