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
  const [gmtTime, setGmtTime] = useState("");

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

  useEffect(() => {
    const updateTime = () => {
      const timeString = new Date().toLocaleTimeString("ru-RU", {
        timeZone: "UTC",
        hour: "2-digit",
        minute: "2-digit",
      });
      setGmtTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const todayGmtDate = new Date().toLocaleDateString("ru-RU", {
    timeZone: "UTC",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const roundedRate = Number(rateData).toFixed(2);

  return (
    <>
      <Hero
        pretitle="База данных по курсам валют"
        title={
          <>
            Актуальный курс валют <br /> на {todayGmtDate} ({gmtTime}, GMT+0)
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
              rate={rateData ? roundedRate : null}
            />
          </div>
        </section>
      </div>
    </>
  );
}
