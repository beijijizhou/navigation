import React, { useEffect, useState } from 'react';
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps';
import { PositionMarker } from './PositionMarker';
import { getOrigin } from '../Navigation/getCurrentPosition';
import useStore from '../store';
import { NavigationManager } from '../Navigation/NavigationManager';
const start = { lat: 40.713536, lng: -74.011223 };
const end = { lat: 40.7284405, lng: -74.0 };
export const RoutesComponent = () => {
    const [navigationManager, setNavigationManager] = useState<NavigationManager | null>(null)
    const routesLib = useMapsLibrary('routes');
    const map = useMap();

    const mapsLib = useMapsLibrary('maps');
    const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null)
    const destination = useStore((state) => state.destination);
    const setMap = useStore((state => state.setMap))
    useEffect(() => {
        const startService = async () => {
            if (map) {
                setMap(map);
            }
            if (!routesLib || !map || !mapsLib) return;
            if (!navigationManager) {
                // 
                return;
            }
            initializeNavigationManager();
            if (!origin) {
                await initializeOrigin();
            }
            await navigation();
            // console.log(navigationManager.currentDirectionsRoute)
        };
        const navigation = async () => {
            if (!destination) {
                await defaultRoute()
            } else {
                await testingRoute()
            }
        }
        const defaultRoute = async () => {
            await navigationManager!.navigationService(start, end);
        }
        const testingRoute = async () => {
            await navigationManager!.navigationService(origin!, destination);
        }
        const initializeNavigationManager = () => {
            const newNavManager = new NavigationManager(map!, mapsLib!, routesLib!);
            setNavigationManager(newNavManager);
        };

        const initializeOrigin = async () => {
            const location = await getOrigin();
            setOrigin(location);
        };
        startService();
    }, [routesLib, map, mapsLib, origin, navigationManager, destination, setMap]);

    return <div>
        {map && <PositionMarker></PositionMarker>}

    </div>;
};