/* eslint-disable @typescript-eslint/no-unused-vars */
import useStore from '../store';
import { location } from '../Type';
import { plotIntersection } from './plot';
import { getPosition } from './getPosition';
const directionsRouteToLatLngArray = (route: google.maps.DirectionsRoute) => {
    return route.legs.flatMap(leg =>
        leg.steps.flatMap(step =>
            step.path.map(latLng => ({ lat: latLng.lat(), lng: latLng.lng() }))
        )
    );
};

export const getDirections = async (start: location, end: location) => {
    const { routesLib, directionsRenderers, setLatLngLiteralArray, setCurrentDirectionsRoute } = useStore.getState();
    if (!routesLib) {
        throw new Error('Routes library is not initialized.');
    }

    const directionsService = new routesLib.DirectionsService();
    const directionsRequest = {
        destination: end,
        origin: start,
        travelMode: google.maps.TravelMode.WALKING,
    };

    return new Promise<void>((resolve, reject) => {
        directionsService.route(directionsRequest, (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus) => {
            if (status === google.maps.DirectionsStatus.OK) {
                if (result) {
                    directionsRenderers!.setDirections(result);
                    setCurrentDirectionsRoute(result.routes[0]);
                    const latLngArray = directionsRouteToLatLngArray(result.routes[0]);
                    setLatLngLiteralArray(latLngArray);
                    resolve();
                } else {
                    console.error(new Error('No directions found.'));
                    reject(new Error('No directions found.'));
                }
            } else {
                console.error('Directions request failed due to ' + status);
                reject(new Error('Directions request failed due to ' + status));
            }
        });
    });
};

export const navigationServiceStart = async () => {
    const {destination} = useStore.getState();
    const start = { lat: 40.713536, lng: -74.011223 };
    const end = { lat: 40.7284405, lng: -74.0 };
    // await getDirections(start, end);
    const home = await getPosition();
    if (destination){
        console.log(home, destination)
        await getDirections(home, destination);
    }
    
    
    // await plotIntersection();
};


