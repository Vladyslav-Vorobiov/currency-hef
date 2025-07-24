import styles from "./Hero.module.scss";

export default function Hero({ pretitle, title, subtitle }) {
  return (
    <div className={styles.heroWrapper}>
      <div className="container">
        <h3 className={styles.pretitle}>{pretitle}</h3>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </div>
  );
}
