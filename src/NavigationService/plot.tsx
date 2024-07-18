import { MultiPolygon, LngLatPoint } from "../Type";
import useStore from "../store";
import { getSidewalkAccessibility } from '../apis/getSidewalkAccessibility';
import { WKBArrayToMultiPolygon } from '../utils/readWKB';
function createMultiPolygonOnMap(coordinates:  LngLatPoint[][][]) {
  const { map,mapsLib } = useStore.getState();
  coordinates.forEach((polygonCoords: LngLatPoint[][]) => {
    polygonCoords.forEach((polygon: LngLatPoint[]) => {
      const polygonPaths = polygon.map((ring: LngLatPoint) => ({
        lat: ring[1],
        lng: ring[0]
      }));

      // Create the polygon
      const newPolygon = new mapsLib!.Polygon({
        paths: polygonPaths,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      });

      // Add polygon to map
      newPolygon.setMap(map); // Assuming `map` is your Google Map instance
    });
  });
}
const plot = (MultiPolygonArrays: MultiPolygon[]) => {
  MultiPolygonArrays.forEach(MultiPolygon => createMultiPolygonOnMap(MultiPolygon.coordinates))
}

export const plotIntersection = async() =>{
  const { latLngLiteralArray } = useStore.getState();
  const WKBstringArray: string[] = await getSidewalkAccessibility(latLngLiteralArray);
  const MultiPolygonArrays = WKBArrayToMultiPolygon(WKBstringArray)
  // console.log(MultiPolygonArrays)
  plot(MultiPolygonArrays)
}