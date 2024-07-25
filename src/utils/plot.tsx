import { MultiPolygon, LngLatPoint, LandmarkType, GeometryType } from "../Type";
import useStore from "../store";
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { conditionMissURL, defectiveConditionURL, fireHyrantURL, goodConditionURL, treeURL } from "../assets/icon";
// import { WKBArrayToMultiPolygon } from '../utils/readWKB';
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
  let url = "";
  switch(geometry.landmarkType){
    case LandmarkType.Tree:
      url = treeURL;
      break;
    case LandmarkType.FireHydrant:
      url = fireHyrantURL
      break;
    case LandmarkType.PedestrianRampwayConditionMissing:
      url = conditionMissURL
      break
    case LandmarkType.PedestrianRampwayGoodCondition:
      url = goodConditionURL
      break
    case LandmarkType.PedestrianRampwayDefective:
      url = defectiveConditionURL
      break
    default:
      // console.log(geometry.landmarkType, geometry.coordinates)
      return
  }
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
      createMultiPolygonOnMap(geometry.coordinates as LngLatPoint[][][]);
  }
  return <div></div>


}