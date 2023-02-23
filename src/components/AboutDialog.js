import * as React from 'react';
import { styled } from '@mui/material/styles';
import useAppStore from '../util/useAppStore';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';



export default function AboutDialog(props) {
    const { open, ...other } = props;
    const { toggleAboutOpen } = useAppStore();

    const handleOk = () => {
        toggleAboutOpen(false);
    };

    return (
        <Dialog
            maxWidth="xl"
            open={open}
            {...other}
        >
            <DialogTitle>About</DialogTitle>
            <DialogContent>
                <Typography variant="h6">Logic Board</Typography>
                <Typography>From the mind of the mutt himself.</Typography>
                <Typography>Drag gates from the drawer and drop them on the board.  Connect the dot, and throw the switches.  Watch stuff light up!</Typography>
            </DialogContent>
            <Divider />
            <DialogContent>
                <Typography>Copyright &copy; 2023 by David Skyberg</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOk}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
