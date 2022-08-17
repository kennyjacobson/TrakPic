import React, {useState} from "react"
import { AppBar, BottomNavigation, BottomNavigationAction, Box, Button, IconButton, Paper, Toolbar, Typography } from "@mui/material"

import MenuIcon from '@mui/icons-material/Menu';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import MonitorWeightIcon from '@mui/icons-material/MonitorWeight';
import TimelineIcon from '@mui/icons-material/Timeline';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Food from "../pages/Food";
import Weight from "../pages/Weight";
import History from "../pages/History";


const Layout = () => {
    const [bottomMenuSelected, setBottomMenuSelected] = useState(0);

    return (
        <>
        

        <BrowserRouter>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    My App
                </Typography>
                <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>

        <Toolbar ></Toolbar>
        <Box sx={{ml:1, mr:1, border:0}}   >
                
                <Routes>
                    <Route exact path="/" element={<Food/>} />
                    <Route exact path="food" element={<Food/>} />
                    <Route exact path="weight" element={<Weight/>} />
                    <Route exact path="history" element={<History/>} />
                </Routes>

            
            
        </Box>
            
        
        

        <Box >
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    position="fixed"
                    showLabels
                    value={bottomMenuSelected}
                    onChange={(event, newValue) => {
                        setBottomMenuSelected(newValue);
                        console.log(newValue)
                    }}
                >
                    <BottomNavigationAction label="Food" icon={<LocalDiningIcon />} component={Link} to="/food" />
                    <BottomNavigationAction label="Weight" icon={<MonitorWeightIcon />} component={Link} to="/weight"  />
                    <BottomNavigationAction label="History" icon={<TimelineIcon />} component={Link} to="/history" />

                </BottomNavigation>
            </Paper>
        </Box>
        </BrowserRouter>
        </>
    )

    
}

export default Layout