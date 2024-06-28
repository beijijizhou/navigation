import React, { useEffect, useState } from 'react';
import { useMapsLibrary, useMap } from '@vis.gl/react-google-maps';
import { getOrigin } from '../Navigation/getOrigin';
import useStore from '../store';
import { NavigationManager } from '../Navigation/NavigationManager';
const start = { lat: 40.713536, lng: -74.011223 };
const end = { lat: 40.7284405, lng: -74.0 };

export const RoutesComponent = () => {
    // const [routes, setRoutes] = useState(null);
    const [navigationManager, setNavigationManager] = useState<NavigationManager | null>(null)
    const routesLib = useMapsLibrary('routes');
    const map = useMap();
    const mapsLib = useMapsLibrary('maps');

    const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null)
    const destination = useStore((state) => state.destination);
    // const setUserInput = useStore((state) => state.setUserInput);
    useEffect(() => {
        const startService = async () => {
            if (!routesLib || !map || !mapsLib) return;
            if (!navigationManager) {
                initializeNavigationManager();
                return;
            }
            if (!origin) {
                await initializeOrigin();
            }
            await navigation();
        };
        const navigation = async () =>{
            if (!destination) {
                
                await defaultRoute()
            } else {
                
                await testingRoute()
            }
        }
        const defaultRoute = async () => {
            await navigationManager!.navigationService(start, end);
        }
        const testingRoute = async () =>{
            
            await navigationManager!.navigationService(origin!, end);
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
    }, [routesLib, map, mapsLib, origin, navigationManager, destination]);

    return <div>


    </div>;
};