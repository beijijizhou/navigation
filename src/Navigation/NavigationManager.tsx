
// import { plot } from './plot';
// import { getSidewalkAccessibility } from '../api/getSidewalkAccessibility';
// import { processWKBArray } from '../utils/readWKB';

export class NavigationManager {
  map: google.maps.Map;
  mapsLib: google.maps.MapsLibrary;
  routesLib: google.maps.RoutesLibrary;
 
  directionsRenderers: google.maps.DirectionsRenderer | null = null;
  currentDirectionsRoute: google.maps.DirectionsRoute | null = null;
  constructor(map: google.maps.Map, mapsLib: google.maps.MapsLibrary, routesLib: google.maps.RoutesLibrary) {
    this.map = map;
    this.mapsLib = mapsLib;
    this.routesLib = routesLib;
    this.initDirectionsRenderers();
  }
  initDirectionsRenderers(){
    const rendererOptions = {
      map: this.map
    };
    this.directionsRenderers = new this.routesLib.DirectionsRenderer(rendererOptions);
  }
  clearRenderResults() {
    // Remove previous directions renderers from the map
    
    this.directionsRenderers?.setMap(null);
  }

  async navigationService(start: google.maps.LatLngLiteral, end: google.maps.LatLngLiteral) {
    // if (!this.routes) {

    //   return
    // }
    await this.getDirections(start, end)
    
    // const wkb = await getSidewalkAccessibility(this.routes);
    // const MultiPolygonArrays = processWKBArray(wkb)
    // console.log(MultiPolygonArrays)
    // plot(MultiPolygonArrays, this.mapsLib, this.map)

  }
  getDirections = async (start: google.maps.LatLngLiteral, end: google.maps.LatLngLiteral) => {
    const directionsService = new this.routesLib.DirectionsService();
    const directionsRequest: google.maps.DirectionsRequest = {
      destination: end,
      origin: start,
      travelMode: google.maps.TravelMode.WALKING,
      // provideRouteAlternatives: true,
    };
    return new Promise<void>((resolve, reject) => {
      directionsService.route(directionsRequest, (result: google.maps.DirectionsResult | null, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          if (result) {
            this.clearRenderResults();
            
            this.directionsRenderers!.setDirections(result);
            this.currentDirectionsRoute = result.routes[0];
            resolve(); // Resolve the promise after setting currentDirectionsRoute
          } else {
            console.error(new Error('No directions found.'));
            reject(new Error('No directions found.'));
          }
        } else {
          console.error('Directions request failed due to ' + status);
          reject(new Error('Directions request failed due to ' + status));
        }
      });
    });
  };
 


}