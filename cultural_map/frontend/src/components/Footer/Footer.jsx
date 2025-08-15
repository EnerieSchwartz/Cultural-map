import { useContext } from "react";
import "./Footer.css";
import { ThemeContext } from "./../../contexts/ThemeContext";

export default function Footer() {
  const { darkMode, toggleDarkMode, theme } = useContext(ThemeContext);
  return (
    <footer className={`${theme === "light" ? "light" : "dark"} map-footer`}>
      <p>© 2025 L’Atlas Parisienr</p>
    </footer>
  );
}
