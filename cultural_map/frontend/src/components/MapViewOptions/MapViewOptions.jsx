import { useState, useContext } from "react";
import standardImg from "./../../assets/map__styles/standard.png";
import topoImg from "./../../assets/map__styles/topo.png";
import satelliteImg from "./../../assets/map__styles/satellite.png";
import "./MapViewOptions.css";
import { ThemeContext } from "./../../contexts/ThemeContext";

const styles = [
  {
    key: "streets",
    label: "Standard",
    thumbnail: standardImg,
  },
  {
    key: "outdoor",
    label: "Topo",
    thumbnail: topoImg,
  },
  {
    key: "satellite",
    label: "Satellite",
    thumbnail: satelliteImg,
  },
];

export default function MapViewOptions({ onStyleChange }) {
  const { darkMode, toggleDarkMode, theme } = useContext(ThemeContext);
  // const [selectedStyle, setSelectedStyle] = useState(false);
  return (
    <div className={`${theme === "light" ? "light" : "dark"} map-view-options`}>
      {styles.map((style) => (
        <div
          key={style.key}
          className="style-option"
          onClick={() => onStyleChange(style.key)}
        >
          <img
            src={style.thumbnail}
            alt={style.label}
            className="style-thumb"
          />
          <div className="style-label">{style.label}</div>
        </div>
      ))}
    </div>
  );
}
