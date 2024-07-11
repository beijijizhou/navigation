
// PositionMarker.cy.js
/* eslint-disable @typescript-eslint/no-unused-vars */
import { geoLocation } from '../e2e/0-test/points'
import React from 'react';
import { mount } from 'cypress/react18'
import { App } from "../../src/App"
import useStore from '../../src/store';
import { NavigationStatus } from '../../src/store/useNavigationSlice';


describe('PositionMarker Component', async () => {

  it('should render correctly and update position', () => {
    mount(<App />);

    cy.get('.searchBar', { timeout: 1000 }).should('be.visible')
    console.log("runs before")
    const { setNavigationServiceStatus} = useStore.getState();
    setNavigationServiceStatus(NavigationStatus.InProgress)


    let index = -1
    
    const nextPosition = (index: number,latLngLiteralArray: google.maps.LatLngLiteral[]) => {
      index++;
      if (index == latLngLiteralArray.length) {
        clearInterval(intervalID)
        index = 0
      }
      return index
    }
    const setLocation = () => {
      const { setOrigin, map,latLngLiteralArray } = useStore.getState();
      if (map && latLngLiteralArray) {
        index = nextPosition(index, latLngLiteralArray);
        const position = latLngLiteralArray[index]
        setOrigin(position)
        console.log(index)
        // map!.setCenter(position)
      }

    };
    const intervalID = setInterval(setLocation, 1000);
  });
});
