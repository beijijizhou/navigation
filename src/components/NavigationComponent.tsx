/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps';
import { PositionMarker } from './PositionMarker';
import useStore from '../store';
import Boardcast from './Boardcast';
import { navigationServiceStart } from '../NavigationService/navigationService';
// import SpeechSynthesis from './SpeechSynthesis';
// const start = { lat: 40.713536, lng: -74.011223 };
// const end = { lat: 40.7284405, lng: -74.0 };
export const NavigationComponent = () => {
    const routesLib = useMapsLibrary('routes');
    const map = useMap();
    const mapsLib = useMapsLibrary('maps');
    const { destination, currentDirectionsRoute,setMapsLib, setMap, setRoutesLib, setDirectionsRenderers,} = useStore();
    useEffect(() => {
        const initializeMapLibraries = () => {
            if (mapsLib) setMapsLib(mapsLib);
            if (map) setMap(map);
            if (routesLib) {
                setRoutesLib(routesLib);
                initializeDirectionRender();
            }

        };
        const initializeDirectionRender = () => {
            const rendererOptions = {
                map: map
            };
            setDirectionsRenderers(new routesLib!.DirectionsRenderer(rendererOptions))
        }
        initializeMapLibraries();
    }, [mapsLib, map, routesLib, setMapsLib, setMap, setRoutesLib,setDirectionsRenderers]);

    useEffect(() => {
        if (!routesLib || !map || !mapsLib) return;
        navigationServiceStart();
    }, [routesLib, map, mapsLib, setMap, destination]);



    return <div>
        {map && <PositionMarker></PositionMarker>}
        {/* {currentDirectionsRoute && <Boardcast/>} */}
    </div>;
};