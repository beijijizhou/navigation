/* eslint-disable @typescript-eslint/no-unused-vars */
import { MultiPolygon, LngLatPoint, LandmarkType, originLocationType, PedestrianRampwayType } from "../Type";
import useStore from "../store";
import { AdvancedMarker } from '@vis.gl/react-google-maps';
// import { WKBArrayToMultiPolygon } from '../utils/readWKB';
import { } from '@turf/intersect';
import booleanIntersects from "@turf/boolean-intersects";
import { landmarkURLMap } from "../assets/icon";
import * as turf from "@turf/turf";
import { Geometry } from "../Type";
import { Feature, Point } from "geojson";
const getPolygonPaths = (geometry: Geometry) => {
  const coordinates = geometry.coordinates as LngLatPoint[][][];

  return coordinates.flatMap((polygonCoords: LngLatPoint[][]) =>
    polygonCoords.map((polygon: LngLatPoint[]) =>
      polygon.map((ring: LngLatPoint) => ({
        lat: ring[1],
        lng: ring[0],
      }))
    )
  );
};
const plotMultiPolygonOnMap =(geometry: Geometry) => {
  const { map, mapsLib } = useStore.getState();
  const polygonPaths = getPolygonPaths(geometry)
  
  polygonPaths.forEach((paths) => {
    // Create the polygon
    const newPolygon =new mapsLib!.Polygon({
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
// const plotMultiPolygonOnMap = (geometry: Geometry) => {
//   const { map, mapsLib } = useStore.getState();
//   const coordinates = geometry.coordinates as LngLatPoint[][][]
//   coordinates.forEach((polygonCoords: LngLatPoint[][]) => {
//     polygonCoords.forEach((polygon: LngLatPoint[]) => {
//       const polygonPaths = polygon.map((ring: LngLatPoint) => ({
//         lat: ring[1],
//         lng: ring[0]
//       }));

//       // Create the polygon
      
//       const newPolygon = new mapsLib!.Polygon({
//         paths: polygonPaths,
//         strokeColor: '#000000',
//         strokeOpacity: 0.5,
//         strokeWeight: 2,

//         fillOpacity: 0.1
//       });

//       // Add polygon to map
//       newPolygon.setMap(map); // Assuming map is your Google Map instance
//     });
//   });
// }


export const plot = (MultiPolygonArrays: MultiPolygon[]) => {
  MultiPolygonArrays.forEach(MultiPolygon => plotMultiPolygonOnMap(MultiPolygon as Geometry))
}

const createPoints = (geometry: Geometry) => {
  const url = landmarkURLMap[geometry.landmarkType];
  if (url == "") {
    // console.log(geometry.landmarkType)
  }
  return (
    <AdvancedMarker
      position={{ lat: geometry.coordinates[1] as number, lng: geometry.coordinates[0] as number }}
    >
      <img src={url} width={32} height={32} />
    </AdvancedMarker>
  );
};

export const getCurrentBlockLandmarks = (geometry: Geometry) => {
  const { origin } = useStore.getState()

  if (geometry.landmarkType == LandmarkType.Sidewalk) {
    
    // console.log(geometry.landmarkType)
    if(isPointInMultiPolygon(origin, geometry)){
      plotMultiPolygonOnMap(geometry)
    }
    
    return <div></div>
  }
  if (geometry.landmarkType == LandmarkType.Building) {
    // plotMultiPolygonOnMap(geometry)
  }
  if (Object.values(PedestrianRampwayType).includes(geometry.landmarkType as unknown as PedestrianRampwayType)) {


    return createPoints(geometry)
  }

  return <div></div>
}


const isPointInMultiPolygon = (point: originLocationType, geometry: Geometry): boolean => {
  // Create a buffer around the point

  const poly1 = convertPointToBuffer(point);
  const polygonPaths = getPolygonPaths(geometry)
  // console.log(polygonPaths)
  const coordinates = polygonPaths.map(path => path.map((coordinate)=> [coordinate.lng, coordinate.lat]));
  
  const poly2 = turf.polygon(coordinates)

  
  return booleanIntersects(poly1,poly2);
};

const convertPointToBuffer = (point: originLocationType) => {
  const { map } = useStore.getState()
  const pt: Feature<Point> = {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Point",
      "coordinates": [point!.lng, point!.lat]
    }
  }
  const buffered = turf.buffer(pt, 0.005);
  // const result = turf.featureCollection([buffered, pt]);
  const coordinates = (buffered.geometry.coordinates[0] as unknown as [number, number][]).map(coord => ({
    lat: coord[1],
    lng: coord[0]
  }));


  // for (const coordinate of coordinates ){

  //   const d = turf.distance(center,turf.point([coordinate.lng, coordinate.lat]) )

  // }

  const bufferedPolygon = new google.maps.Polygon({
    paths: coordinates,
    strokeColor: '#FF0000', // Color of the border
    strokeOpacity: 0.8,    // Opacity of the border
    strokeWeight: 2,       // Width of the border
    fillColor: '#FF0000',  // Color of the fill
    fillOpacity: 0.35      // Opacity of the fill
  });

  bufferedPolygon.setMap(map);
  return buffered as unknown as GeoJSON.Feature<GeoJSON.Polygon>
}


