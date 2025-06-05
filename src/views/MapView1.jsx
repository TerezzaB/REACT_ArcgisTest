import React from "react";
import "@arcgis/map-components/dist/components/arcgis-map";

export default function MapView1() {
  return (
    <div className="w-full h-[600px]">
      <arcgis-map
        item-id="d5dda743788a4b0688fe48f43ae7beb9"
        style={{ height: "100%", width: "100%" }}
      >
      </arcgis-map>
    </div>
  );
}

