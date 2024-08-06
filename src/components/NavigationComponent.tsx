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
    const markerLib = useMapsLibrary('marker');
    const { origin, destination, setDirectionsRenderers, navigationServiceStatus, setNavigationServiceStatus, setZoomLevel} = useStore();

    
    useEffect(() => {
        const handleZoomChange = () => {
            const newZoom = map!.getZoom();
            
            setZoomLevel(newZoom!);
          };
        const initializeMapLibraries = () => {
            
            if (map) {
                useStore.setState({map:map});
                map.addListener('zoom_changed', () => handleZoomChange());
            }
            if (routesLib) {
                useStore.setState({routesLib:routesLib});
                initializeDirectionRender();
            }
            mapsLib && useStore.setState({mapsLib:mapsLib});
            markerLib && useStore.setState({markerLib:markerLib});
        };
        const initializeDirectionRender = () => {
            const rendererOptions = {
                map: map
            };
            setDirectionsRenderers(new routesLib!.DirectionsRenderer(rendererOptions))
        }
        initializeMapLibraries();
    }, [mapsLib, map, routesLib, markerLib, setDirectionsRenderers,setZoomLevel]);

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
    }, [routesLib, map, mapsLib, origin, destination, navigationServiceStatus, setNavigationServiceStatus]);



    return <div>

    </div>;
};