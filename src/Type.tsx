export type locationType = string | google.maps.LatLng | google.maps.Place | google.maps.LatLngLiteral;
export type LngLatPoint = [number, number]
export type originLocationType = google.maps.LatLngLiteral | null | undefined;
export type coordinatesArray = [[LngLatPoint[], LngLatPoint[]]]
export interface MultiPolygon {
  type: "MultiPolygon",
  coordinates: LngLatPoint[][][];
}