/* eslint-disable @typescript-eslint/no-unused-vars */
import * as turf from "@turf/turf";
import { LookUpTableType } from "../../Type";

export const calculateDistanceToCurrentEndLocation = (endLocation: google.maps.LatLngLiteral, origin: google.maps.LatLngLiteral) => {
  const currentPoint = turf.point([origin.lng, origin.lat]);
  const endPoint = turf.point([endLocation.lng, endLocation.lat]);
  const d = turf.distance(currentPoint, endPoint)
  
  const roundedDistance = Math.round(d * 1000 / 10) * 10;
  return roundedDistance
}


export const calculateDurationToCurrentEndLocation = (distanceInMeters: number): number => {
  const averageWalkingSpeedMetersPerSecond = 1.4; // average walking speed in meters per second
  // Calculate time in seconds
  const timeInSeconds = distanceInMeters / averageWalkingSpeedMetersPerSecond;
  return Math.round(timeInSeconds);
};

export const calculateRemainingTime = (stepIndex: number, RemainingTimeToEndLocation: number, durationTable: Array<number>) => {
  if (stepIndex == durationTable.length - 1) {
    return RemainingTimeToEndLocation
  }
  return durationTable[stepIndex + 1] + RemainingTimeToEndLocation
}
export const createLookUpTable = (leg: google.maps.DirectionsLeg, type: string) => {
  let duration = 0;
  const len = leg.steps.length;
  const lookUpTable = new Array<number>(len);
  for (let i = 0; i < len; i++) {
    if (type == LookUpTableType.Time) {
      duration += leg.steps[i].duration!.value;
    }
    else{
      duration += leg.steps[i].distance!.value;
      console.log(leg.steps[i].distance)
    }
    lookUpTable[i] = duration
  }
  
  return lookUpTable.reverse();
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

export const getEndLocation = (legs: google.maps.DirectionsLeg, stepIndex: number) => {
  const lat = legs!.steps[stepIndex].end_location.lat()
  const lng = legs!.steps[stepIndex].end_location.lng()
  const end_location = {
    lat,
    lng
  }
  return end_location
}
