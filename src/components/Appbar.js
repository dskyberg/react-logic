import * as React from 'react';
import useAppStore from '../util/useAppStore';

import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import MenuIcon from '@mui/icons-material/Menu';
import GitHubIcon from '@mui/icons-material/GitHub';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MapIcon from '@mui/icons-material/Map';

export default function AppBar() {
    const { drawerOpen, toggleDrawerOpen, toggleAboutOpen, mapOpen, toggleMapOpen } = useAppStore();
    return (
        <MuiAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => { toggleDrawerOpen(!drawerOpen) }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Swanky Logic Board
                </Typography>
                <Tooltip title="Go to the GitHub repo.">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => { window.open('https://www.github.com/dskyberg/react-logic') }}
                    >
                        <GitHubIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Show the help screen">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => { toggleAboutOpen(true) }}
                    >
                        <HelpOutlineIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Toggle the mini map, in the lower right corner">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => { toggleMapOpen(!mapOpen) }}
                    >
                        <MapIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar >
        </MuiAppBar >
    );
}