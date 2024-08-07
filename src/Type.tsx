export type locationType = string | google.maps.LatLng | google.maps.Place | google.maps.LatLngLiteral;
export type LngLatPoint = [number, number]
export type originLocationType = google.maps.LatLngLiteral | null | undefined;
export type coordinatesArray = [[LngLatPoint[], LngLatPoint[]]]
export interface MultiPolygon {
  type: "MultiPolygon",
  coordinates: LngLatPoint[][][];
}
export enum LookUpTableType {
  Distance = 'distance',
  Time = "time",
}

export type WKBStringArray = [wkb: string, type: string];
type Lng = number;
type Lat = number;
export enum GeometryType {
  Point = "Point",
  MultiPolygon = "MultiPolygon"
}
export enum LandmarkType {
  KnobPull = "Knob - Pull",
  DoorDouble = "Door - Double",
  DoorSingle = "Door - Single",
  Stairs = "Stairs",
  FireHydrant = "Fire Hydrant",
  Sidewalk = "Sidewalk",
  Building = "Building",
  KnobNoSubtype = "Knob - No Subtype",
  Tree = "Tree",
  PedestrianRampwayConditionMissing = "Pedestrian Rampway - Condition Missing",
  PedestrianRampwayGoodCondition = "Pedestrian Rampway - Good Condition",
}

export type Geometry = {
  type: GeometryType,
  landmarkType: LandmarkType,
  coordinates: [Lng, Lat] | LngLatPoint[][][],
}
export const CornerDistance = 0.0004;
export enum ColorHexCodes {
  Red = '#FF0000',
  Green = '#00FF00',
  Blue = '#0000FF',
  Yellow = '#FFFF00',
  Cyan = '#00FFFF',
  Magenta = '#FF00FF',
  Black = '#000000',
  White = '#FFFFFF',
  Gray = '#808080',
  Orange = '#FFA500',
  Purple = '#800080',
  Pink = '#FFC0CB',
  Brown = '#A52A2A',
  LightBlue = '#ADD8E6',
  LightGreen = '#90EE90',
}

