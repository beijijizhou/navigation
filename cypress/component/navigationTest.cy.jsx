
// PositionMarker.cy.js
/* eslint-disable @typescript-eslint/no-unused-vars */
import { geoLocation } from '../e2e/0-test/points'
import React from 'react';
import { mount } from 'cypress/react18'
import { App } from "../../src/App"
// before(() =>{

// })
describe('PositionMarker Component', async () => {
  console.log("runs before")
  navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.latitude, position.coords.longitude);
  });
  it('should render correctly and update position', () => {
    mount(<App />);
    
    cy.get('#positionMarker', { timeout: 100 }).should('be.visible')

    let index = 6
    console.log("test", geoLocation[index])

    cy.stub(window.navigator.geolocation, 'watchPosition').callsFake((success, error) => {

      index++
      if (index === geoLocation.length) {
        index = 0
      }
      const { lat: latitude, lng: longitude } = geoLocation[index]
      if (latitude && longitude) {
        const position = {
          coords: {
            latitude,
            longitude,
            accuracy: 100,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null,
          },
          timestamp: Date.now(),
        };
        return success(position);
      }
      throw error({ code: 1 })

    });
    cy.clock();
    const startTime = new Date().getTime();
    
    cy.tick(10000).then(() => {
      console.log('Task took ' + (new Date().getTime() - startTime) + ' milliseconds');
      console.log("test1");
    
      cy.tick(10000).then(() => {
        console.log('Task took ' + (new Date().getTime() - startTime) + ' milliseconds');
        console.log("test2");
      });
    });
    
  });
});
