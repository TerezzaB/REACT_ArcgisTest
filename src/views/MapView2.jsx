import React, { useRef, useEffect } from 'react'
import Map from "https://js.arcgis.com/4.29/@arcgis/core/Map.js";
import MapView from "https://js.arcgis.com/4.29/@arcgis/core/views/MapView.js";
import TileLayer from "https://js.arcgis.com/4.29/@arcgis/core/layers/TileLayer.js";
import Graphic from "https://js.arcgis.com/4.29/@arcgis/core/Graphic.js";
import GraphicsLayer from "https://js.arcgis.com/4.29/@arcgis/core/layers/GraphicsLayer.js";
import SpatialReference from "https://js.arcgis.com/4.29/@arcgis/core/geometry/SpatialReference.js";
import Polygon from "https://js.arcgis.com/4.29/@arcgis/core/geometry/Polygon.js";
import Point from "https://js.arcgis.com/4.29/@arcgis/core/geometry/Point.js";


export default function MapView2() {
  const mapDiv = useRef(null);

  useEffect(() => {
    // EPSG:5514 S-JTSK
    const sJTSK = new SpatialReference({ wkid: 5514 });

    // Približný stred Slovenska v 5514 (napr. pri Kremnici)
    const centerSJTSK = [-350000, -1200000]; // X, Y - approximate center of Slovakia

    // 50ha je 500x1000m alebo napr. štvorec ~707x707m (707^2 ≈ 500000)
    const half = 35300.55;
    const polygon = new Polygon({
      rings: [
        [
          [centerSJTSK[0] - half, centerSJTSK[1] - half],
          [centerSJTSK[0] + half, centerSJTSK[1] - half],
          [centerSJTSK[0] + half, centerSJTSK[1] + half],
          [centerSJTSK[0] - half, centerSJTSK[1] + half],
          [centerSJTSK[0] - half, centerSJTSK[1] - half]
        ]
      ],
      spatialReference: sJTSK
    });
    const point = new Point({
      x: centerSJTSK[0],
      y: centerSJTSK[1],
      spatialReference: sJTSK
    });
    // ZBGIS Map Layer
    const zbgisLayer = new TileLayer({
      url: "https://hmodel.esprit-bs.sk/server/rest/services/vodstvo/MapServer"
    });

    // Polygon graphic
    const graphicsLayer = new GraphicsLayer({
      graphics: [
        new Graphic({
          geometry: point,
          symbol: {
            type: "simple-marker",
            color: [255, 69, 0],
            size: "25px",
            outline: {
              color: [255, 255, 255],
              width: 2
            }
          },
          attributes: {
            name: "Center point"
          }
        }),
        new Graphic({
          geometry: polygon,
          symbol: {
            type: "simple-fill",
            color: [227, 139, 79, 0.4],
            outline: {
              color: [255, 69, 0],
              width: 3
            }
          },
          attributes: {
            name: "Polygon"
          }
        })
      ]
    });

    // Map & View
    const map = new Map({
      basemap: "topo-vector",
      layers: [zbgisLayer, graphicsLayer]
    });

    const view = new MapView({
      container: mapDiv.current,
      map: map,
      spatialReference: sJTSK,
      center: centerSJTSK,
      zoom: 22 // maximálne podporované priblíženie
    });

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, []);

  return (
    <div ref={mapDiv} style={{ width: "56vw", height: "100vh" }}></div>
  )
}
