const fs = require("fs");
const path = require("path");

// Load merged spots with coordinates
const mergedPath = path.join(__dirname, "../geo/spots_merged.json");
const spots = JSON.parse(fs.readFileSync(mergedPath));

// Build GeoJSON structure
const geojson = {
  type: "FeatureCollection",
  features: spots
    .filter((s) => s.lat && s.lng)
    .map((supplier) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [supplier.lng, supplier.lat],
      },
      properties: {
        ...supplier,
      },
    })),
};

// Write to file
const outputPath = path.join(__dirname, "../geo/spots.geojson");
fs.writeFileSync(outputPath, JSON.stringify(geojson, null, 2));
console.log(`GeoJSON written to ${outputPath}`);
