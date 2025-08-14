import React, { useState, useRef, useEffect } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./Map.css";
import SpotMarkers from "../SpotMarkers/SpotMarkers";
import Sidebar from "../Sidebar/Sidebar";
import SettingsPopup from "../SettingsPopup/SettingsPopup";
import { FaSlidersH } from "react-icons/fa";
import { FiltersContext } from "./../../contexts/FiltersContext.js";

export default function Map({ mapRef }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [geojsonData, setGeojsonData] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [mapStyle, setMapStyle] = useState(maptilersdk.MapStyle.STREETS);

  const [filters, setFilters] = useState({
    monument: true,
    religious: true,
    palace: true,
    museum: true,
    memorial: true,
    square: true,
    bridge: true,
  });

  const franceBounds = [
    [-4.710033934989174, 48.35442617029091],
    [8.250724747423407, 48.986104992282854],
  ];

  maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY;

  useEffect(() => {
    if (map.current) return;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: mapStyle,
      bounds: franceBounds,
      fitBoundsOptions: { padding: 20 },
      zoom: 10,
    });

    if (mapRef) {
      mapRef.current = map.current;
    }
  }, []);

  useEffect(() => {
    if (map.current && mapStyle) {
      map.current.setStyle(mapStyle);
    }
  }, [mapStyle]);

  useEffect(() => {
    fetch("/geo/spots.geojson")
      .then((res) => res.json())
      .then(setGeojsonData);
  }, []);

  const handleStyleChange = (styleKey) => {
    const styleMap = {
      streets: maptilersdk.MapStyle.STREETS,
      outdoor: maptilersdk.MapStyle.OUTDOOR,
      satellite: maptilersdk.MapStyle.SATELLITE,
    };
    setMapStyle(styleMap[styleKey] || maptilersdk.MapStyle.STREETS);
  };

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
      <FiltersContext.Provider value={{ filters, setFilters }}>
        <Sidebar>
          <button
            className="filter-toggle"
            onClick={() => setShowSettings(true)}
          >
            <FaSlidersH />
          </button>

          {showSettings && (
            <SettingsPopup
              onClose={() => setShowSettings(false)}
              onStyleChange={handleStyleChange}
            />
          )}
        </Sidebar>

        {map.current && geojsonData && (
          <SpotMarkers map={map.current} geojson={geojsonData} />
        )}
      </FiltersContext.Provider>
    </div>
  );
}
