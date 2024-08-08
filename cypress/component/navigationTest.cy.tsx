
// PositionMarker.cy.js
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { mount } from 'cypress/react18'
import { App } from "../../src/App"
import useStore from '../../src/store';
import { NavigationStatus } from '../../src/store/useNavigationSlice';
export const bmcc = { lat: 40.713536, lng: -74.011223 };
export const goldenDinner = { lat: 40.7284405, lng: -74.0 };
// await getDirections(start, end);
export const home = { lat: 40.7898531, lng: -73.8078768 }
// const crossStreet = { lat: 40.7898507, lng: -73.807 };
export const neighbor = { lat: 40.7919567, lng: -73.8173405 }
export const homeFront = { lat: 40.789840000000005, lng: -73.80768 }
export const onefourst = { lat: 40.737370, lng: -73.997566 }
export const seven = {lat: 40.741588, lng:-73.997595}

const dynamicallyRunTest = () => {

  const { setDestination } = useStore.getState();
  setDestination(neighbor);
  let index = -1;
  const nextPosition = (index: number, latLngLiteralArray: google.maps.LatLngLiteral[]) => {
    index++;
    if (index == latLngLiteralArray.length) {
      clearInterval(intervalID)
      index = 0
    }
    return index
  }
  const setLocation = () => {
    const { setOrigin, map, latLngLiteralArray } = useStore.getState();
    console.log(latLngLiteralArray);
    if (map && latLngLiteralArray) {
      index = nextPosition(index, latLngLiteralArray);
      const position = latLngLiteralArray[index]
      setOrigin(position)
      console.log(position)
    }
  };

  const intervalID = setInterval(setLocation, 5000);

}
const staticallyRunTest = () => {

  const { setDestination } = useStore.getState();
  // setOrigin(bmcc)
  setDestination(neighbor);

}
const sideWalkTest = () => {
  const { setOrigin, setManualOrigin, latLngLiteralArray } = useStore.getState();
  setManualOrigin(true);
  // setOrigin(seven);
  setOrigin(bmcc);

}
describe('PositionMarker Component', () => {
  // Comment out or conditionally disable this function call
  const { setZoomLevel } = useStore.getState();
  it('test run', () => {
    mount(<App />);
    const viewPortWidth = 700;
    cy.viewport(viewPortWidth, viewPortWidth)
    cy.get('.searchBar', { timeout: 1000 }).should('be.visible')
    // dynamicallyRunTest();
    // staticallyRunTest();
    setZoomLevel(17)
    sideWalkTest();
  });


});




