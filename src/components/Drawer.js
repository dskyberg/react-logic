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
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import TableRowsIcon from '@mui/icons-material/TableRows';
import SaveIcon from '@mui/icons-material/Save';
import FileOpenIcon from '@mui/icons-material/FileOpen';

import { ReactComponent as AndSvg } from '../assets/and.svg';
import { ReactComponent as NandSvg } from '../assets/nand.svg';
import { ReactComponent as CircleSvg } from '../assets/circle.svg';
import { ReactComponent as OrSvg } from '../assets/or.svg';
import { ReactComponent as NorSvg } from '../assets/nor.svg';
import { ReactComponent as XorSvg } from '../assets/xor.svg';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import ConfirmationDialog from './ConfirmationDialog';
import TruthTableDialog from './TruthTableDialog';
import FileOpenDialog from './FileOpenDialog';
import saveLocalFile from '../util/saveLocalFile';

import Draggable from 'react-draggable';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


export default function Drawer() {
    const { drawerOpen, toggleDrawerOpen } = useAppStore();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [tableOpen, setTableOpen] = useState(false);
    const [openFileDialogOpen, setOpenFileDialogOpen] = useState(false);
    const { reset, fromJson, toJson } = useRfStore();

    const onDragStart = (event, nodeType) => {
        console.log({ event, nodeType })
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const handleReset = () => {
        setDialogOpen(true)
    }

    const handleConfirm = (value) => {
        setDialogOpen(false);
        if (value) {
            reset();
        }
    }

    const handleTable = () => {
        setTableOpen(false)
    }


    const handleFileOpen = (files) => {
        setOpenFileDialogOpen(false);
        if (files !== undefined && files.length > 0) {
            // The file is b64 encoded.  Decode it
            const text = atob(files[0].path.split(',')[1]);
            fromJson(text);
        }
    }

    const handleFileSave = () => {
        const defaultFileName = 'react-logic-state.json';
        const text = toJson();
        saveLocalFile(text, defaultFileName)
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
                        <ListItemButton onClick={() => { setOpenFileDialogOpen(true) }}>
                            <ListItemIcon>
                                <FileOpenIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Open File'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton onClick={handleFileSave}>
                            <ListItemIcon>
                                <SaveIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Save As'} />
                        </ListItemButton>
                    </ListItem>

                </List>

                <Divider />

                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <div draggable onDragStart={(event) => onDragStart(event, 'switch')}>
                                    <CircleSvg
                                        style={{ width: 30 }} />

                                </div>
                            </ListItemIcon>
                            <ListItemText primary={'Switch'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <div draggable onDragStart={(event) => onDragStart(event, 'and')}>
                                    <AndSvg style={{ width: 30 }} />
                                </div>
                            </ListItemIcon>
                            <ListItemText primary={'And'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <div draggable onDragStart={(event) => onDragStart(event, 'nand')}>
                                    <NandSvg style={{ width: 30 }} />
                                </div>
                            </ListItemIcon>
                            <ListItemText primary={'Nand'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <div draggable onDragStart={(event) => onDragStart(event, 'or')}>
                                    <OrSvg style={{ width: 30 }} />
                                </div>
                            </ListItemIcon>
                            <ListItemText primary={'Or'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <div draggable onDragStart={(event) => onDragStart(event, 'nor')}>
                                    <NorSvg style={{ width: 30 }} />
                                </div>
                            </ListItemIcon>
                            <ListItemText primary={'Nor'} />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <div draggable onDragStart={(event) => onDragStart(event, 'xor')}>
                                    <XorSvg style={{ width: 30 }} />
                                </div>
                            </ListItemIcon>
                            <ListItemText primary={'Xor'} />
                        </ListItemButton>
                    </ListItem>
                </List>

                <Divider />

                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => { setTableOpen(true) }}>
                            <ListItemIcon>
                                <TableRowsIcon />
                            </ListItemIcon>
                            <ListItemText>Truth Tabes</ListItemText>
                        </ListItemButton>
                    </ListItem>

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
                >
                    <Typography>This will remove all your content.</Typography>
                    <Typography>Are you sure?</Typography>
                </ConfirmationDialog>
                <TruthTableDialog
                    keepMounted
                    open={tableOpen}
                    onClose={handleTable}
                />
                <FileOpenDialog
                    keepMounted
                    open={openFileDialogOpen}
                    onClose={handleFileOpen}
                />

            </MuiDrawer >

        </>
    )
}
