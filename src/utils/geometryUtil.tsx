/* eslint-disable @typescript-eslint/no-unused-vars */

import booleanIntersects from "@turf/boolean-intersects";
import { originLocationType, Geometry, LngLatPoint, } from "../Type";
import useStore from "../store";
import { Feature, Point } from "geojson";
import turf from "turf";
import { plotMultiPolygonOnMap } from "./plot";
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
            plotMultiPolygonOnMap(geometry);
            getLineSegements(geometry)
            
            return geometry
        }
    }
}
export const getLineSegements = (geometry: Geometry) => {
    const coordinates = geometry.coordinates.flat() as unknown as Array<Array<Array<number>>>;
    for(let i = 1; i < coordinates.length; i++){
        console.log(coordinates)        
        // if(!slop){
            
        //     slop =  
        // }
    }
}
export const convertPolygonToLine = (geometry: Geometry) => {
    // console.log(geometry.coordinates )
    const coordinates = geometry.coordinates.flat() as unknown as Array<Array<Array<number>>>;
    console.log(coordinates[0][0])

    // const poly1 = [[[125, -30], [145, -30], [145, -20], [125, -20], [125, -30]]]

    

    const line = turf.polygon(coordinates)
    console.log(line)
    return
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