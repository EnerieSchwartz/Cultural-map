import { useEffect } from "react";
import * as maplibregl from "maplibre-gl";
import ReactDOMServer from "react-dom/server";
import SpotPopup from "../SpotPopup/SpotPopup";
import "./SpotMarkers.css";

export default function SpotMarkers({ map, geojson }) {
  useEffect(() => {
    if (!map || !geojson) return;

    let markers = [];

    function addClusterLogic() {
      if (map.getSource("spots")) return;

      map.addSource("spots", {
        type: "geojson",
        data: geojson,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      // Add cluster circles
      map.addLayer({
        id: "clusters",
        type: "circle",
        source: "spots",
        filter: ["has", "point_count"],
        paint: {
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#89CFF0", // light blue for small clusters
            10,
            "#4B93CF", // medium blue
            50,
            "#1D4E89", // dark blue for big clusters
          ],
          "circle-radius": ["step", ["get", "point_count"], 20, 10, 28, 50, 36],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#ffffff",
        },
      });

      map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "spots",
        filter: ["has", "point_count"],
        layout: {
          "text-field": ["get", "point_count"],
          "text-font": ["Arial Unicode MS Regular"],
          "text-size": 14,
        },

        paint: {
          "text-color": "#ffffff",
        },
      });
      map.on("data", (e) => {
        if (e.sourceId === "spots" && e.isSourceLoaded) {
          const source = map.getSource("spots");
          if (source && source._data) {
            console.log("Cluster source data loaded:", source._data);
          }
        }
      });

      map.on("click", "clusters", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });

        const clusterId = features[0].properties.cluster_id;

        map
          .getSource("spots")
          .getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;

            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom,
            });
          });
      });

      map.on("mouseenter", "clusters", () => {
        map.getCanvas().style.cursor = "pointer";
      });
      map.on("mouseleave", "clusters", () => {
        map.getCanvas().style.cursor = "";
      });

      //Render unclustered HTML markers (like before)
      geojson.features.forEach((feature) => {
        if (feature.properties.point_count) return; // skip clustered points

        const { coordinates } = feature.geometry;
        const spot = feature.properties;

        const markerElement = createMarkerElement();
        const popupContent = createPopupHTML(spot);
        const popup = new maplibregl.Popup({
          offset: 20,
          className: "spot-details-popup",
        }).setHTML(popupContent);

        const marker = new maplibregl.Marker({ element: markerElement })
          .setLngLat(coordinates)
          .setPopup(popup)
          .addTo(map);

        markers.push(marker);
      });
    }

    if (map.isStyleLoaded()) {
      addClusterLogic();
    } else {
      map.once("style.load", addClusterLogic);
    }

    return () => {
      markers.forEach((marker) => marker.remove());
      if (map.getLayer("clusters")) map.removeLayer("clusters");
      if (map.getLayer("cluster-count")) map.removeLayer("cluster-count");
      if (map.getSource("spots")) map.removeSource("spots");
    };
  }, [map, geojson]);

  return null;
}

function createMarkerElement() {
  const el = document.createElement("div");
  el.className = "spot-dot";
  return el;
}

function createPopupHTML(spot) {
  return ReactDOMServer.renderToString(<SpotPopup spot={spot} />);
}
