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
    const { origin, destination, setMapsLib, setMap, setRoutesLib, setDirectionsRenderers, navigationServiceStatus, setNavigationServiceStatus, setZoomLevel} = useStore();

    
    useEffect(() => {
        const handleZoomChange = () => {
            const newZoom = map!.getZoom();
            
            setZoomLevel(newZoom!);
          };
        const initializeMapLibraries = () => {
            if (mapsLib) setMapsLib(mapsLib);
            if (map) {
                setMap(map);
                map.addListener('zoom_changed', () => handleZoomChange());
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
    }, [mapsLib, map, routesLib, setMapsLib, setMap, setRoutesLib, setDirectionsRenderers,setZoomLevel]);

    useEffect(() => {
        const startNavigationService = async () => {
            if (!routesLib || !map || !mapsLib) return;
            
            if (navigationServiceStatus == NavigationStatus.NotStarted) {
                map.setCenter(origin!);
                // map.setZoom(13)
            }
            if (origin && destination) {
                if (navigationServiceStatus == NavigationStatus.NotStarted) {
                    await navigationServiceStart(origin, destination);
                    setNavigationServiceStatus(NavigationStatus.InProgress)
                }
            }
        };
        startNavigationService();
    }, [routesLib, map, mapsLib, setMap, origin, destination, navigationServiceStatus, setNavigationServiceStatus]);



    return <div>

    </div>;
};