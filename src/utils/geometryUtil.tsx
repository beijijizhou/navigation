/* eslint-disable @typescript-eslint/no-unused-vars */

import booleanIntersects from "@turf/boolean-intersects";
import { originLocationType, Geometry, LngLatPoint, CollisionRadius, LandMarkGeometry, } from "../Type";
import useStore from "../store";
import { Feature, Point } from "geojson";
import * as turf from "@turf/turf";
import { plotLandmark, plotMarker, plotSideWalk, plotSideWalkInMarkers } from "./plot";

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
const convertGeometryToPolygonPaths = (geometry: Geometry) => {
    const polygonPaths = getPolygonPaths(geometry)
    return polygonPaths.map(path => path.map((coordinate) => [coordinate.lng, coordinate.lat]));
}
export const isPointIntersectingMultiPolygon = (point: originLocationType, geometry: Geometry): boolean => {
    const poly1 = convertPointToBuffer(point);
    const coordinates = convertGeometryToPolygonPaths(geometry)
    const poly2 = turf.polygon(coordinates)
    return booleanIntersects(poly1, poly2);
};
export const plotGeometry = (geometry: Geometry) => {
    const coordinatesArray = geometry.coordinates as LngLatPoint[][][];
    for (const coordinate of coordinatesArray[0]) {
        plotSideWalk(coordinate)
    }

}
export const getIntersectedSideWalkGeometry = () => {
    const { origin, sideWalkGeometryArray, landMarksGeometryArray } = useStore.getState()

    for (const geometry of sideWalkGeometryArray!) {
        // plotGeometry(geometry)
        if (isPointIntersectingMultiPolygon(origin, geometry)) {
            const intersectedlandMarksGeometry = getIntersectedlandMarksGeometry(geometry, landMarksGeometryArray!);
            // console.log(intersectedlandMarksGeometry)
            return geometry
            // console.log(geometry.coordinates)


        }
    }
}

export const convertPointToBuffer = (point: originLocationType) => {
    const { map } = useStore.getState()
    const pt: Feature<Point> = {
        "type": "Feature",
        "properties": {},
        "geometry": {
            "type": "Point",
            "coordinates": [point!.lng, point!.lat]
        }
    }
    const buffered = turf.buffer(pt, 2 * CollisionRadius);
    // const result = turf.featureCollection([buffered, pt]);
    const coordinates = (buffered.geometry.coordinates[0] as unknown as [number, number][]).map(coord => ({
        lat: coord[1],
        lng: coord[0]
    }));
    // console.log(point, [point!.lng, point!.lat])
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



const getIntersectedlandMarksGeometry = (sideWalkGeometry: Geometry, landMarksGeometryArray: LandMarkGeometry[]) => {
    const intersectedlandMarksGeometry = [];

    plotSideWalk(sideWalkGeometry.coordinates[0][0])
    for (const landMarksGeometry of landMarksGeometryArray) {
        const point = { lat: landMarksGeometry.coordinates[0], lng: landMarksGeometry.coordinates[1] }
        plotMarker(landMarksGeometry.coordinates)
        if (isPointIntersectingMultiPolygon(point, sideWalkGeometry)) {

            intersectedlandMarksGeometry.push(landMarksGeometry)
            plotLandmark(landMarksGeometry);
        }
    }
    return intersectedlandMarksGeometry;
}