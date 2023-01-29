/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';
import {ReactComponent as Continents} from "./images/Continents.svg";
import './App.css';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const svgIDs = [{path: "europe", color: "#000000"}, {path: "africa", color: "#FFFFFF"}, {path: "asia", color: "#FF0000"}, {path: "north_america", color: "#00FF00"}, {path: "south_america", color: "#0000FF"}, {path: "australia", color: "#0F0F0F"}];

const App:React.FC = () => {

  const continentsMapRef = useRef<any>(null);
  const iFrameRef = useRef<any>(null);
  const navigate = useNavigate();

  useEffect(()=> {
    if (continentsMapRef && continentsMapRef !== null) {
      const mapCurrent = continentsMapRef.current;
      if (mapCurrent) {
       iFrameRef.current.contentWindow.document.body.appendChild(mapCurrent);
       const svgDocument = iFrameRef.current.contentWindow.document.body.children[0];
       for (const id in svgIDs) {
        const continentSVG = svgDocument.getElementById(svgIDs[id].path);
        continentSVG.style.fill = `${svgIDs[id].color}`;
        continentSVG.addEventListener("click", () => {
          navigate(`/${svgIDs[id].path}`);
        })
        continentSVG.addEventListener("mouseover", () => {
          continentSVG.style.fill = `yellow`;
        })
        continentSVG.addEventListener("mouseout", () => {
          continentSVG.style.fill = `${svgIDs[id].color}`;
        })
       }
      }
    }
  }, [continentsMapRef]);

  return (
    <Box className="App" style={{width: "100vw", height: "100vh"}}>
      <Typography variant='h2' sx={{color: "#FFFFFF"}}>Weather Around the World!</Typography>
      <Continents style={{color: 'blue', width: "100%", height: "100%"}} ref={continentsMapRef} />
      <iframe ref={iFrameRef} style={{width: "90%", height: "90%", border: "none"}} title="Continents Map"/>
    </Box>
  );
}

export default App;
