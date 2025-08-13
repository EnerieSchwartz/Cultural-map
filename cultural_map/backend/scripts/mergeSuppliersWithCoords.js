const fs = require('fs');
const path = require('path');

// Load base supplier data (e.g. company name, address)
const spotsPath = path.join(__dirname, '../geo/spots.json');
const spots = JSON.parse(fs.readFileSync(spotsPath));

// Load coordinates that were geocoded
const coordsPath = path.join(__dirname, '../geo/spots_with_coords.json');
const coords = JSON.parse(fs.readFileSync(coordsPath));

// Create a map of coordinates by supplier ID
const coordsMap = Object.fromEntries(coords.map(({ id, lat, lng }) => [id, { lat, lng }]));

// Merge coordinates into spots
const merged = spots.map(supplier => {
  const coord = coordsMap[supplier.id];
  return coord ? { ...supplier, ...coord } : supplier;
});

// Save merged file
const outputPath = path.join(__dirname, '../geo/spots_merged.json');
fs.writeFileSync(outputPath, JSON.stringify(merged, null, 2));
console.log(`Merged spots written to ${outputPath}`);
