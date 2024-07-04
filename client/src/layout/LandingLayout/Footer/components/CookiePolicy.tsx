import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    List,
    ListItem,
    IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CookiePolicy: React.FC<{ isOpen: boolean; handleOpen: () => void }> = ({
    isOpen,
    handleOpen,
}) => {
    return (
        <Dialog open={isOpen} onClose={handleOpen}>
            <DialogTitle>
                <strong>Cookie Policy</strong>
                <IconButton
                    aria-label="close"
                    onClick={handleOpen}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <List>
                    <ListItem>
                        <Typography variant="body1" gutterBottom>
                            <strong>What are cookies?</strong>
                            <br />
                            When you visit a website such as uMotif.com, the website stores data in
                            small files on your computer, known as cookies. Cookies are used to
                            store information about you and your preferences, so that you don't have
                            to keep re-entering them, and improve your browsing experience.
                        </Typography>
                    </ListItem>

                    <ListItem>
                        <Typography variant="body1" gutterBottom>
                            <strong>How do we use cookies?</strong>
                            <br />
                            There are several different types of cookie:
                        </Typography>
                    </ListItem>

                    <ListItem>
                        <Typography variant="body1" gutterBottom>
                            <strong>Strictly necessary cookies</strong>
                            <br />
                            These cookies are essential to enable you to move around the website and
                            use its features, such as accessing secure areas of the website. Without
                            these cookies, the services you have asked for cannot be provided.
                        </Typography>
                    </ListItem>

                    <ListItem>
                        <Typography variant="body1" gutterBottom>
                            <strong>Session Cookies:</strong> A session cookie is stored in
                            temporary memory and is not retained after the browser is closed.
                            Session cookies do not collect information from the user's computer and
                            contain only a session identifier which is not personally identifiable.
                        </Typography>
                    </ListItem>

                    <ListItem>
                        <Typography variant="body1" gutterBottom>
                            <strong>Authentication Cookies:</strong> If you register and
                            authenticate (log in) to any of uMotif's services you may receive
                            authentication cookies that are used to securely maintain a logged-in
                            state to one or more of our services and will usually expire after a
                            period for your safety. They contain no personally identifiable
                            information.
                        </Typography>
                    </ListItem>

                    <ListItem>
                        <Typography variant="body1" gutterBottom>
                            <strong>Analytics Cookies:</strong> These cookies collect information
                            about how visitors use a website, for instance, which pages visitors go
                            to most often, and if they get error messages from web pages. These
                            cookies don't collect information that identifies a visitor. All
                            information these cookies collect is aggregated and therefore anonymous.
                            It is only used to improve how a website works.
                        </Typography>
                    </ListItem>

                    <ListItem>
                        <Typography variant="body1" gutterBottom>
                            <strong>Preference Cookies</strong>
                            <br />
                            You may store non-personally identifiable preferences such as your
                            preferred language choice so that we can display content in the correct
                            language to you when you use our services.
                        </Typography>
                    </ListItem>
                </List>
            </DialogContent>
        </Dialog>
    );
};

export default CookiePolicy;
