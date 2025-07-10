"use client";

import L from "leaflet";
import React, { useEffect, useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";
import Flag from "react-world-flags";
import dynamic from "next/dynamic";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

type Props = {
  center?: number[];
  locationValue?: string;
};

function MapComponent({ center, locationValue }: Props) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const defaultCenter = (center as L.LatLngExpression) || [51, -0.09];
    const defaultZoom = center ? 4 : 2;

    mapRef.current = L.map(containerRef.current).setView(defaultCenter, defaultZoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapRef.current);

    if (center) {
      const marker = L.marker(center as L.LatLngExpression).addTo(mapRef.current);
      if (locationValue) {
        const popupContent = document.createElement('div');
        popupContent.className = 'flex justify-center items-center animate-bounce';
        const flag = document.createElement('img');
        flag.src = `https://flagcdn.com/${locationValue.toLowerCase()}.svg`;
        flag.className = 'w-10';
        popupContent.appendChild(flag);
        marker.bindPopup(popupContent);
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [center, locationValue]);

  return <div ref={containerRef} className="h-[35vh] rounded-lg" />;
}

// Create a dynamic map component that only renders on the client
const MapWithNoSSR = dynamic(() => Promise.resolve(MapComponent), {
  ssr: false,
  loading: () => <div className="h-[35vh] rounded-lg bg-neutral-200 animate-pulse" />
});

// Export the no-SSR version
export default function Map(props: Props) {
  return <MapWithNoSSR {...props} />;
}
