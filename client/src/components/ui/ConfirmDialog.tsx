import * as React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	Typography,
	Box
} from "@mui/material";

export interface ConfirmationOptions {
	open?: boolean;
	catchOnCancel?: boolean;
	variant?: "danger" | "info" | undefined;
	title?: string | undefined;
	description?: string | undefined;
}

interface ConfirmationDialogProps extends ConfirmationOptions {
	onSubmit: () => void;
	onClose: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
	open,
	title,
	variant,
	description,
	onSubmit,
	onClose
}) => {
  	return (
		<Dialog open={open ? open : false} maxWidth="sm">
			{
				title && 
				<DialogTitle id="alert-dialog-title" variant="h6" fontWeight="bold">
					{ title }
				</DialogTitle>
			}
			
			<DialogContent sx={{minWidth: '360px'}}>
				{
					description && <DialogContentText variant="body1">{description}</DialogContentText>
				}
			</DialogContent>
			<DialogActions sx={{ p: '0 1.5rem 1.5rem'}}>
				{variant === "danger" && (
				<Box display="flex" justifyContent="space-between" width={1}>
					<Button color="error" onClick={onClose} autoFocus>
						Cancel
					</Button>
					<Button color="primary" variant="contained" onClick={onSubmit}>
						Yes
					</Button>
				</Box>
				)}

				{variant === "info" && (
					<Button color="primary" variant="contained" onClick={onSubmit}>
						OK
					</Button>
				)}

				{variant === undefined && (
					<Box display="flex" justifyContent="space-between" width={1}>
						<Button color="error" onClick={onClose} autoFocus>
							Cancel
						</Button>
						<Button color="primary" variant="contained" onClick={onSubmit}>
							Yes
						</Button>
					</Box>
					)
				}
			</DialogActions>
		</Dialog>
  	);
};
