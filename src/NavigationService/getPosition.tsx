import useStore from "../store";
interface PositionError {
  code: number;
  message: string;
}

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

export const getPosition = async (): Promise<google.maps.LatLngLiteral | null | undefined> => {
  const {origin, setOrigin} = useStore.getState();
  try {
    const position = await getCurrentPosition();
    setOrigin(position)
    return position;
  } catch (error) {
    // console.error('Error fetching position:', error);
    return origin;
  }
};
const getCurrentPosition = (): Promise<google.maps.LatLngLiteral> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(success, handleError, options);
    function success(position: GeolocationPosition) {
      resolve({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    }

    function handleError(error: GeolocationPositionError) {
      const positionError: PositionError = {
        code: error.code,
        message: error.message
      };
      reject(positionError);
    }
  });
};

