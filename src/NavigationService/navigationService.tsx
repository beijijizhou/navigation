import useStore from '../store';
import { locationType } from '../Type';
const directionsRouteToLatLngArray = (route: google.maps.DirectionsRoute) => {
    return route.legs.flatMap(leg =>
        leg.steps.flatMap(step =>
            step.path.map(latLng => ({ lat: latLng.lat(), lng: latLng.lng() }))
        )
    );
};

const getDirections = async (start: locationType, end: locationType) => {
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
                    // console.log(result.routes[0])
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

export const navigationServiceStart = async (origin:locationType, destination:locationType) => {
    await getDirections(origin, destination);
};


