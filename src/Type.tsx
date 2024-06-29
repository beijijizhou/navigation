export type location = string | google.maps.LatLng | google.maps.Place | google.maps.LatLngLiteral;
export type LngLatPoint = [number, number]
export type coordinatesArray = [[LngLatPoint[],LngLatPoint[]]]
export interface MultiPolygon{
  type:"MultiPolygon",
  coordinates:LngLatPoint[][][];
}