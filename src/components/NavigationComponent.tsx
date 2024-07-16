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
    const { origin, destination, setMapsLib, setMap, setRoutesLib, setDirectionsRenderers, navigationServiceStatus, setNavigationServiceStatus } = useStore();
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
            if (navigationServiceStatus == NavigationStatus.NotStarted) {
                map.setCenter(origin!);
                map.setZoom(13)
            }
            // console.log("startNavigationService",destination)
            // console.log("startNavigationService",origin)
            console.log(navigationServiceStatus )
            if (origin && destination) {
                if (navigationServiceStatus == NavigationStatus.NotStarted) {
                    setNavigationServiceStatus(NavigationStatus.InProgress)
                    await navigationServiceStart(origin, destination);
                    console.log("startNavigationService")
                }

            }
        };
        startNavigationService();
    }, [routesLib, map, mapsLib, setMap, origin, destination, navigationServiceStatus, setNavigationServiceStatus]);



    return <div>

    </div>;
};