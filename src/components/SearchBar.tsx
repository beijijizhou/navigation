import React, { useEffect, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import useStore from "../store";
import { PositionMarker } from "./PositionMarker";
export default function SearchBar() {

    const setDestination = useStore((state) => state.setDestination);
    const [inputValue, setInputValue] = useState("");
    const placesLibrary = useMapsLibrary("places");
    const [service, setService] = useState<google.maps.places.AutocompleteService | null>(null);
    const [predictions, setPredictions] = useState<Array<google.maps.places.QueryAutocompletePrediction> | []>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number>(0);


    useEffect(() => {
        if (placesLibrary) {
            setService(new placesLibrary.AutocompleteService());
        }

    }, [placesLibrary]);

    const updatePredictions = (inputValue: string) => {
        if (!service || inputValue.length === 0) {
            setPredictions([]);
            return;
        }
        const request = { input: inputValue };
        service.getQueryPredictions(request, (res) => {
            setPredictions(res || []);
        });
    };

    const onInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const value = ev.target.value;
        setInputValue(value);
        updatePredictions(value);
    };

    const handleSelectedPlace = (place: google.maps.places.QueryAutocompletePrediction) => {
        setInputValue(place.description);
        setDestination(place.description)
        // console.log(place.description)
        setPredictions([]);
    };

    const handleMouseEnter = (index: number) => {
        console.log("mouse enter");
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        console.log("mouse leave");
        setHoveredIndex(-1);
    };

    if (!service) return null;

    return (
        <div style={{ margin: "10px", position: "relative" }}>
            <h4>Search By Name</h4>
            <div style={{ marginBottom: "10px" }}>
                <input
                    type="text"
                    placeholder="Search destination"
                    value={inputValue}
                    onChange={onInputChange}
                    style={{
                        width: "100%",
                        padding: "10px",
                        boxSizing: "border-box",
                        marginBottom: "5px",
                    }}
                />
                {predictions.length > 0 && (
                    <div className="suggestions">
                        {predictions.map((place, index) => (
                            <div
                                key={place.place_id}
                                className={`suggestion-item ${hoveredIndex === index ? "hover" : ""}`}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleSelectedPlace(place)}
                            >
                                {place.description}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <button
                    onClick={() => console.log("Search for " + inputValue)}
                    style={{
                        width: "100%",
                        padding: "10px 15px",
                        fontSize: "1rem",
                    }}
                >
                    Search
                </button>
            </div>
            <PositionMarker></PositionMarker>
        </div>
    );
}
