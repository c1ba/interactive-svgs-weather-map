import { Button, Typography } from "@mui/material";
import React from "react";

interface CityListItemProps {
    cityName: string;
    setCitySearch: React.Dispatch<React.SetStateAction<string>>;
}

export const CityListItem: React.FC<CityListItemProps> = ({cityName, setCitySearch}) => {
    return <Button sx={{width: "100%", height: "50px"}} onClick={()=> setCitySearch(cityName)}>
        <Typography>{cityName}</Typography>
    </Button>
}