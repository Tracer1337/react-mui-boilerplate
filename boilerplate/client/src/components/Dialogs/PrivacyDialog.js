import React from "react"
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    innerDialog: {
        "& p": {
            color: theme.palette.text.primary
        }
    },

    link: {
        color: theme.palette.text.secondary
    }
}))

function TermsDialog({ open, onClose }) {
    const classes = useStyles()

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Privacy Policy</DialogTitle>

            <DialogContent className={classes.innerDialog}>
                <DialogContentText>
                    Your privacy is important to us. It is Meme Bros' policy to respect your privacy regarding any information we may collect from you through our app, Meme Bros.
                </DialogContentText>

                <DialogContentText>
                    We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
                </DialogContentText>

                <DialogContentText>
                    We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
                </DialogContentText>

                <DialogContentText>
                    We don’t share any personally identifying information publicly or with third-parties, except when required to by law.
                </DialogContentText>

                <DialogContentText>
                    Our app may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.
                </DialogContentText>

                <DialogContentText>
                    You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.
                </DialogContentText>

                <DialogContentText>
                    Your continued use of our app will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.
                </DialogContentText>

                <DialogContentText>
                    This policy is effective as of 28 September 2020.
                </DialogContentText>

                <DialogContentText>
                    <a href="https://getterms.io" title="Generate a free privacy policy">Privacy Policy created with GetTerms.</a>
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button color="primary" onClick={onClose}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default TermsDialog