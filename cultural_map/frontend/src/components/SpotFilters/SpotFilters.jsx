import React, { useState, useContext } from "react";
import "./SpotFilters.css";
import { FaLandmark, FaMonument, FaChurch, FaCity } from "react-icons/fa";
import { GiCastle, GiGraveyard, GiStoneBridge } from "react-icons/gi";
import { MdOutlineMuseum, MdPark } from "react-icons/md";
import { FiltersContext } from "./../../contexts/FiltersContext.js";
import { ThemeContext } from "./../../contexts/ThemeContext";

export default function SpotFilters() {
  const { darkMode, toggleDarkMode, theme } = useContext(ThemeContext);

  const handleToggle = (type) => {
    setFilters((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };
  const { filters, setFilters } = useContext(FiltersContext);

  const hideAll = () => {
    setFilters({
      monument: false,
      religious: false,
      palace: false,
      museum: false,
      memorial: false,
      square: false,
      bridge: false,
    });
  };

  return (
    <div className={`${theme === "light" ? "light" : "dark"} spots-filters`}>
      <div className="filters-header">
        <h4>Map markers</h4>
        <button className="hide-all-btn" onClick={hideAll}>
          Hide all
        </button>
      </div>
      <div className="filter-toggles">
        <div className="filter-item">
          <div className="filter-label">
            <div className="filter-icon">
              <MdOutlineMuseum />
            </div>
            Museums
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={filters.museum}
              onChange={() => handleToggle("museum")}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="filter-item">
          <div className="filter-label">
            <div className="filter-icon">
              <FaMonument />
            </div>
            Monuments
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={filters.monument}
              onChange={() => handleToggle("monument")}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="filter-item">
          <div className="filter-label">
            <div className="filter-icon">
              <FaChurch />
            </div>
            Religious Sites
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={filters.religious}
              onChange={() => handleToggle("religious")}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="filter-item">
          <div className="filter-label">
            <div className="filter-icon">
              <GiCastle />
            </div>
            Palaces
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={filters.palace}
              onChange={() => handleToggle("palace")}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="filter-item">
          <div className="filter-label">
            <div className="filter-icon">
              <MdPark />
            </div>
            Squares
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={filters.square}
              onChange={() => handleToggle("square")}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="filter-item">
          <div className="filter-label">
            <div className="filter-icon">
              <GiGraveyard />
            </div>
            Memorials
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={filters.memorial}
              onChange={() => handleToggle("memorial")}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="filter-item">
          <div className="filter-label">
            <div className="filter-icon">
              <GiStoneBridge />
            </div>
            Bridges
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={filters.bridge}
              onChange={() => handleToggle("bridge")}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
}
