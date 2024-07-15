import * as turf from "@turf/turf";
function convertMetersToFeet(meters: number): number {
  const feetPerMeter = 3280.84;
  return meters * feetPerMeter;
}
export const calculateDurationInMinutes = (distanceInFeet: number, averageSpeedInMph = 3.1) => {
  const distanceInMiles = distanceInFeet / 5280; // Convert feet to miles
  const durationInHours = distanceInMiles / averageSpeedInMph; // Calculate hours
  return durationInHours * 60; // Convert hours to minutes
};
export const calculateDistanceToCurrentEndLocation = (endLocation: google.maps.LatLngLiteral, origin: google.maps.LatLngLiteral) => {
  const currentPoint = turf.point([origin.lng, origin.lat]);
  const endPoint = turf.point([endLocation.lng, endLocation.lat]);
  const d = turf.distance(currentPoint, endPoint)

  return convertMetersToFeet(d)
}
export const calculateDuration = (stepIndex: number, leg: google.maps.DirectionsLeg) => {
  // let duration = 0
  for (let i = stepIndex; i < leg.steps.length; i++) {
    console.log(leg.steps[stepIndex].duration?.text);
  }
}
// export const timeTable(stepIndex: number){

// }