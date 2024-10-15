// import booleanIntersects from "@turf/boolean-intersects";
import { CornerDistance, CornerLength, Geometry, LngLatPoint, SlopeDifference } from "../Type";
import { distanceInTurf } from "./navigationUtil/navigation";
import { plotMarker } from "./plot";
// import { convertPointToBuffer } from "./geometryUtil";
// import lineToPolygon from "@turf/line-to-polygon";

export const getLineSegements = (geometry: Geometry) => {

    const coordinatesArray = geometry.coordinates as LngLatPoint[][][];
    const coordinates = normalizedCoordinates(coordinatesArray[0][0])
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
    // plotSideWalkInMarkers(segments);
    return segments
}
// export const getCurrentSegment = (segments: LngLatPoint[], point: originLocationType) => {

//     const poly1 = convertPointToBuffer(point);
//     for (let i = 0; i < segments.length - 1; i++) {
//         const line1 = turf.lineString([
//             segments[i],
//             segments[i + 1],
//         ]);
//         if (booleanIntersects(line1, poly1)) return i
//     }
// }
export const getSlope = (p1: LngLatPoint, p2: LngLatPoint, previousSlope: number | undefined): number => {
    const [y1, x1] = p1;
    const [y2, x2] = p2;

    if (x1 === x2) {
        // The slope is undefined for a vertical line (division by zero)
        return 0;
    }

    const slope = Math.abs((y2 - y1) / (x2 - x1));
    if (!previousSlope) {
        return slope
    }
    const d = Math.abs(slope - previousSlope)
    if (d > SlopeDifference) {
        plotMarker(p1)

    }
    return slope
    // If there is no previous slope, set it to the current slope

}
const addNewCorner = (corner: LngLatPoint[], segments: LngLatPoint[]) => {
    if (corner.length > CornerLength) {
        const mid = Math.floor(corner.length / 2);
        segments.push(corner[mid]);
        return [];
    }
    return corner
}

const normalizedCoordinates = (coordinates: LngLatPoint[]) => {
    for (let i = 1; i < coordinates.length; i++) {
        if (distanceInTurf(coordinates[i - 1], coordinates[i]) > CornerDistance) {
            return [...coordinates.slice(i), ...coordinates.slice(0, i)];
        }
    }
    return coordinates;
}


// export const getIntersectedSideWalk = (lineSegment: LngLatPoint[], point: originLocationType) => {
//     const line1 = turf.lineString(lineSegment);
//     const polygon = lineToPolygon(line1);

//     return booleanIntersects(convertPointToBuffer(point), polygon);
// }