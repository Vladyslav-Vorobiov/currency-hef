import styles from "./CurrencyCard.module.scss";

export default function CurrencyCard({ currency, rate }) {
  return (
    <div className={styles.card}>
      <div className={styles.row}>
        <div className={styles.label}>Код валюты</div>
        <div className={styles.label}>Валюта</div>
        <div className={styles.label}>Курс</div>
      </div>
      <div className={styles.row}>
        <div className={styles.value}>{currency}</div>
        <div className={styles.value}>
          {currency === "RUB" ? "Российский рубль" : "Кыргызский сом"}
        </div>
        <div className={styles.value}>{rate ?? "Загрузка..."}</div>
      </div>
    </div>
  );
}
