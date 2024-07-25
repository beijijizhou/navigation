/* eslint-disable @typescript-eslint/no-unused-vars */
import { MultiPolygon, LngLatPoint,  GeometryType } from "../Type";
import useStore from "../store";
import { AdvancedMarker } from '@vis.gl/react-google-maps';
// import { WKBArrayToMultiPolygon } from '../utils/readWKB';
import { landmarkURLMap } from "../assets/icon";
import booleanPointInPolygon from '@turf/boolean-point-in-polygon';
import * as turf from "@turf/turf";
import { Geometry } from "../Type";
function createMultiPolygonOnMap(coordinates: LngLatPoint[][][]) {
  const { map, mapsLib } = useStore.getState();
  coordinates.forEach((polygonCoords: LngLatPoint[][]) => {
    polygonCoords.forEach((polygon: LngLatPoint[]) => {
      const polygonPaths = polygon.map((ring: LngLatPoint) => ({
        lat: ring[1],
        lng: ring[0]
      }));

      // Create the polygon
      const newPolygon = new mapsLib!.Polygon({
        paths: polygonPaths,
        strokeColor: '#000000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#000000',
        fillOpacity: 0.35
      });

      // Add polygon to map
      newPolygon.setMap(map); // Assuming `map` is your Google Map instance
    });
  });
}
export const plot = (MultiPolygonArrays: MultiPolygon[]) => {
  MultiPolygonArrays.forEach(MultiPolygon => createMultiPolygonOnMap(MultiPolygon.coordinates))
}

const createPoints = (geometry: Geometry) => {
  const url = landmarkURLMap[geometry.landmarkType];
  return (
    <AdvancedMarker
      position={{ lat: geometry.coordinates[1] as number, lng: geometry.coordinates[0] as number }}
    >
      <img src={url} width={32} height={32} />
    </AdvancedMarker>
  );
};
export const plotLandmarks = (geometry: Geometry) => {
  switch (geometry.type) {
    case GeometryType.Point:
      return createPoints(geometry)
    default:
      {
        createMultiPolygonOnMap(geometry.coordinates as LngLatPoint[][][]);

        // if (geometry.landmarkType == LandmarkType.Sidewalk) {
        //   console.log(geometry.coordinates)
          findContainingMultipolygon(geometry)
        //   if (multipolygon) {
        //     createMultiPolygonOnMap(geometry.coordinates as LngLatPoint[][][]);
        //   }
        // }

      }

  }
  return <div></div>
}

function findContainingMultipolygon(geometry: Geometry): MultiPolygon | null {
  const { origin } = useStore.getState()

  const pt = turf.point([origin!.lng, origin!.lat]);


  if (geometry.type === 'MultiPolygon') {
    const multiPolygon = turf.multiPolygon(geometry.coordinates as LngLatPoint[][][]);
    if (booleanPointInPolygon(pt, multiPolygon)) {
      console.log(geometry)
      return geometry as MultiPolygon;
    }
  }

  return null;
}