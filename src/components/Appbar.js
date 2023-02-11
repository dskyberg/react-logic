import * as React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useTheme } from '@mui/material/styles';
import useAppStore from '../util/useAppStore';

import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
const drawerWidth = 136;

const openStyles = (theme, open) => css`
    transition: ${theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
})};
    ${open && `
    width: calc(100% - ${drawerWidth}px);
    marginLeft: ${drawerWidth}px;
    transition: ${theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
})}
    `}
`;

export default function AppBar() {
    const { drawerOpen, toggleDrawerOpen } = useAppStore();
    const theme = useTheme();
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