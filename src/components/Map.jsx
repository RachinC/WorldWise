/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet"; 
import styles from "./Map.module.css";
import { React, useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext";
import useURLPosition from "../hooks/useURLPosition";

function Map() {
    const navigate = useNavigate();
    const {cities} = useCities();
    const [lat, lng] = useURLPosition();
    const [mapPosition, setMapPosition] = useState([40, 0]);

    useEffect(() => {
        if(lat && lng) setMapPosition([lat, lng]);
    }, [lat, lng]);

    return (
    <div className={styles.mapContainer}>
        <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
            {cities.map((city) => (
            <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                <Popup>
                    <span>{city.emoji}</span>
                    <span>{city.cityName}</span>
                </Popup>
            </Marker>
            ))}
            <ChangeCenter position={mapPosition} />
            <DetectClick />
        </MapContainer>
    </div>)
}

function ChangeCenter({position}) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvents({
        click: e => {
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
        }
    });
}

export default Map;
