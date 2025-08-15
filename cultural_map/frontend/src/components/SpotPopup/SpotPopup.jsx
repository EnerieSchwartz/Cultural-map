import { useContext } from "react";
import "./SpotPopup.css";
// import { ThemeContext } from "./../../contexts/ThemeContext";
export default function SpotPopup({ spot, darkMode, theme }) {
  const { name, description, address, website } = spot;
  // const { darkMode, toggleDarkMode, theme } = useContext(ThemeContext);

  return (
    <div>
      <div className="popup-title-container">
        <h3 className="popup-title">Spot Details</h3>
      </div>

      <div className="popup-grid">
        <div className="popup-label">Name:</div>
        <div className="popup-value">{name || "N/A"}</div>

        <div className="popup-label">About spot:</div>
        <div className="popup-value">{description || "N/A"}</div>

        <div className="popup-label">Address:</div>
        <div className="popup-value">{address || "N/A"}</div>

        <div className="popup-label">Website:</div>
        <div className="popup-value popup-value-website">
          <a href={website} target="_blank" rel="noopener noreferrer">
            {website}
          </a>
        </div>
      </div>
    </div>
  );
}
