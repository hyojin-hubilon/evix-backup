import { Modal, Box, Typography, Button, Theme, SxProps } from "@mui/material";
import { ReactEventHandler, ReactNode } from "react";

type SimpleModalProps = {
	isOpen: boolean;
	handleOpen?: ReactEventHandler;
	title?: ReactNode | string;
	text?: ReactNode | string;
	style?: SxProps<Theme>;
	buttonText?: ReactNode | string;
	handleClick? : ReactEventHandler;
};

function SimpleModal({ isOpen, handleOpen, title, text, style, buttonText, handleClick }: SimpleModalProps) {
    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleOpen ? handleOpen : undefined}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style}>
                    {title ? (
                        <Typography id="modal-description" sx={{ mt: 2 }}>
                            {title}
                        </Typography>
                    ) : undefined}
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        {text}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClick ? handleClick : undefined}
                        sx={{ mt: 5 }}
                    >
                        {buttonText}
                    </Button>
                </Box>
            </Modal>
        </div>
    );
}

export default SimpleModal;
