import styles from "./DropdownArrow.module.scss"; // отдельно создашь файл со стилями

export default function DropdownArrow({ isOpen }) {
  return (
    <img
      src="/icons/dropdown.svg"
      alt="arrow"
      className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}
    />
  );
}
