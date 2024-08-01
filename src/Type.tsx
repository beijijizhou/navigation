export type locationType = string | google.maps.LatLng | google.maps.Place | google.maps.LatLngLiteral;
export type LngLatPoint = [number, number]
export type originLocationType = google.maps.LatLngLiteral | null | undefined;
export type coordinatesArray = [[LngLatPoint[], LngLatPoint[]]]
export type MultiPolygon = {
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
  DoorDouble = "Door - Double",
  DoorSingle = "Door - Single",
  DoorRevolving = "Door - Revolving",
  KnobPull = "Knob - Pull",
  KnobVerticalBar = "Knob - Vertical Bar",
  KnobNoSubtype = "Knob - No Subtype",
  Stairs = "Stairs",
  FireHydrant = "Fire Hydrant",
  Sidewalk = "Sidewalk",
  Building = "Building",
  Tree = "Tree",
  PedestrianRampwayConditionMissing = "Pedestrian Rampway - Condition Missing",
  PedestrianRampwayGoodCondition = "Pedestrian Rampway - Good Condition",
  PedestrianRampwayDefective = "Pedestrian Rampway - Defective"
}
export enum PedestrianRampwayType {
  ConditionMissing = LandmarkType.PedestrianRampwayConditionMissing,
  GoodCondition = LandmarkType.PedestrianRampwayGoodCondition,
  Defective = LandmarkType.PedestrianRampwayDefective,
}

export type Geometry = {
  type: GeometryType,
  landmarkType: LandmarkType,
  coordinates: [Lng, Lat] | LngLatPoint[][][],
}

