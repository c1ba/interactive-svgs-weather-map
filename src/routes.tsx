import React from "react";
import { Route, Routes } from "react-router";
import App from "./App";
import { ContinentMap} from "./pages/MapDividedByCountry";

export const AppRoutes: React.FC = () => {
    return <Routes>
        <Route path="" element={<App />}></Route>
        <Route path="europe" element={<ContinentMap continent="europe" />}></Route>
        <Route path="australia"><></></Route>
        <Route path="asia" element={<></>}></Route>
        <Route path="africa"><></></Route>
        <Route path="north_america" element={<ContinentMap continent="northAmerica" />}></Route>
        <Route path="south_america"><></></Route>
    </Routes>;
}