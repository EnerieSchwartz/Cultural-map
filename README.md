# Cultural Map Project

An interactive map showcasing historical and cultural spots of Paris.
Users can explore museums, monuments, palaces, religious sites, bridges, districts, squares, and cemeteries — all marked with category-specific icons.

## Backend

- **Tech Stack:** Node.js, Express, MySQL
- **Location:** [`backend/`](backend/)
- **Key Features:**
  - REST API for supplier locations
  - Scripts for extracting, geocoding, and generating GeoJSON data
  - Database connection via MySQL

### Useful Scripts

- **Generate GeoJSON:**  
  Converts merged supplier data with coordinates into a GeoJSON file for mapping.

  See [`generateGeoJsonFromMerged.js`](backend/scripts/generateGeoJsonFromMerged.js).

- **Start Server:**
  npm run start


- **Environment Variables:**  
Configure database and API keys in [`backend/.env`](backend/.env).

## Frontend

- **Tech Stack:** React, Vite
- **Location:** [`frontend/`](frontend/)
- **Key Features:**
- Interactive map visualization of sights locations
- Fast refresh and modern build tooling via Vite

### Getting Started

1. **Install dependencies:**
   cd frontend
   npm install


3. **Configure environment variables:**  
See [`frontend/.env.example`](frontend/.env.example) for required variables.

## Data Files

- **Supplier Data:**  
  Located in [`backend/geo/`](backend/geo/), including:
  - `spots.json`
  - `spots_merged.json`
  - `spots_with_coords.json`
  - `spots.geojson`

## Development

- Clone the repository
- Install dependencies in both `backend` and `frontend`
- Set up environment variables as needed
- Use provided scripts for data processing

