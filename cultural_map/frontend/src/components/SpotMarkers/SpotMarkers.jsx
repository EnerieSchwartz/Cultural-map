import { useEffect, useContext } from "react";
import * as maplibregl from "maplibre-gl";
import ReactDOMServer from "react-dom/server";
import SpotPopup from "../SpotPopup/SpotPopup";
import { FaLandmark, FaMonument, FaChurch } from "react-icons/fa";
import { GiCastle, GiGraveyard } from "react-icons/gi";
import { MdOutlineMuseum, MdPark } from "react-icons/md";
import "./SpotMarkers.css";
import { FiltersContext } from "./../../contexts/FiltersContext.js";
import { ThemeContext } from "./../../contexts/ThemeContext";

export default function SpotMarkers({ map, geojson }) {
  const { filters, setFilters } = useContext(FiltersContext);
  const { darkMode, toggleDarkMode, theme } = useContext(ThemeContext);
  useEffect(() => {
    if (!map || !geojson) return;

    let markers = [];

    geojson.features.forEach((feature) => {
      const { coordinates } = feature.geometry;
      const spot = feature.properties;
      if (!filters[spot.category]) return;
      const markerElement = createCategoryMarker(spot.category);
      const popupContent = ReactDOMServer.renderToString(
        <SpotPopup spot={spot} theme={theme} darkMode={darkMode} />
      );
      const popup = new maplibregl.Popup({
        offset: 20,
        className: `${theme === "light" ? "light" : "dark"} spot-popup`,
      }).setHTML(popupContent);

      const marker = new maplibregl.Marker({ element: markerElement })
        .setLngLat(coordinates)
        .setPopup(popup)
        .addTo(map);

      markers.push(marker);
    });

    return () => {
      markers.forEach((marker) => marker.remove());
    };
  }, [map, geojson, filters, theme]);

  return null;
}

function createCategoryMarker(category) {
  const el = document.createElement("div");
  el.className = "filter-icon";

  let icon;
  switch (category) {
    case "monument":
      icon = <FaMonument color="#fff" size={20} />;
      break;
    case "religious":
      icon = <FaChurch color="#fff" size={20} />;
      break;
    case "palace":
      icon = <GiCastle color="#fff" size={20} />;
      break;
    case "museum":
      icon = <MdOutlineMuseum color="#fff" size={20} />;
      break;
    case "memorial":
      icon = <GiGraveyard color="#fff" size={20} />;
      break;
    case "square":
      icon = <MdPark color="#fff" size={18} />;
      break;
    default:
      icon = <FaLandmark color="#fff" size={18} />;
  }

  el.innerHTML = ReactDOMServer.renderToString(icon);
  return el;
}
