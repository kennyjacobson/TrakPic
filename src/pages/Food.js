
import { Typography } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import TakePicture from "../components/TakePicture"

const Food = () => {
    return (
        <>
            <Box sx={{display:"flex",justifyContent:"center",alignItems: "center"}}>
                <Typography>Food</Typography>   
            </Box>

            <Box sx={{display:"flex",justifyContent:"center",alignItems: "center"}}>
                <TakePicture pictureType={"Food"}/> 
            </Box>

            <Box sx={{display:"flex",justifyContent:"center",alignItems: "center"}}>
                <Box>List</Box>   
            </Box>


        </>
        
        

    )
}

export default Food