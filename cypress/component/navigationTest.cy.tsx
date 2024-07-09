
// PositionMarker.cy.js
/* eslint-disable @typescript-eslint/no-unused-vars */
import { geoLocation } from '../e2e/0-test/points'
import React from 'react';
import { mount } from 'cypress/react18'
import { App } from "../../src/App"
import useStore from '../../src/store';


describe('PositionMarker Component', async () => {

  it('should render correctly and update position', () => {
    mount(<App />);

    cy.get('#positionMarker', { timeout: 1000 }).should('be.visible')
    console.log("runs before")

    console.log("test Location", geoLocation)


    let index = -1
    const nextPosition = (index: number) => {
      index++;
      console.log(index)
      if (index == geoLocation.length) {
        index = 0;
      }
      return index
    }
    const setLocation = () => {
      const { setOrigin, map } = useStore.getState();
      // console.log(map)
      if (map) {

        index = nextPosition(index);
        const position = geoLocation[index]
        setOrigin(position)
        console.log(index)
        map!.setCenter(position)
      }

    };

    const intervalID = setInterval(setLocation, 1000);

    // intervalID();
    // for(let i = 0; i < geoLocation.length; i++){

    // }
  });
});
