import FileUpload from "react-mui-fileuploader"

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';


export default function FileOpenDialog({ open, onClose, ...other }) {

    const handleFileChange = (files) => {
        onClose(files);
    }

    const handleContext = (context) => {
        console.log('handleContext:', context);
    }

    return (
        <Dialog open={open} {...other}>
            <DialogTitle>Open a saved file</DialogTitle>
            <DialogContent>
                <FileUpload
                    getBase64
                    multiFile={false}
                    onFilesChange={handleFileChange}
                    onContextReady={handleContext}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )

}