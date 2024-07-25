import { useEffect } from "react"
import useStore from "../../store"
export default function PlotGeometry() {
    const { geometryArray } = useStore.getState()
    useEffect(() => {

    }, [geometryArray])
    return (
        <div>
            {geometryArray && geometryArray.map((geometry, index) => (
                <div key={index} className="geometry-item">
                    <p>Type: {geometry.type}</p>
                    <p>Landmark Type: {geometry.landmarkType}</p>
                    <p>Coordinates: Longitude {geometry.coordinates[0]}, Latitude {geometry.coordinates[1]}</p>
                </div>
            ))}
        </div>
    )
}
