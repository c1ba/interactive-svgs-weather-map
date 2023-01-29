/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDraggableScroll from "use-draggable-scroll";
import { CountryDetailsPopUp } from "../components/CountryDetailsPopUp";
import {ReactComponent as EuropeMap} from "../images/europe.svg";
import {ReactComponent as NAMap} from "../images/north_america.svg";
import {ReactComponent as AfricaMap} from "../images/africa.svg";
import {ReactComponent as AsiaMap} from "../images/asia.svg";
import { randomHexColorGenerator } from "../utils/convertors";

interface ContinentMapProps {
    continent: "europe" | "northAmerica" | "southAmerica" |"asia" |"africa" |"australia"
}

export const ContinentMap: React.FC<ContinentMapProps> = ({continent}) => {
    const mapRef = useRef<any>(null);
    const iFrameRef = useRef<any>(null);
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const minimumWidth = useMediaQuery('(min-width:800px)');
    const {onMouseDown} = useDraggableScroll(mapRef);
    const navigate = useNavigate();
  
    useEffect(()=> {
      if (mapRef && mapRef !== null) {
        const mapCurrent = mapRef.current;
        if (mapCurrent) {
         iFrameRef.current.contentWindow.document.body.appendChild(mapCurrent);
         if (continent !== "asia" && continent !== "europe") {
          iFrameRef.current.contentWindow.document.body.style.position = "absolute"
         }
         const svgDocument = iFrameRef.current.contentWindow.document.body.children[0];
         console.log(svgDocument);
        const countriesSVGs = continent === "africa" ? Array.from(svgDocument.children[3].children as HTMLCollection) : Array.from(svgDocument.children as HTMLCollection);
        continent === "europe" && countriesSVGs.splice(-3);
        console.log(countriesSVGs);

        const SVGArray: any[] = [];
        continent === "northAmerica" ? countriesSVGs.forEach((child: any)=> {
          const statesSVGs = Array.from(child.children as HTMLCollection);
          statesSVGs.forEach((stateChild) => SVGArray.push(stateChild));
        }) :  countriesSVGs.forEach((child: any) => SVGArray.push(child));

          SVGArray.forEach((child: any)=> {
              const colorGenerated = randomHexColorGenerator();
              child.style.fill = `${colorGenerated}`;
              if (continent === "asia") {
                child.id = child.id.toUpperCase();
              }
              if (child.getAttribute('clickListener') !== true) {
                  child.addEventListener("click", (e: any) => {
                  setSelectedCountry(child.id);
                  const elementClicked = e.target;
                  elementClicked.setAttribute('clickListener', 'true');
                  });
               }
              if (child.getAttribute('mouseOverListener') !== true) {
                  child.addEventListener("mouseover", (e: any) => {
                  child.style.fill = `red`;
                  const elementClicked = e.target;
                  elementClicked.setAttribute('mouseOverListener', 'true');
                  });
               }
              if (child.getAttribute('mouseOutListener') !== true) {
                 child.addEventListener("mouseout", (e: any) => {
                 child.style.fill = `${colorGenerated}`;
                 const elementClicked = e.target;
                 elementClicked.setAttribute('mouseOutListener', 'true');
                 });
               }
           });
      }
    }
  }
  ,[mapRef]);

    return <Box style={{width: "100vw", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center"}}>
        <CountryDetailsPopUp continent={continent} countryCode={`${selectedCountry}`} setCountryCode={setSelectedCountry}/>
        <Box sx={{width: "90%", display: "flex", justifyContent: "flex-start", mt: "15px", position: "absolute", zIndex: "2"}}><Button onClick={()=> navigate("..")} variant="contained">Back</Button></Box>
        {continent === "europe" && <EuropeMap  style={{width: minimumWidth ? "100%" : "calc(100% + 100%)", height: "100%"}} ref={mapRef} onMouseDown={onMouseDown}/>}
        {continent === "northAmerica" && <NAMap  style={{width: minimumWidth ? "100%" : "calc(100% + 100%)", height: "100%"}} ref={mapRef} onMouseDown={onMouseDown}/>}
        {continent === "asia" && <AsiaMap  style={{width: minimumWidth ? "100%" : "calc(100% + 100%)", height: "100%"}} ref={mapRef} onMouseDown={onMouseDown}/>}
        {continent === "africa" && <AfricaMap  style={{width: minimumWidth ? "100%" : "calc(100% + 100%)", height: "100%"}} ref={mapRef} onMouseDown={onMouseDown}/>}
        <iframe ref={iFrameRef} style={{width: "100%", height: "100%", border: "none", zIndex: "1",  overflow: "scroll"}} title="Europe Map"/>
    </Box>;
}