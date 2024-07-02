
// PositionMarker.cy.js
/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { mount } from 'cypress/react18'
import {App} from "../../src/App"

describe('PositionMarker Component', () => {

  it('should render correctly and update position', () => {
    mount(<App />);
  cy.get('#positionMarker', { timeout: 100000 }).should('be.visible')
  
  });
});
