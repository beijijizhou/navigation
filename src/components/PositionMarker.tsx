import React, { useEffect, useState } from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import useStore from '../store';

export const PositionMarker = () => {
    const { origin, map, setOrigin } = useStore((state) => state);
    const [watchId, setWatchId] = useState<number | null>(null);
    let watchTimes = 0

    const startTime = new Date().getTime();

    const successCallback = (position: GeolocationPosition) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const newOrigin = { lat: latitude, lng: longitude };
        setOrigin(newOrigin);
        if (watchTimes === 0 && map) {
            
            map.setCenter(newOrigin);
        }
        watchTimes ++;
        const endTime = new Date().getTime();
        const elapsedTime = endTime - startTime;
        console.log('Task took ' + elapsedTime + ' milliseconds');
        console.log(newOrigin);
        console.log('Watch times ' + watchTimes);
    };

    const errorCallback = (error: GeolocationPositionError) => {
        console.error('Error getting position:', error.message);
    };

    const startWatchingPosition = () => {
        if (!navigator.geolocation) {
            console.error('Geolocation is not supported by this browser.');
            return;
        }

        const id = navigator.geolocation.watchPosition(successCallback, errorCallback, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
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
        if (map) {
            startWatchingPosition();
        }

        return () => {
            stopWatchingPosition();
        };
    }, [map]); // Ensure effect runs correctly with required dependencies
    useEffect(() => {
        console.log('Origin updated:', origin); // Log whenever origin updates
    }, [origin]);
    return (
        <div>
            {origin ? <AdvancedMarker position={origin} /> : <p>
                {origin}
                </p>}
        </div>
    );
};
