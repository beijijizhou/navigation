export const getOrigin = async ():Promise<google.maps.LatLngLiteral>  => {
    if (!navigator.geolocation) {
      throw new Error("Geolocation is not supported by this browser.");
    }
  
    try {
      const position :google.maps.LatLngLiteral = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          (error) => {
            reject({
              code: error.code,
              message: error.message
            });
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        );
      });
      return position;
    } catch (error: unknown) {
      const err = error as Error;
      throw new Error(`Failed to get location: ${err.message}`);
    }
  };
  