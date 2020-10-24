import React, { useState, useRef, useEffect } from "react"
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography } from "@material-ui/core"
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

function TermsDialog({ open, onAccept, onReject, onClose }) {
    const dialogRef = useRef()
    
    const classes = useStyles()

    const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false)

    useEffect(() => {
        if (!open) {
            return
        }

        (async () => {
            await new Promise(requestAnimationFrame)

            if (!dialogRef.current) {
                return
            }

            const content = dialogRef.current.querySelector("." + classes.innerDialog)

            const handleScroll = () => {
                if (content.getBoundingClientRect().height + content.scrollTop >= content.scrollHeight) {
                    setHasScrolledToBottom(true)
                    content.removeEventListener("scroll", handleScroll)
                }
            }

            content.addEventListener("scroll", handleScroll)

            handleScroll()
        })()

        // eslint-disable-next-line
    }, [open])

    const handleClose = () => {
        setHasScrolledToBottom(false)
        onReject()
    }
    
    return (
        <Dialog open={open} onClose={handleClose} ref={ref => dialogRef.current = ref}>
            <DialogTitle>Terms and conditions</DialogTitle>

            <DialogContent className={classes.innerDialog}>
                <Typography variant="h6">1. Terms</Typography>

                <DialogContentText>
                    By accessing our app, Meme Bros, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing Meme Bros. The materials contained in Meme Bros are protected by applicable copyright and trademark law.
                </DialogContentText>

                <Typography variant="h6">2. Use License</Typography>

                <DialogContentText>
                    Permission is granted to temporarily download one copy of Meme Bros per device for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </DialogContentText>

                <DialogContentText>
                    modify or copy the materials;
                </DialogContentText>
                <DialogContentText>
                    use the materials for any commercial purpose, or for any public display (commercial or non-commercial);
                </DialogContentText>
                <DialogContentText>
                    attempt to decompile or reverse engineer any software contained in Meme Bros;
                </DialogContentText>
                <DialogContentText>
                    remove any copyright or other proprietary notations from the materials; or
                </DialogContentText>
                <DialogContentText>
                    transfer the materials to another person or "mirror" the materials on any other server.
                </DialogContentText>

                <DialogContentText>
                    This license shall automatically terminate if you violate any of these restrictions and may be terminated by Meme Bros at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
                </DialogContentText>

                <Typography variant="h6">3. Disclaimer</Typography>

                <DialogContentText>
                    The materials within Meme Bros are provided on an 'as is' basis. Meme Bros makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </DialogContentText>
                <DialogContentText>
                    Further, Meme Bros does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to Meme Bros.
                </DialogContentText>

                <Typography variant="h6">4. Limitations</Typography>

                <DialogContentText>
                    In no event shall Meme Bros or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use Meme Bros, even if Meme Bros or a Meme Bros authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
                </DialogContentText>

                <Typography variant="h6">5. Accuracy of materials</Typography>

                <DialogContentText>
                    The materials appearing in Meme Bros could include technical, typographical, or photographic errors. Meme Bros does not warrant that any of the materials on Meme Bros are accurate, complete or current. Meme Bros may make changes to the materials contained in Meme Bros at any time without notice. However Meme Bros does not make any commitment to update the materials.
                </DialogContentText>

                <Typography variant="h6">6. Links</Typography>

                <DialogContentText>
                    Meme Bros has not reviewed all of the sites linked to its app and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Meme Bros of the site. Use of any such linked website is at the user's own risk.
                </DialogContentText>

                <Typography variant="h6">7. Modifications</Typography>

                <DialogContentText>
                    Meme Bros may revise these terms of service for its app at any time without notice. By using Meme Bros you are agreeing to be bound by the then current version of these terms of service.
                </DialogContentText>

                <Typography variant="h6">8. Governing Law</Typography>

                <DialogContentText>
                    These terms and conditions are governed by and construed in accordance with the laws of Hamburg, Germany and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
                </DialogContentText>

                <Typography variant="h6">9. Uploading images</Typography>

                <DialogContentText>
                    By posting an image or creating a link for it, it will be uploaded to our servers and therefor be publicly accessible.
                    We will store your IP address and are allowed to hand it to third-parties if you violate against these terms and conditions.
                </DialogContentText>

                <DialogContentText>
                    Your image must meet the following terms and conditions:
                </DialogContentText>

                <DialogContentText>
                    Only upload images that are relevant and appropriate to the product and that meet intellectual property, privacy, and other applicable laws.
                </DialogContentText>

                <DialogContentText>
                    You must hold the copyright of the images that you are uploading.
                    Images that are considered to infringe the copyright or trademarks of other individuals, organizations or companies will not be permitted and will be removed.
                    You must acknowledge that you have sufficient written permission (if necessary) of any recognizable locations or people appearing in the image to be able 
                    to grant us permission to use it on our website. If you think that your copyright to an image on our website has been infringed, please contact us.
                </DialogContentText>

                <DialogContentText>
                    You must not upload photographs that contain objectionable content, including but not limited to nudity, violence, and other offensive, illegal or
                    inappropriate images. Also, images cannot contain advertisement or links.
                </DialogContentText>

                <DialogContentText>
                    By uploading an image to "Meme Bros", you permit us, the unrestricted, perpetual, worldwide,
                    non-transferable, royalty-free right and license to display, exhibit, transmit, reproduce, record, digitize, modify, alter, adapt,
                    create derivative works, exploit and otherwise use and permit others to use in connection with the image uploaded, in all languages and all media,
                    whether now known or hereinafter devised, including without limitation on the Internet, 
                    on mobile platforms and/or devices, in printed materials, and in the advertising, publicity and promotion thereof.
                </DialogContentText>

                <DialogContentText>
                    You should bear in mind that by uploading an image to our website, you agree to indemnify us from any liability resulting from breaches
                    of copyright of the image existing online on our website in digital form.
                </DialogContentText>

                <DialogContentText>
                    You also understand and agree that nothing in this agreement obligates "Meme Bros" to display your images.
                    Images must be relevant and appropriate.
                </DialogContentText>

                <DialogContentText>
                    "Meme Bros" reserves the right in its sole and absolute discretion to alter these terms at any time for any reason without prior notice,
                    or to terminate the image upload service for any reason at any time without prior notice.
                </DialogContentText>

                <DialogContentText>
                    "Meme Bros" also reserves the right to reject and remove any uploaded images from its servers, for any reason, at any time, without prior notice.
                </DialogContentText>

                <DialogContentText>
                    <a href="https://getterms.io" title="Generate a free terms of use document">Terms of Use created with GetTerms.</a>
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                { onAccept && onReject ? (
                    <>
                        <Button color="primary" onClick={handleClose} disabled={!hasScrolledToBottom}>
                            Decline
                        </Button>

                        <Button color="primary" onClick={onAccept} disabled={!hasScrolledToBottom}>
                            Agree
                        </Button>
                    </>
                ) : (
                    <Button color="primary" onClick={() => {
                        setHasScrolledToBottom(false)
                        onClose()
                    }}>
                        Close
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    )
}

export default TermsDialog