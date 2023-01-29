/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, CircularProgress, Slide, TextField, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { AUSCodeToName, averageArrayNumber, USCodeToName } from "../utils/convertors";
import {ReactComponent as BlizzardIcon} from "../images/icons/blizzard.svg";
import {ReactComponent as CloudyIcon} from "../images/icons/cloudy.svg";
// import {ReactComponent as ClearAtTimesIcon} from "../images/icons/clear-at-times.svg";
import {ReactComponent as MistIcon} from "../images/icons/mist.svg";
import {ReactComponent as PartlyCloudyIcon} from "../images/icons/partly-cloudy.svg";
import {ReactComponent as RainIcon} from "../images/icons/rain.svg";
import {ReactComponent as SnowIcon} from "../images/icons/snow.svg";
import {ReactComponent as SunnyIcon} from "../images/icons/sunny.svg";
// import {ReactComponent as ThunderstormIcon} from "../images/icons/thunderstorm.svg";
import axios from "axios";
import { CityListItem } from "./CityListItem";

const regionNames = new Intl.DisplayNames(
    ['en'], {type: 'region'}
  );

interface CountryDetailsProps {
    countryCode: string;
    setCountryCode: React.Dispatch<React.SetStateAction<string>>;
    continent: "europe" | "northAmerica" | "southAmerica" |"asia" |"africa" |"australia";
}

export const CountryDetailsPopUp: React.FC<CountryDetailsProps> = ({countryCode, setCountryCode, continent}) => {
    const [data, setData] = useState<any>();
    const ThreeDaysForecastAvgTemp = useMemo(() => data ? data.forecast.forecastday.map((fc: any)=> {return {date: fc.date, condition: fc.day.condition.text, averageTemp: averageArrayNumber(fc.hour.map((hourForecast: any) => hourForecast.temp_c))}}) : null, [data]);
    const preciseCityName = useMemo(()=> data ? data.location.name : null, [data]);
    const preciseCountryOrStateName = useMemo(()=> continent === "northAmerica" ? USCodeToName(countryCode) : continent === "africa" || continent === "southAmerica" ? countryCode : continent === "australia" ? AUSCodeToName(countryCode) : regionNames.of(countryCode), [countryCode]);
    const [citiesList, setCitiesList] = useState<string[]>([]);
    const [searchedCityValue, setSearchedCityValue] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const filteredCities = useMemo(()=> searchedCityValue === "" ? citiesList.map((city, index) => <CityListItem setCitySearch={setSelectedCity} key={`city_${index}`} cityName={city.split(",")[0]} />).filter((city, index) => index <= 10) : citiesList.filter((city) => city.includes(searchedCityValue)).map((city, index) => <CityListItem setCitySearch={setSelectedCity} key={`city_${index}`} cityName={city.split(",")[0]} />).filter((city, index) => index <= 25), [searchedCityValue, citiesList]);

    useEffect(()=> {
        selectedCity !== "" ? 
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${`${selectedCity}, ${preciseCountryOrStateName}`}&days=3&aqi=no&alerts=no`).then(async (response)=> {
            const data = await response.json();
            setData(data);
        }) : setData(undefined);
    }, [selectedCity]);

    useEffect(()=> {
        setCitiesList([]);
        setSelectedCity("");
        if (preciseCountryOrStateName && preciseCityName !== "") {
           const data = continent === "northAmerica" ? {'country': regionNames.of(countryCode.includes("-") ? countryCode.split("-")[0].toUpperCase() : countryCode.includes("_") ? countryCode.split("_")[0].toUpperCase() : countryCode), 'state': `${preciseCountryOrStateName}`} : continent === "australia" ? {'country': 'Australia', 'state': `${preciseCountryOrStateName}`} : {'country': `${preciseCountryOrStateName}`};
           console.log(data);
            axios({method: 'post', headers: {}, url: `https://countriesnow.space/api/v0.1/countries${continent === "northAmerica" ? '/state' : ''}/cities`, data: data}).then((response) => {
                const responseData = response.data;
                const cities = responseData.data;
                setCitiesList(cities.map((city: string)=> `${city.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}, ${preciseCountryOrStateName}`));
            })
        }
    }, [countryCode]);
    return <Slide direction="up" in={countryCode !== "" ? true : false}>
        <Box position={"fixed"} bottom="30px" sx={{width: "90%", height: "350px", backgroundColor: "#FFFFFF", borderRadius: "8px", display: "flex", flexDirection: "column", alignItems: "center", zIndex: "2"}}>
            <Box sx={{width: "95%", display: "flex", justifyContent: "flex-end", mt: "5px"}}>
                <Button variant="contained" onClick={()=> setCountryCode("")}>Close</Button>
            </Box>
            {citiesList.length > 0 && 
            <>
                <Typography variant="h4">{preciseCountryOrStateName}</Typography>
                <Typography variant="h6">{selectedCity === "" ? "Select a City" : preciseCityName}</Typography>
                {preciseCityName && <Box sx={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
                    {ThreeDaysForecastAvgTemp[0].condition.toLowerCase().includes('rain') && <RainIcon />}
                    {ThreeDaysForecastAvgTemp[0].condition.toLowerCase().includes('cloudy') && !ThreeDaysForecastAvgTemp[0].condition.toLowerCase().includes('partly') && <CloudyIcon />}
                    {ThreeDaysForecastAvgTemp[0].condition.toLowerCase().includes('cloudy') && ThreeDaysForecastAvgTemp[0].condition.toLowerCase().includes('partly') && <PartlyCloudyIcon />}
                    {ThreeDaysForecastAvgTemp[0].condition.toLowerCase().includes('sunny') && <SunnyIcon />}
                    {ThreeDaysForecastAvgTemp[0].condition.toLowerCase().includes('mist') && <MistIcon />}
                    {ThreeDaysForecastAvgTemp[0].condition.toLowerCase().includes('snow') && !ThreeDaysForecastAvgTemp[0].condition.toLowerCase().includes('heavy') && <SnowIcon />}
                    {ThreeDaysForecastAvgTemp[0].condition.toLowerCase().includes('snow') && ThreeDaysForecastAvgTemp[0].condition.toLowerCase().includes('heavy') && <BlizzardIcon />}
                    <Typography variant="h4">{ThreeDaysForecastAvgTemp[0].condition}</Typography>
                </Box>}
                <TextField placeholder="Search for more cities" value={searchedCityValue} onChange={(e) => setSearchedCityValue(e.target.value)}/>
                <Box sx={{width: "auto", height: "50%", overflowY: "scroll", overflowX: "hidden"}}>
                {citiesList.length > 0 && filteredCities}
                <Box textAlign="center"><Typography>Search for more</Typography></Box>
                </Box>
            </>}
            {citiesList.length === 0 && <CircularProgress variant="indeterminate" />}
        </Box>
    </Slide>;
}