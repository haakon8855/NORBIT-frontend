import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./map.css";
import SearchBar from "material-ui-search-bar";

export default function MyMap() {

    const [zoomPos, setZoomPos] = useState([63.4428578, 10.4285791])
    const [pos, setPos] = useState([[63.442858, 10.428579], [63.442850, 10.42857]]);
    const [tagId, setTagId] = useState()

    return (
        <div>
            <div>
                <SearchBar
                    style={{ marginBottom: "5vh", marginTop: "5vh" }}
                    onChange={(newValue) => console.log(newValue)}
                    onRequestSearch={(value) => setTagId(value)}
                />
            </div>
            <MapContainer style={{ height: "70vh", width: "100%" }} center={zoomPos} zoom={19} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {pos.map(s => {
                    return (
                        <Marker key={s} position={s}>
                            <Popup>
                                {s}
                            </Popup>
                        </Marker>)
                })}
            </MapContainer>

        </div>
    );
}

