import * as React from 'react';
import useAppStore from '../util/useAppStore';

import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function AppBar() {
    const { drawerOpen, toggleDrawerOpen } = useAppStore();
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
                    Logic
                </Typography>
            </Toolbar>
        </MuiAppBar >
    );
}