import React, { useEffect, useState } from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import useStore from '../store';

export const PositionMarker: React.FC = () => {
    const [currentPosition, setCurrentPosition] = useState<google.maps.LatLngLiteral | null>(null);
    const [watchId, setWatchId] = useState<number | null>(null);
    const map = useStore((state) => state.Map);
    const startTime = new Date().getTime();
    let watchTimes = 0;
    const successCallback = (position: GeolocationPosition) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const origin = { lat: latitude, lng: longitude }
        setCurrentPosition(origin);
        map!.setCenter(origin)
        watchTimes ++;
        const endTime = new Date().getTime();
        const elapsedTime = endTime - startTime;
        console.log('Task took ' + elapsedTime + ' milliseconds');
        console.log(origin)
        console.log("Watch times "+ watchTimes)
    };

    const errorCallback = (error: GeolocationPositionError) => {
        console.error('Error getting position:', error.message);
        // Handle the error
    };

    const startWatchingPosition = () => {
        const id = navigator.geolocation.watchPosition(successCallback, errorCallback, {
            enableHighAccuracy: true,
            timeout: 50,
            maximumAge: 0
        });
    
        setWatchId(id);
    };

    const stopWatchingPosition = () => {
        if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
            setWatchId(null);
        }
    };

    useEffect(() => {

        if (map){
            
            startWatchingPosition();
        }
    
        return () => {
            stopWatchingPosition();
        };
    }, [map]); // Empty dependency array ensures effect runs only on mount and unmount

    return (
        <AdvancedMarker position={currentPosition}>
           

        </AdvancedMarker>
    );
};


