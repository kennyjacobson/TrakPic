import React, {useState} from "react"
import { AppBar, BottomNavigation, BottomNavigationAction, Box, Button, IconButton, Paper, Toolbar, Typography } from "@mui/material"
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuIcon from '@mui/icons-material/Menu';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
    BrowserRouter,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Recents from "../pages/Recents";
import Favorites from "../pages/Favorites";
import Nearby from "../pages/Nearby";


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
                    <Route exact path="/" element={<Recents/>} />
                    <Route exact path="recents" element={<Recents/>} />
                    <Route exact path="favorites" element={<Favorites/>} />
                    <Route exact path="nearby" element={<Nearby/>} />
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
                    <BottomNavigationAction label="Recents" icon={<RestoreIcon />} component={Link} to="/recents" />
                    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} component={Link} to="/favorites"  />
                    <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} component={Link} to="/nearby" />

                </BottomNavigation>
            </Paper>
        </Box>
        </BrowserRouter>
        </>
    )

    
}

export default Layout