import { useState, useRef, useEffect } from "react";
import styles from "./CurrencySelector.module.scss";
import DropdownArrow from "@/components/DropdownArrow/DropdownArrow";

const options = [
  { value: "USD", label: "RUB" },
  { value: "KGS", label: "KGS" },
];

export default function CurrencySelector({ selected, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = options.find((opt) => opt.value === selected)?.label;

  return (
    <div className={styles.wrapper} ref={ref}>
      <div
        className={`${styles.select} ${isOpen ? styles.active : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedLabel}
        <DropdownArrow isOpen={isOpen} />
      </div>

      {isOpen && (
        <ul className={styles.dropdown}>
          {options.map((opt) => (
            <li
              key={opt.value}
              className={styles.option}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
