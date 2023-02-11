import React, { useState } from 'react';

import useRfStore from '../util/useRfStore';

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { styled } from '@mui/material/styles';


import useAppStore from '../util/useAppStore';

import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { ReactComponent as AndSvg } from '../assets/and.svg';
import { ReactComponent as NandSvg } from '../assets/nand.svg';
import { ReactComponent as CircleSvg } from '../assets/circle.svg';
import { ReactComponent as OrSvg } from '../assets/or.svg';
import { ReactComponent as NorSvg } from '../assets/nor.svg';
import { ReactComponent as XorSvg } from '../assets/xor.svg';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import ConfirmationDialog from './ConfirmationDialog';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
};

export default function Drawer() {
    const { drawerOpen, toggleDrawerOpen } = useAppStore();
    const [dialogOpen, setDialogOpen] = useState(false);
    const { reset } = useRfStore();

    const handleReset = () => {
        setDialogOpen(true)
    }

    const handleConfirm = (value) => {
        setDialogOpen(false);
        if (value) {
            reset();
        }
    }

    return (
        <>
            <MuiDrawer
                variant="persistent"
                anchor="left"
                open={drawerOpen}
                css={css`width: 170;`}
            >
                <DrawerHeader>
                    <IconButton onClick={() => toggleDrawerOpen(false)}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon
                                onDragStart={(event) => onDragStart(event, 'switch')}
                                draggable
                            >
                                <CircleSvg
                                    style={{ width: 30 }} bg="white"
                                />
                            </ListItemIcon>
                            <ListItemText primary={'Switch'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon
                                onDragStart={(event) => onDragStart(event, 'and')}
                                draggable
                            >
                                <AndSvg
                                    style={{ width: 30 }} bg="white"
                                />
                            </ListItemIcon>
                            <ListItemText primary={'And'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon
                                onDragStart={(event) => onDragStart(event, 'nand')}
                                draggable
                            >
                                <NandSvg
                                    style={{ width: 30 }} bg="white"
                                />
                            </ListItemIcon>
                            <ListItemText primary={'Nand'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon
                                onDragStart={(event) => onDragStart(event, 'or')}
                                draggable
                            >
                                <OrSvg
                                    style={{ width: 30 }} bg="white"
                                />
                            </ListItemIcon>
                            <ListItemText primary={'Or'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon
                                onDragStart={(event) => onDragStart(event, 'nor')}
                                draggable
                            >
                                <NorSvg
                                    style={{ width: 30 }} bg="white"
                                />
                            </ListItemIcon>
                            <ListItemText primary={'Nor'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon
                                onDragStart={(event) => onDragStart(event, 'xor')}
                                draggable
                            >
                                <XorSvg
                                    style={{ width: 30 }} bg="white"
                                />
                            </ListItemIcon>
                            <ListItemText primary={'Xor'} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />

                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleReset}>
                            <ListItemIcon>
                                <RestartAltIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Reset'} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <ConfirmationDialog
                    keepMounted
                    open={dialogOpen}
                    onClose={handleConfirm}
                />

            </MuiDrawer >

        </>
    )
}
