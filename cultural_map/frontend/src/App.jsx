import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Map from "./components/Map/Map";
import { useRef } from "react";

function App() {
  const mapRef = useRef(null);

  const handleSearch = async (query) => {
    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY;
    const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(
      query
    )}.json?key=${apiKey}`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      const feature = data.features[0];
      if (feature && mapRef.current) {
        const [lng, lat] = feature.geometry.coordinates;
        mapRef.current.flyTo({ center: [lng, lat], zoom: 10 });
      }
    } catch (err) {
      console.error("Geocoding error:", err);
    }
  };

  return (
    <div className="app-container">
      <Navbar onSearch={handleSearch} />
      <div className="map-container">
        <Map mapRef={mapRef} />
      </div>
      <Footer />
    </div>
  );
}

export default App;
