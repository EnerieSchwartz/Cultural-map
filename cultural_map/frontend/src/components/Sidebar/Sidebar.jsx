import { useContext } from "react";
import "./Sidebar.css";
import { ThemeContext } from "./../../contexts/ThemeContext";

export default function Sidebar({ children }) {
  const { darkMode, toggleDarkMode, theme } = useContext(ThemeContext);
  return (
    <aside className={`${theme === "light" ? "light" : "dark"} sidebar`}>
      {children}
    </aside>
  );
}
