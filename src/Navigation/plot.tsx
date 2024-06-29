import { MultiPolygon, LngLatPoint } from "../Type";

function createMultiPolygonOnMap(coordinates:  LngLatPoint[][][], mapsLib: google.maps.MapsLibrary, map: google.maps.Map) {
  coordinates.forEach((polygonCoords: LngLatPoint[][]) => {
    polygonCoords.forEach((polygon: LngLatPoint[]) => {
      const polygonPaths = polygon.map((ring: LngLatPoint) => ({
        lat: ring[1],
        lng: ring[0]
      }));

      // Create the polygon
      const newPolygon = new mapsLib.Polygon({
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
export const plot = (MultiPolygonArrays: MultiPolygon[], mapsLib: google.maps.MapsLibrary, map: google.maps.Map) => {
  MultiPolygonArrays.forEach(MultiPolygon => createMultiPolygonOnMap(MultiPolygon.coordinates, mapsLib, map))
}