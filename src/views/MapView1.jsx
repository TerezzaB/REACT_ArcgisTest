import React from "react";
import "@arcgis/map-components/dist/components/arcgis-map";

export default function MapView1() {
  return (
    <div className="w-full h-[600px]">
      <arcgis-map
        item-id="d5dda743788a4b0688fe48f43ae7beb9"
        style={{ height: "100%", width: "100%" }}
      >
        {/* Point */}
        <arcgis-graphic
          geometry='{"type":"point","longitude":17.1077,"latitude":48.1486}'
          symbol='{"type":"simple-marker","color":"red","size":14}'
        ></arcgis-graphic>
        {/* Line */}
        <arcgis-graphic
          geometry='{"type":"polyline","paths":[[[17.1,48.14],[17.12,48.15],[17.13,48.13]]]}'
          symbol='{"type":"simple-line","color":"blue","width":3}'
        ></arcgis-graphic>
        {/* Polygon */}
        <arcgis-graphic
          geometry='{"type":"polygon","rings":[[[17.105,48.147],[17.11,48.147],[17.11,48.15],[17.105,48.15],[17.105,48.147]]]}'
          symbol='{"type":"simple-fill","color":[0,255,0,0.3],"outline":{"color":"green","width":2}}'
        ></arcgis-graphic>
      </arcgis-map>
    </div>
  );
}

