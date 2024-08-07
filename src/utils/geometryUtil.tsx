/* eslint-disable @typescript-eslint/no-unused-vars */

import booleanIntersects from "@turf/boolean-intersects";
import { originLocationType, Geometry, LngLatPoint, CornerDistance, ColorHexCodes, } from "../Type";
import useStore from "../store";
import { Feature, Point } from "geojson";
import * as turf from "@turf/turf";
import lineIntersect from "@turf/line-intersect";
import { plotSideWalk, plotMultiPolygonOnMap, plotMarker, plotSideWalkInMarkers, plotAllSideWalkInMarkers } from "./plot";
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
export const getCurrentSideWalk = () => {
    const { origin, sideWalkGeometryArray } = useStore.getState()

    for (const geometry of sideWalkGeometryArray!) {
        // console.log(geometry.coordinates)

        if (isPointInMultiPolygon(origin, geometry)) {
            // plotMultiPolygonOnMap(geometry);
            getLineSegements(geometry)
            // plotAllSideWalkInMarkers(geometry.coordinates[0] as LngLatPoint[][])

        }
    }
}
const normalizedCoordinates = (coordinates: LngLatPoint[]) => {
    for (let i = 1; i < coordinates.length; i++) {
        if (distanceInTurf(coordinates[i - 1], coordinates[i]) < CornerDistance) {
            return [...coordinates.slice(i), ...coordinates.slice(0, i)];
        }
    }
    return coordinates;
}
export const getLineSegements = (geometry: Geometry) => {
    const coordinatesArray = geometry.coordinates as LngLatPoint[][][];
    const coordinates = normalizedCoordinates(coordinatesArray[0][0])
    // plotSideWalkInMarkers(coordinates)
    let currentSegment: LngLatPoint[] = []
    let corner: LngLatPoint[] = []
    const segments: LngLatPoint[][] = [];
    for (let i = 0; i < coordinates.length - 1; i++) {
        const d = distanceInTurf(coordinates[i], coordinates[i + 1])

        if (d <= CornerDistance) { // meeting the corner

            if (currentSegment.length > 3) { // append the previous segment to array
                console.log("meet corner")
                segments.push(currentSegment)
            }
            currentSegment = []
            corner.push(coordinates[i]) //adding corner points
        }

        else {

            if (corner.length > 3) { // come out of corner, and start to meet the regular sidewalk

                // if (corner.length > 2) {



                // }  
                console.log("finish corner", corner)
                currentSegment = [...corner];
                plotMarker(coordinates[i])
                corner = [];



            }
            currentSegment.push(coordinates[i])
        }


    }

    console.log(segments.length)
    // if (currentSegment.length > 3) {
    //     segments.push(currentSegment)
    // }
    // if (corner.length > 3) {
    //     segments[segments.length - 1] = [...segments[segments.length - 1], ...corner]
    // }
    // const i = 1
    //  plotSideWalkInMarkers(segments[i])
    //  plotSideWalkInMarkers(segments[i + 1])
    // plotAllSideWalkInMarkers(segments)
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
    const buffered = turf.buffer(pt, 0.005);
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