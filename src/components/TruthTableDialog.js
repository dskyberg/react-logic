import * as React from 'react';
import { styled } from '@mui/material/styles';

import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { and, nand, or, xor, nor } from '../util/gates';

const StyledCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.light
}));

const CenterCell = styled(TableCell)(({ theme }) => ({
    borderLeft: '1px solid rgba(224, 224, 224, 1)',
    borderRight: '1px solid rgba(224, 224, 224, 1)',
}));

const CenterHeaderCell = styled(TableCell)(({ theme }) => ({
    borderRight: '1px solid rgba(224, 224, 224, 1)',
}));

const truth = (value) => value ? '1' : '0';

const TruthTable = ({ label, tfn }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledCell>{label}</StyledCell>
                        <CenterHeaderCell>0</CenterHeaderCell>
                        <TableCell>1</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>0</TableCell>
                        <CenterCell>{truth(tfn(false, false))}</CenterCell>
                        <TableCell>{truth(tfn(false, true))}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <CenterCell>{truth(tfn(true, false))}</CenterCell>
                        <TableCell>{truth(tfn(true, true))}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>

    )
}

export default function ConfirmationDialog(props) {
    const { open, onClose, ...other } = props;

    const handleOk = () => {
        onClose();
    };

    return (
        <Dialog
            maxWidth="xl"
            open={open}
            {...other}
        >
            <DialogTitle>Truth Tables</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item>
                        <TruthTable label="And" tfn={and} />
                    </Grid>
                    <Grid item>
                        <TruthTable label="Nand" tfn={nand} />
                    </Grid>
                    <Grid item>
                        <TruthTable label="Or" tfn={or} />
                    </Grid>
                    <Grid item>
                        <TruthTable label="Xor" tfn={xor} />
                    </Grid>
                    <Grid item>
                        <TruthTable label="Nor" tfn={nor} />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOk}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
