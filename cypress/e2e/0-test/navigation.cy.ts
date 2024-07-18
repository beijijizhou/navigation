/* eslint-disable @typescript-eslint/no-unused-vars */
import { geoLocation } from "./points";
function mockLocation(win: Window, index: number) {

  cy.stub(win.navigator.geolocation, "getCurrentPosition").callsFake((success, error) => {
    const { lat: latitude, lng: longitude } = geoLocation[index];

    if (latitude && longitude) {
      const position = {
        coords: {
          latitude,
          longitude,
          accuracy: 100, // optional, include other properties if needed
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        },
        timestamp: Date.now(),

      };
      return success(position);
    }

    throw error({ code: 1 });
  });
}
describe('Mock Geo Location', () => {

  it("test", () => {
    cy.visit('http://localhost:5173/')
    // cy.get('#positionMarker', { timeout: 1000 }).should('be.visible')

    cy.window().then((win) => {
     
    });
  });
});

