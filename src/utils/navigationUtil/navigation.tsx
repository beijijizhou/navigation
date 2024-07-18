/* eslint-disable @typescript-eslint/no-unused-vars */
import * as turf from "@turf/turf";
function convertMetersToFeet(meters: number): number {
  const feetPerMeter = 3280.84;
  const distanceInFeet = meters * feetPerMeter;
  const roundedDistance = Math.round(distanceInFeet / 10) * 10;
  return roundedDistance;
  
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


export const calculateDurationToCurrentEndLocation = (distanceInFeet: number): number => {
  const feetPerMile = 5280;
  const averageWalkingSpeedMph = 3.1; // average walking speed in miles per hour

  // Convert distance to miles
  const distanceInMiles = distanceInFeet / feetPerMile;

  // Calculate time in hours
  const timeInHours = distanceInMiles / averageWalkingSpeedMph;

  // Convert time to seconds
  const timeInSeconds = timeInHours * 3600;

  return Math.round(timeInSeconds);
};

export const calculateRemainingTime = (stepIndex:number,RemainingTimeToEndLocation:number, durationTable:Array<number>) =>{
  if (stepIndex == durationTable.length - 1){
    return RemainingTimeToEndLocation
  }
  console.log()
  return durationTable[stepIndex + 1] + RemainingTimeToEndLocation
}
export const createDurationTableInSecs = (leg: google.maps.DirectionsLeg) => {
  let duration = 0;
  const len = leg.steps.length;
  const durationTable = new Array<number>(len);

  for (let i = 0; i < len; i++) {
    duration += leg.steps[i].duration!.value; 
    durationTable[i] = duration
  }
  return durationTable.reverse();
};
export const convertTime = (duration: number): string => {
  const durationInMinutes = Math.ceil(duration / 60); // convert to minutes
  let formattedTime = "";

  // Format duration as "X mins" or "Y hrs Z mins"
  if (durationInMinutes < 60) {
    formattedTime = `${durationInMinutes} ${durationInMinutes === 1 ? 'min' : 'mins'}`;
  } else {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    const hourString = `${hours} ${hours === 1 ? 'hr' : 'hrs'}`;
    const minuteString = minutes > 0 ? ` ${minutes} ${minutes === 1 ? 'min' : 'mins'}` : '';
    formattedTime = `${hourString}${minuteString}`;
  }

  return formattedTime;
};

export const getEndLocation = (legs: google.maps.DirectionsLeg, stepIndex:number) => {
  const lat = legs!.steps[stepIndex].end_location.lat()
  const lng = legs!.steps[stepIndex].end_location.lng()
  const end_location = {
    lat,
    lng
  }
  return end_location
}
