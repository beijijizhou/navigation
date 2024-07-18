
// 
import * as wkx from 'wkx';
import { Buffer } from 'buffer';
import { MultiPolygon } from '../Type';
window.Buffer = window.Buffer || Buffer;




export const readWKB = (wkbstring: string):MultiPolygon => {
   
    const wkbBuffer = window.Buffer.from(wkbstring, 'hex');
    const geometry = wkx.Geometry.parse(wkbBuffer);
    return geometry.toGeoJSON() as MultiPolygon;
};
export const WKBArrayToMultiPolygon = (wkbArray: string[]) => {
    return wkbArray.map(point => {
        const multiPolygonArray = readWKB(point[0]);
        return multiPolygonArray
    });
};

