import { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import { FaSearch } from "react-icons/fa";
import { ThemeContext } from "./../../contexts/ThemeContext";

const MAPTILER_API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

export default function Navbar({ onSearch }) {
  const { darkMode, toggleDarkMode, theme } = useContext(ThemeContext);
  const [query, setQuery] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleToggle = () => setShowInput(!showInput);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setSuggestions([]);
    }
  };

  const handleSelectSuggestion = (text) => {
    setQuery(text);
    onSearch(text);
    setSuggestions([]);
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!query.trim()) return setSuggestions([]);
      try {
        const res = await fetch(
          `https://api.maptiler.com/geocoding/${encodeURIComponent(
            query
          )}.json?key=${MAPTILER_API_KEY}&language=en`
        );

        const data = await res.json();
        const names = data.features.map((f) => f.place_name);
        setSuggestions(names);
      } catch (err) {
        console.error("Autocomplete error:", err);
        setSuggestions([]);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300); // debounce input
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <nav className={`${theme === "light" ? "light" : "dark"} navbar`}>
      <div className="navbar-wrapper">
        <h3 className="navbar-logo">L’Atlas Parisien</h3>

        <div className="geo-search-area">
          <FaSearch className="geo-search-icon" onClick={handleToggle} />

          {showInput && (
            <form className="geo-search-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Search location..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={`geo-search-input ${
                  showInput ? "" : "geo-search-input-hidden"
                }`}
              />
              {suggestions.length > 0 && (
                <ul className="geo-hint-list">
                  {suggestions.map((place, index) => (
                    <li
                      key={index}
                      onClick={() => handleSelectSuggestion(place)}
                    >
                      {place}
                    </li>
                  ))}
                </ul>
              )}
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}
