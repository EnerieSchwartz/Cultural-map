// src/components/GeneralSettings/GeneralSettings.jsx
import React from 'react';
import { FaMoon } from 'react-icons/fa';
import './GeneralSettings.css';

export default function GeneralSettings() {
  return (
    <div className="general-settings">
      <div className="settings-row">
        <div className="settings-left">
          <FaMoon className="settings-icon" />
          <span className="settings-label">Dark theme</span>
        </div>

        <div className="toggle-switch">
          <div className="toggle-track">
            <div className="toggle-thumb" />
          </div>
        </div>
      </div>
    </div>
  );
}
