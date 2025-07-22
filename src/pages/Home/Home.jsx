import { useEffect, useState } from "react";
import { fetchCurrentRate } from "@/services/currencyApi";
import CurrencySelector from "@/components/CurrencySelector/CurrencySelector";
import CurrencyCard from "@/components/CurrencyCard/CurrencyCard";
import Hero from "@/components/Hero/Hero";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";

export default function Home() {
  const [currency, setCurrency] = useState("USD");
  const [rateData, setRateData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadRate = async () => {
      setLoading(true);
      try {
        const data = await fetchCurrentRate(currency);
        setRateData(data);
      } catch (e) {
        setRateData(null);
      } finally {
        setLoading(false);
      }
    };

    loadRate();
  }, [currency]);

  const todayGmtDate = new Date().toLocaleDateString("ru-RU", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <Hero
        pretitle="База данных по курсам валют"
        title={
          <>
            Актуальный курс валют <br /> на дату {todayGmtDate} (GMT+0)
          </>
        }
      ></Hero>
      <div className="container">
        <section className={styles.sectionWrapper}>
          <div className={styles.actionsWrapper}>
            <div>
              <Link to="/history" className={styles.historyLink}>
                Архив курсов
              </Link>
            </div>
            <div className={styles.selectWrapper}>
              <CurrencySelector selected={currency} onChange={setCurrency} />
            </div>
          </div>

          <h3 className={styles.subtitle}>Курс заданной валюты</h3>
          <div style={{ marginTop: "1rem" }}>
            <CurrencyCard
              currency={currency === "USD" ? "RUB" : "KGS"}
              rate={rateData}
            />
          </div>
        </section>
      </div>
    </>
  );
}
