
// import { plot } from './plot';
import { getSidewalkAccessibility } from '../apis/getSidewalkAccessibility';
import { WKBArrayToMultiPolygon } from '../utils/readWKB';
import { location } from '../Type';

import { plot } from './plot';



export class NavigationManager {
  map: google.maps.Map;
  mapsLib: google.maps.MapsLibrary;
  routesLib: google.maps.RoutesLibrary;
  directionsRenderers: google.maps.DirectionsRenderer
  currentDirectionsRoute: google.maps.DirectionsRoute | null = null;
  LatLngLiteralArray: google.maps.LatLngLiteral[] | [] = [];

  constructor(map: google.maps.Map, mapsLib: google.maps.MapsLibrary, routesLib: google.maps.RoutesLibrary) {
    this.map = map;
    this.mapsLib = mapsLib;
    this.routesLib = routesLib;
    const rendererOptions = {
      map: this.map
    };
    this.directionsRenderers = new this.routesLib.DirectionsRenderer(rendererOptions);

  }

  clearRenderResults() {
    // Remove previous directions renderers from the map

    this.directionsRenderers.setMap(null);
  }

  async navigationService(start: location, end: location) {
    // if (!this.routes) {

    //   return
    // }
    await this.getDirections(start, end)

    const WKBstringArray: string[] = await getSidewalkAccessibility(this.LatLngLiteralArray);
    const MultiPolygonArrays = WKBArrayToMultiPolygon(WKBstringArray)
    // console.log(MultiPolygonArrays)
    plot(MultiPolygonArrays, this.mapsLib, this.map)

  }
  getDirections = async (start: location, end: location) => {
    const directionsService = new this.routesLib.DirectionsService();
    // console.log(start, end)
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
            this.directionsRenderers.setDirections(result);
            this.currentDirectionsRoute = result.routes[0];
            this.LatLngLiteralArray = this.directionsRouteToLatLngArray(this.currentDirectionsRoute)
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
  directionsRouteToLatLngArray(route: google.maps.DirectionsRoute) {
    return route.legs.flatMap(leg =>
      leg.steps.flatMap(step =>
        step.path.map(latLng => ({ lat: latLng.lat(), lng: latLng.lng() }))
      )
    );
  }


}