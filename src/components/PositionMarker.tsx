/* eslint-disable @typescript-eslint/no-unused-vars */

import /*React,*/ { useEffect, useState } from 'react';
import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import useStore from '../store';
import Broadcast from './Broadcast/Broadcast';
import { originURL } from '../assets/icon';
export const PositionMarker = () => {
    const { origin, map, setOrigin } = useStore((state) => state);

    const [watchId, setWatchId] = useState<number | null>(null);
    let watchTimes = 0
    const startTime = new Date().getTime();


    useEffect(() => {

    }, [origin])
    useEffect(() => {
        const successCallback = (position: GeolocationPosition) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const newOrigin = { lat: latitude, lng: longitude };
            setOrigin(newOrigin);
            // map!.setCenter(newOrigin);
            watchTimes++;
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
                maximumAge: 100, timeout: 100, enableHighAccuracy: true
            });

            setWatchId(id);
        };

        const stopWatchingPosition = () => {
            if (watchId !== null) {
                navigator.geolocation.clearWatch(watchId);
                setWatchId(null);
            }
        };
        if (map) {
            startWatchingPosition();
        }
        return () => {
            stopWatchingPosition();
        };
    }, [map]); // Ensure effect runs correctly with required dependencies

    return (
        <h1 id="positionMarker" style={{ width: '100%' }}>


            {origin ?
                (
                    <div>
                        <p style={{ fontSize: '12px' }}>
                            Current position at<br />
                            Lat: {origin.lat}<br />
                            Lng: {origin.lng}
                        </p>
                        <AdvancedMarker position={origin} >
                            <img src={originURL} width={32} height={32} />
                            <Pin
                                background={'#0f9d58'}
                                borderColor={'#006425'}
                                glyphColor={'#60d98f'}
                            />
                        </AdvancedMarker>
                        <Broadcast></Broadcast>
                    </div>

                )
                : <p></p>}
        </h1>
    );
};
