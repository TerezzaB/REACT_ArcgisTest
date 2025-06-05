import React, { useRef, useEffect, useState } from 'react'
import Map from "https://js.arcgis.com/4.29/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.29/@arcgis/core/views/MapView.js";
import Graphic from "https://js.arcgis.com/4.29/@arcgis/core/Graphic.js";
import GraphicsLayer from "https://js.arcgis.com/4.29/@arcgis/core/layers/GraphicsLayer.js";
import Polygon from "https://js.arcgis.com/4.29/@arcgis/core/geometry/Polygon.js";


export default function MapView3() {
  const mapDiv = useRef(null);
  const [_, setRerender] = useState(0); // na vynútenie rerenderu tlačidla

  useEffect(() => {
    const center = [17.1077, 48.1486]; // Bratislava, WGS84

    const graphicsLayer = new GraphicsLayer();

    // Map & View
    const map = new Map({
      basemap: "topo-vector",
      layers: [graphicsLayer]
    });

    const view = new MapView({
      container: mapDiv.current,
      map: map,
      center: center,
      zoom: 13
    });

    // Uchovávajte body polygonu
    let polygonPoints = [];

    // Handler na kliknutie
    function handleClick(event) {
      const point = view.toMap({ x: event.x, y: event.y });
      if (!point) return;
      polygonPoints.push([point.longitude, point.latitude]);
      // Vymaž starý polygon
      graphicsLayer.removeMany(graphicsLayer.graphics.filter(g => g.attributes && g.attributes.name === "UserPolygon"));
      // Ak sú aspoň 3 body, vykresli polygon
      if (polygonPoints.length >= 3) {
        const polygon = new Polygon({
          rings: [polygonPoints.concat([polygonPoints[0]])],
          spatialReference: { wkid: 4326 }
        });
        const polygonGraphic = new Graphic({
          geometry: polygon,
          symbol: {
            type: "simple-fill",
            color: [0, 200, 255, 0.2],
            outline: { color: [0, 200, 255], width: 2 }
          },
          attributes: { name: "UserPolygon" }
        });
        graphicsLayer.add(polygonGraphic);
      }
      // Pridaj bod
      const pointGraphic = new Graphic({
        geometry: point,
        symbol: {
          type: "simple-marker",
          color: [255, 69, 0],
          size: "12px",
          outline: { color: [255, 255, 255], width: 1 }
        }
      });
      graphicsLayer.add(pointGraphic);
    }

    view.on("click", handleClick);

    // Reset funkcia
    window.resetPolygon = () => {
      polygonPoints = [];
      graphicsLayer.removeAll();
      setRerender(r => r + 1); // vynúti rerender na zobrazenie tlačidla
    };

    return () => {
      view.destroy();
      window.resetPolygon = undefined;
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "50vw", height: "100vh" }}>
      <div ref={mapDiv} style={{ width: "100%", height: "100%" }}></div>
      <button
        style={{
          position: "absolute",
          top: 10,
          left: 60,
          zIndex: 10,
          padding: "7px 14px",
          background: "magenta",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "1rem",
          border: "none",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          cursor: "pointer",
          letterSpacing: "1px"
        }}
        onClick={() => window.resetPolygon && window.resetPolygon()}
      >
        Reset polygon
      </button>
    </div>
  )
}
