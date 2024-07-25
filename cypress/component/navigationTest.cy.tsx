
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

const dynamicallyRunTest = () => {
  it('dynamically run', () => {
    mount(<App />);
    cy.get('.searchBar', { timeout: 1000 }).should('be.visible')
    console.log("runs before")
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
      if (map && latLngLiteralArray) {
        index = nextPosition(index, latLngLiteralArray);
        const position = latLngLiteralArray[index]
        setOrigin(position)
      }
    };
    const intervalID = setInterval(setLocation, 500);
  });
}
const staticallyRunTest = () => {
  it('statically run', () => {
    mount(<App />);
    cy.get('.searchBar', { timeout: 1000 }).should('be.visible')
    console.log("runs before")
    const { setOrigin, setDestination } = useStore.getState();
    // setOrigin(bmcc)
    setDestination(neighbor);
  });
}
describe('PositionMarker Component', () => {
  // Comment out or conditionally disable this function call
  dynamicallyRunTest();
  // staticallyRunTest();

});




