
window.Buffer = window.Buffer || require("buffer").Buffer;
// const wkx = require('wkx');
import wkx from "wkx"
// var Buffer = require('buffer').Buffer;

/**
 * @typedef {Object} MultiPolygon
 * @property {"MultiPolygon"} type - Type of the object, always "MultiPolygon".
 * @property {Array<Array<[number, number]>>} coordinates - Array of two arrays of [lng, lat] pairs.
 */

/**
 * @type {Array<MultiPolygon>}
 */
export const readWKB = (wkbstring:string) => {
  // window.Buffer = Buffer;
  const wkbBuffer = window.Buffer.from(wkbstring, 'hex');
  const geometry = wkx.Geometry.parse(wkbBuffer);
  return geometry.toGeoJSON();
};
export const processWKBArray = (wkbArray) => {
  return wkbArray.map(point => {
    const multiPolygonArray = readWKB(point[0]);
    return multiPolygonArray 
  });
};

