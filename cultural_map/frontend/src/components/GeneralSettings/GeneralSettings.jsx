import { useContext } from "react";
import { FaMoon } from "react-icons/fa";
import "./GeneralSettings.css";
import { ThemeContext } from "./../../contexts/ThemeContext";

export default function GeneralSettings() {
  const { darkMode, toggleDarkMode, theme } = useContext(ThemeContext);

  return (
    <div className={`general-settings`}>
      <div className="settings-row">
        <div className={`${theme === "light" ? "" : "dark"} settings-theme`}>
          <FaMoon className="settings-icon" />
          <span className={`settings-label`}>Dark theme</span>
        </div>

        <label className="toggle-switch">
          <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
          <span className="toggle-slider"></span>
        </label>
      </div>
    </div>
  );
}
