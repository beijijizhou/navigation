
// 
import * as wkx from 'wkx';
import { Buffer } from 'buffer';
import { WKBStringArray, Geometry, LandmarkType} from '../Type';
window.Buffer = window.Buffer || Buffer;
const readWKB = (wkbstring: string) => {
    const wkbBuffer = window.Buffer.from(wkbstring, 'hex');
    const geometry = wkx.Geometry.parse(wkbBuffer);
    return geometry.toGeoJSON() as Geometry;
};
export const WKBArrayToGeometry = (wkbArray: WKBStringArray[]) => {
    return wkbArray.map(wkbstring => {
        const geometry = readWKB(wkbstring[0]);
        geometry.landmarkType = wkbstring[1] as LandmarkType;
        return geometry
    });
};

