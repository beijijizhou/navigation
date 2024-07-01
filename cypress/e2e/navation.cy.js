describe('Geolocation Test', function() {
  it('should mock the geolocation', function() {
    cy.visit('http://localhost:5173'); // Change this to your local server URL
    
    // cy.window().then((win) => {
    //   cy.stub(win.navigator.geolocation, 'getCurrentPosition').callsFake((cb) => {
    //     return cb({
    //       coords: {
    //         latitude: 37.7749,
    //         longitude: -122.4194,
    //       }
    //     });
    //   });
      
    //   // cy.stub(win.navigator.geolocation, 'watchPosition').callsFake((cb) => {
    //   //   return cb({
    //   //     coords: {
    //   //       latitude: 37.7749,
    //   //       longitude: -122.4194,
    //   //     }
    //   //   });
    //   // });
    // });

    // Add your assertions here
    // cy.get('some-element').should('contain', 'Expected Value');
  });
});
