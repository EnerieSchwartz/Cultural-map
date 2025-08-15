import React, { useState, useContext } from "react";
import "./SettingsPopup.css";
import MapViewOptions from "../MapViewOptions/MapViewOptions";
import SpotFilters from "../SpotFilters/SpotFilters";
import GeneralSettings from "../GeneralSettings/GeneralSettings";
import { ThemeContext } from "./../../contexts/ThemeContext";

export default function SettingsPopup({ onClose, onStyleChange }) {
  const { darkMode, toggleDarkMode, theme } = useContext(ThemeContext);

  return (
    <div className={`${theme === "light" ? "light" : "dark"} settings-popup`}>
      <div className="settings-header">
        <h3>Settings</h3>
        <button className="settings-close" onClick={onClose}>
          ✕
        </button>
      </div>
      <div className="settings-section">
        <h4>Map view</h4>
        <MapViewOptions onStyleChange={onStyleChange} />
      </div>
      <div className="spot-filters-section">
        <SpotFilters></SpotFilters>
      </div>
      <div className="settings-section">
        <h4>General</h4>
        <GeneralSettings />
      </div>
    </div>
  );
}
