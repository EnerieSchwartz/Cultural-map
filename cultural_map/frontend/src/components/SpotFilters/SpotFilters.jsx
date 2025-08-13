import React, { useState } from "react";
import "./SpotFilters.css";
import { FaLandmark, FaMonument, FaChurch, FaCity } from "react-icons/fa";
import { GiCastle, GiGraveyard, GiStoneBridge } from "react-icons/gi";
import { MdOutlineCropSquare } from "react-icons/md";



export default function SpotFilters() {
  const [filters, setFilters] = useState({
    suppliers: true,
    manufacturers: true,
    distributors: true,
  });

  const handleToggle = (type) => {
    setFilters((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const hideAll = () => {
    setFilters({
      suppliers: false,
      manufacturers: false,
      distributors: false,
    });
  };

  return (
    <div className="supplier-filters">
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
        <FaLandmark />
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
        <MdOutlineCropSquare />
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
        <FaCity />
      </div>
      Districts
    </div>
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={filters.district}
        onChange={() => handleToggle("district")}
      />
      <span className="toggle-slider"></span>
    </label>
  </div>

  <div className="filter-item">
    <div className="filter-label">
      <div className="filter-icon">
        <GiGraveyard />
      </div>
      Cemeteries
    </div>
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={filters.cemetery}
        onChange={() => handleToggle("cemetery")}
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
