import { useState, useRef, useEffect } from "react";
import styles from "./CustomDropdown.module.scss";
import DropdownArrow from "@/components/DropdownArrow/DropdownArrow";

export default function CustomDropdown({ value, options, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.dropdown} ref={ref}>
      <button
        type="button"
        className={`${styles.toggle} ${isOpen ? styles.active : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selected?.label}
        <DropdownArrow isOpen={isOpen} />
      </button>
      {isOpen && (
        <ul className={styles.menu}>
          {options.map((opt) => (
            <li
              key={opt.value}
              className={styles.item}
              onClick={() => {
                onChange(opt.value);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
