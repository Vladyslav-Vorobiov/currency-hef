import { useState } from "react";
import DailyRatesTable from "@/components/DailyRatesTable/DailyRatesTable";
import CurrencySelector from "@/components/CurrencySelector/CurrencySelector";
import Hero from "@/components/Hero/Hero";
import DateSelector from "@/components/DateSelector/DateSelector";

import styles from "./History.module.scss";

export default function History() {
  const [currency, setCurrency] = useState("USD");
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <>
      <Hero
        pretitle="База данных по курсам валют"
        title="Архив  курсов валют"
        subtitle="по часовому поясу (GMT+0)"
      />
      <div className="container">
        <section className={styles.sectionWrapper}>
          <div className={styles.actionsWrapper}>
            <DateSelector
              selectedDate={selectedDate}
              onChange={setSelectedDate}
            />
            <CurrencySelector selected={currency} onChange={setCurrency} />
          </div>
          <DailyRatesTable currency={currency} selectedDate={selectedDate} />
        </section>
      </div>
    </>
  );
}
