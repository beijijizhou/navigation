/* eslint-disable @typescript-eslint/no-unused-vars */

import booleanIntersects from "@turf/boolean-intersects";
import { originLocationType, Geometry, LngLatPoint, CornerDistance, CornerLength, CollisionRadius, SlopeDifference, } from "../Type";
import useStore from "../store";
import { Feature, Point } from "geojson";
import * as turf from "@turf/turf";
import { plotMarker, plotSideWalk, plotSideWalkInMarkers } from "./plot";
import { lineToPolygon } from "@turf/line-to-polygon";
import { distanceInTurf } from "./navigationUtil/navigation";

export const getPolygonPaths = (geometry: Geometry) => {
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
const convertGeometryToPolygon = (geometry: Geometry) => {
    const polygonPaths = getPolygonPaths(geometry)
    return polygonPaths.map(path => path.map((coordinate) => [coordinate.lng, coordinate.lat]));
}
export const isPointInMultiPolygon = (point: originLocationType, geometry: Geometry): boolean => {
    // Create a buffer around the point

    const poly1 = convertPointToBuffer(point);

    // console.log(polygonPaths)
    const coordinates = convertGeometryToPolygon(geometry)

    const poly2 = turf.polygon(coordinates)
    return booleanIntersects(poly1, poly2);
};
export const plotGeometry = (geometry: Geometry) =>{
    const coordinatesArray = geometry.coordinates as LngLatPoint[][][];
    for(const coordinate of coordinatesArray[0]){
        plotSideWalk(coordinate)
    }
    
}
export const getCurrentSideWalk = () => {
    const { origin, sideWalkGeometryArray } = useStore.getState()

    for (const geometry of sideWalkGeometryArray!) {
        if (isPointInMultiPolygon(origin, geometry)) {
            // plotMultiPolygonOnMap(geometry);
            // plotGeometry(geometry)
            // console.log(geometry)
            return getLineSegements(geometry)

            // console.log(geometry.coordinates)
            // plotSideWalkInMarkers(geometry.coordinates[0][0] as LngLatPoint[])

        }
    }
}
const normalizedCoordinates = (coordinates: LngLatPoint[]) => {
    for (let i = 1; i < coordinates.length; i++) {
        if (distanceInTurf(coordinates[i - 1], coordinates[i]) > CornerDistance) {
            return [...coordinates.slice(i), ...coordinates.slice(0, i)];
        }
    }
    return coordinates;
}
export const getLineSegements = (geometry: Geometry) => {

    const coordinatesArray = geometry.coordinates as LngLatPoint[][][];
    const coordinates = normalizedCoordinates(coordinatesArray[0][0])
    // plotSideWalkInMarkers(coordinates)
    // console.log(coordinates)
    // plotSideWalk(coordinates)
    let corner: LngLatPoint[] = []
    const segments: LngLatPoint[] = [];
   
    for (let i = 0; i < coordinates.length - 1; i++) {
        const d = distanceInTurf(coordinates[i], coordinates[i + 1]);
        // getSlope(coordinates[i], coordinates[i + 1])
        if (d < CornerDistance) {
            corner.push(coordinates[i]);
        } else {
            corner = addNewCorner(corner, segments);
        }
    }
    addNewCorner(corner, segments);
    segments.push(segments[0]);
    plotSideWalkInMarkers(segments);
    return segments
}
export const getSlope = (p1: LngLatPoint, p2: LngLatPoint, previousSlope:number | undefined): number => {
    const [y1, x1] = p1;
    const [y2, x2] = p2;

    if (x1 === x2) {
        // The slope is undefined for a vertical line (division by zero)
        return 0;
    }

    const slope = Math.abs((y2 - y1) / (x2 - x1));
    if (!previousSlope){
        return slope
    }
    const d = Math.abs(slope - previousSlope)
    if(d > SlopeDifference){
        plotMarker(p1)
        console.log(p1, p2)
    }
    return slope
    // If there is no previous slope, set it to the current slope
    
}
const addNewCorner = (corner: LngLatPoint[], segments: LngLatPoint[])=>{
    if (corner.length > CornerLength) {
        const mid = Math.floor(corner.length / 2);
        segments.push(corner[mid]);
        return [];
    }
    return corner
}

export const getIntersectedSideWalk = (lineSegment: LngLatPoint[], point: originLocationType) => {
    const line1 = turf.lineString(lineSegment);
    const polygon = lineToPolygon(line1);

    return booleanIntersects(convertPointToBuffer(point), polygon);
}
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
    const buffered = turf.buffer(pt, CollisionRadius);
    // const result = turf.featureCollection([buffered, pt]);
    const coordinates = (buffered.geometry.coordinates[0] as unknown as [number, number][]).map(coord => ({
        lat: coord[1],
        lng: coord[0]
    }));
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