import React from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@material-ui/core"

function ConfirmDialog({ onClose, open, content }) {
    const handleCancel = () => onClose(false)

    const handleAccept = () => onClose(true)

    return (
        <Dialog
            disableBackdropClick
            disableEscapeKeyDown
            open={open}
        >
            <DialogTitle>Confirm</DialogTitle>
            
            <DialogContent dividers>
                <Typography>{content}</Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleCancel}>Cancel</Button>
                <Button onClick={handleAccept}>Ok</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog