import { LandmarkType } from "../Type"

export const destinationFlagURL =
    "https://img.icons8.com/?size=100&id=2755&format=png&color=000000"
export const originURL = "https://img.icons8.com/?size=100&id=HZC1E42sHiI3&format=png&color=000000"
export const treeURL = "https://img.icons8.com/?size=100&id=65474&format=png&color=000000"
export const fireHyrantURL = "https://img.icons8.com/?size=100&id=11919&format=png&color=000000"
export const goodConditionURL = "https://img.icons8.com/?size=100&id=123575&format=png&color=40C057"
export const conditionMissURL = "https://img.icons8.com/?size=100&id=4Vl1KmhbCXoZ&format=png&color=000000"
export const defectiveConditionURL = "https://img.icons8.com/?size=100&id=j1rPetruM5Fl&format=png&color=000000"
export const knobPullURL = "https://img.icons8.com/?size=100&id=kP9Ptp3EAWzG&format=png&color=000000"
export const landmarkURLMap: { [key in LandmarkType]: string } = {
    [LandmarkType.KnobPull]: knobPullURL,
    [LandmarkType.DoorDouble]: "", // Default URL or specific URL if available
    [LandmarkType.DoorSingle]: "", // Default URL or specific URL if available
    [LandmarkType.DoorRevolving]: "", // Default URL or specific URL if available
    [LandmarkType.Stairs]: "", // Default URL or specific URL if available
    [LandmarkType.FireHydrant]: fireHyrantURL,
    [LandmarkType.Sidewalk]: "", // Default URL or specific URL if available
    [LandmarkType.Building]: "", // Default URL or specific URL if available
    [LandmarkType.KnobNoSubtype]: "", // Default URL or specific URL if available
    [LandmarkType.Tree]: treeURL,
    [LandmarkType.PedestrianRampwayConditionMissing]: conditionMissURL,
    [LandmarkType.PedestrianRampwayGoodCondition]: goodConditionURL,
    [LandmarkType.PedestrianRampwayDefective]: defectiveConditionURL,
    [LandmarkType.KnobVerticalBar]: "",
};