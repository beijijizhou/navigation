/* eslint-disable @typescript-eslint/no-unused-vars */
import { LandmarkType, PedestrianRampwayType, LngLatPoint, LandMarkGeometry } from "../Type";
import useStore from "../store";
import { AdvancedMarker } from '@vis.gl/react-google-maps';
// import { WKBArrayToMultiPolygon } from '../utils/readWKB';
import { landmarkURLMap } from "../assets/icon";
import { Geometry } from "../Type";
import { getPolygonPaths } from "./geometryUtil";
export const plotMultiPolygonOnMap = (geometry: Geometry) => {
  const { map, mapsLib } = useStore.getState();
  const polygonPaths = getPolygonPaths(geometry)

  polygonPaths.forEach((paths) => {
    // Create the polygon
    const newPolygon = new mapsLib!.Polygon({
      paths,
      strokeColor: '#000000',
      strokeOpacity: 0.5,
      strokeWeight: 2,
      fillOpacity: 0.1,
    });

    // Add polygon to map
    newPolygon.setMap(map);
  });
}
export const plotMarker = async (point: LngLatPoint) => {
  const { map, markerLib } = useStore.getState();
  const pt = { lat: point[1], lng: point[0] };
  new markerLib!.AdvancedMarkerElement({
    map: map!,
    position: pt,
  })

}
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
export const plotSideWalkInMarkers = async (coordinates: LngLatPoint[]) => {
  for (let i = 0; i < coordinates.length; i++) {
    const coordinate = coordinates[i];
    plotMarker(coordinate)
    await delay(100);
  }
}
export const plotAllSideWalkInMarkers = async (segements: LngLatPoint[][]) => {
  for (const segement of segements) {
    plotSideWalkInMarkers(segement);
    await delay(100);
  }
}
export const plotSideWalk = (lineSegment: LngLatPoint[]) => {
  const { map, mapsLib } = useStore.getState();
  const LineSegmentCoordinates = lineSegment.map(([lng, lat]) => ({ lat, lng }));
  const lineString = new mapsLib!.Polyline({
    path: LineSegmentCoordinates,
    geodesic: true,
    strokeColor: "#000000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  lineString.setMap(map);
}

export const plotLandmark = (geometry: LandMarkGeometry) => {
  const { markerLib, map } = useStore.getState();
  const url = landmarkURLMap[geometry.landmarkType];

  if (url == "") {
    return
  }
  const position = { lat: geometry.coordinates[1] as unknown as number, lng: geometry.coordinates[0] as unknown as number }
  const beachFlagImg = document.createElement('img');
  beachFlagImg.src = url;
  beachFlagImg.width = 32;

  new markerLib!.AdvancedMarkerElement({
    map: map!,
    position,
    content: beachFlagImg,
  })

};









