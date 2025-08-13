const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const MAPTILER_API_KEY = process.env.MAPTILER_API_KEY;
console.log("Loaded API key:", MAPTILER_API_KEY); // debug log

if (!MAPTILER_API_KEY) {
  console.error("MAPTILER_API_KEY is missing from .env");
  process.exit(1);
}

// Load the full supplier list
const spotsPath = path.join(__dirname, "../geo/spots.json");
const spots = JSON.parse(fs.readFileSync(spotsPath));

// Step 1: Extract only ID and address
const addressList = spots.map(({ id, address }) => ({ id, address }));
const addressOutputPath = path.join(
  __dirname,
  "../geo/spots_addresses.json"
);
fs.writeFileSync(addressOutputPath, JSON.stringify(addressList, null, 2));
console.log(
  `Extracted ${addressList.length} addresses to spots_addresses.json`
);

// Step 2: Geocode each address using MapTiler
async function geocodeAddresses() {
  const results = [];

  for (const { id, address } of addressList) {
    try {
      const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(
        address
      )}.json?key=${MAPTILER_API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      const feature = data.features[0];

      if (feature) {
        const [lng, lat] = feature.geometry.coordinates;
        results.push({ id, address, lat, lng });
        console.log(`Geocoded: ${address} → [${lat}, ${lng}]`);
      } else {
        console.warn(`No result for: ${address}`);
      }

      // Respect rate limit: 5 requests/sec (MapTiler policy)
      await new Promise((r) => setTimeout(r, 250));
    } catch (err) {
      console.error(`Error geocoding ${address}:`, err.message);
    }
  }

  // Save results
  const geoOutputPath = path.join(
    __dirname,
    "../geo/spots_with_coords.json"
  );
  fs.writeFileSync(geoOutputPath, JSON.stringify(results, null, 2));
  console.log(`\n Geocoding complete. Saved to spots_with_coords.json`);
}

geocodeAddresses();
