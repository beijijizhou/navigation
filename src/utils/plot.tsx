/* eslint-disable @typescript-eslint/no-unused-vars */
import { MultiPolygon, LandmarkType,PedestrianRampwayType } from "../Type";
import useStore from "../store";
import { AdvancedMarker } from '@vis.gl/react-google-maps';
// import { WKBArrayToMultiPolygon } from '../utils/readWKB';
import { landmarkURLMap } from "../assets/icon";
import { Geometry } from "../Type";
import { getPolygonPaths, isPointInMultiPolygon } from "./geometryUtil";

export const plotMultiPolygonOnMap =(geometry: Geometry) => {
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


// export const plot = (MultiPolygonArrays: MultiPolygon[]) => {
//   MultiPolygonArrays.forEach(MultiPolygon => plotMultiPolygonOnMap(MultiPolygon as Geometry))
// }

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
  const { origin} = useStore.getState()
 
  if (geometry.landmarkType == LandmarkType.Sidewalk) {
    
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







