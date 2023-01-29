import React from "react";
import { Route, Routes } from "react-router";
import App from "./App";
import { ContinentMap} from "./pages/MapDividedByCountry";

export const AppRoutes: React.FC = () => {
    return <Routes>
        <Route path="interactive-svgs-weather-map" element={<App />}></Route>
        <Route path="interactive-svgs-weather-map/europe" element={<ContinentMap continent="europe" />}></Route>
        <Route path="interactive-svgs-weather-map/australia" element={<ContinentMap continent="australia" />}></Route>
        <Route path="interactive-svgs-weather-map/asia" element={<ContinentMap continent="asia" />}></Route>
        <Route path="interactive-svgs-weather-map/africa" element={<ContinentMap continent="africa" />}></Route>
        <Route path="interactive-svgs-weather-map/north_america" element={<ContinentMap continent="northAmerica" />}></Route>
        <Route path="interactive-svgs-weather-map/south_america" element={<ContinentMap continent="southAmerica" />}></Route>
    </Routes>;
}