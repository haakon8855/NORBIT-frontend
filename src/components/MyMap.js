import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./map.css";
import SearchBar from "material-ui-search-bar";
import * as L from "leaflet";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function MyMap() {

    const LeafIcon = L.Icon.extend({
        options: {}
    });

    const redIcon = new LeafIcon({
        iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png"
    }),
        greenIcon = new LeafIcon({
            iconUrl:
                "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png"
        }),
        goldIcon = new LeafIcon({
            iconUrl:
                "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png"
        }),
        blueIcon = new LeafIcon({
            iconUrl:
                "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png"
        })
        ;

    const [zoomPos, setZoomPos] = useState([63.4428578, 10.4285791])
    const [locatorPos, setlocatorPos] = useState([[63.442825, 10.429364], [63.442726, 10.428931], [63.442448, 10.428817], [63.442600, 10.428421], [63.442340, 10.428265], [63.442307, 10.428762]]);
    const [tagId, setTagId] = useState()
    const [beaconPos, setBeaconPos] = useState([[63.442775, 10.429274], [null, null]])
    const [beaconPosMulti, setBeaconPosMulti] = useState([[63.442715, 10.429214]])
    const [beaconPosFingerPrinting, setBeaconPosFingerPrinting] = useState([[63.442725, 10.429264]])
    const [showMulti, setShowMulti] = useState(false)
    const [showFingerPrint, setShowFingerPrint] = useState(true)
    const [showLoactors, setShowLocators] = useState(true)
    const [showBeaconPos, setShowBeaconPos] = useState(false)


    const onClickMulti = () => setShowMulti(showMulti => !showMulti)
    const onClickFingerPrint = () => setShowFingerPrint(showFingerPrint => !showFingerPrint)
    const onClickLocators = () => setShowLocators(showLoactors => !showLoactors)
    const onClickBeaconPos = () => setShowBeaconPos(showBeaconPos => !showBeaconPos)

    return (
        <div>
            <div>
                <SearchBar
                    style={{ marginBottom: "5vh", marginTop: "5vh" }}
                    onChange={(newValue) => console.log(newValue)}
                    onRequestSearch={(value) => setTagId(value)}
                />
            </div>
            <MapContainer style={{ height: "70vh", width: "100%" }} center={zoomPos} zoom={18} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maxNativeZoom={19}
                    maxZoom={25}
                />
                {showBeaconPos ?
                    beaconPos.filter(s => s[0] != null || s[1] != null).map(s => {
                        return (
                            <Marker key={s} position={s} icon={blueIcon}>
                                <Popup>
                                    {s[0] + ' ' + s[1]}
                                </Popup>
                            </Marker>)
                    }) : null}
                {showLoactors ?
                    locatorPos.filter(s => s[0] != null || s[1] != null).map(s => {
                        return (
                            <Marker key={s} position={s} icon={greenIcon}>
                                <Popup>
                                    {s[0] + ' ' + s[1]}
                                </Popup>
                            </Marker>)
                    }) : null}

                {showMulti ?
                    beaconPosMulti.filter(s => s[0] != null || s[1] != null).map(s => {
                        return (
                            <Marker key={s} position={s} icon={redIcon}>
                                <Popup>
                                    {s[0] + ' ' + s[1]}
                                </Popup>
                            </Marker>)
                    }) : null}

                {showFingerPrint ?
                    beaconPosFingerPrinting.filter(s => s[0] != null || s[1] != null).map(s => {
                        return (
                            <Marker key={s} position={s} icon={goldIcon}>
                                <Popup>
                                    {s[0] + ' ' + s[1]}
                                </Popup>
                            </Marker>)
                    }) : null}

            </MapContainer>
            <Stack direction="row" spacing={2} style={{ marginTop: '1%', justifyContent: 'center' }}>
                <Button variant="contained" onClick={onClickFingerPrint} style={{ backgroundColor: '#C1A32D' }}>Fingerprinting</Button>
                <Button variant="contained" onClick={onClickMulti} style={{ backgroundColor: '#982E40' }} >Multilateration</Button>
                <Button variant="contained" onClick={onClickBeaconPos} >Realpostion</Button>
                <Button variant="contained" onClick={onClickLocators} style={{ backgroundColor: '#31882A' }}>Locators</Button>
            </Stack>

        </div>
    );
}

