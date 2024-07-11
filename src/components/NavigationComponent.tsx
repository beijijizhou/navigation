/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps';
import useStore from '../store';
import { navigationServiceStart } from '../NavigationService/navigationService';
import { NavigationStatus } from '../store/useNavigationSlice';
export const NavigationComponent = () => {
    const routesLib = useMapsLibrary('routes');
    const map = useMap();
    const mapsLib = useMapsLibrary('maps');
    const { destination, setMapsLib, setMap, setRoutesLib, setDirectionsRenderers, navigationServiceStatus } = useStore();
    useEffect(() => {
        const initializeMapLibraries = () => {
            if (mapsLib) setMapsLib(mapsLib);
            if (map) {
                setMap(map);
            }
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
    }, [mapsLib, map, routesLib, setMapsLib, setMap, setRoutesLib, setDirectionsRenderers]);

    useEffect(() => {
        const startNavigationService = async () => {
            if (!routesLib || !map || !mapsLib) return;
            const bmcc = { lat: 40.713536, lng: -74.011223 };
            const goldenDinner = { lat: 40.7284405, lng: -74.0 };
            // await getDirections(start, end);
            const home = {lat: 40.7898531, lng: -73.8078768}
            const crossStreet = { lat: 40.7898507, lng: -73.807 };
            const neighbor = { lat: 40.7919567, lng: -73.8173405 }

            await navigationServiceStart(home, neighbor);
            
            // if (navigationServiceStatus == NavigationStatus.InProgress) {
            //     await navigationServiceStart(home, destination);
            // }

        };

        startNavigationService();
    }, [routesLib, map, mapsLib, setMap, destination, navigationServiceStatus]);



    return <div>

    </div>;
};