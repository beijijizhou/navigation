import * as turf from "@turf/turf";
function convertMetersToFeet(meters: number): number {
    const feetPerMeter = 3280.84;
    return meters * feetPerMeter;
  }
export const calculateDistance = (endLocation: google.maps.LatLngLiteral, origin: google.maps.LatLngLiteral) => {
    const currentPoint = turf.point([origin.lng, origin.lat]);
    const endPoint = turf.point([endLocation.lng, endLocation.lat]);
    const d = turf.distance(currentPoint, endPoint)
    return convertMetersToFeet(d)
}