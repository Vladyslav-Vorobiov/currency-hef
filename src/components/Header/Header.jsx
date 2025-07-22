import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <a href="https://hefservice.com/">
        <img src="/images/logo.svg" alt="hef logo" className={styles.logo} />
      </a>
    </header>
  );
}
