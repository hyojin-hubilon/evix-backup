import * as React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	Typography
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
		<Dialog open={open ? open : false}>
			{
				title && 
				<DialogTitle id="alert-dialog-title" variant="h5">
					{title}
				</DialogTitle>
			}
			
			<DialogContent sx={{minWidth: '360px'}}>
				{
					description && 	<DialogContentText variant="body1">{description}</DialogContentText>
				}
			</DialogContent>
			<DialogActions>
				{variant === "danger" && (
				<>
					<Button color="error" onClick={onClose} autoFocus>
						Cancel
					</Button>
					<Button color="primary" variant="contained" onClick={onSubmit}>
						Yes, I agree
					</Button>
				</>
				)}

				{variant === "info" && (
					<Button color="primary" variant="contained" onClick={onSubmit}>
						OK
					</Button>
				)}

				{variant === undefined && (
					<>
						<Button color="error" onClick={onClose} autoFocus>
							Cancel
						</Button>
						<Button color="primary" variant="contained" onClick={onSubmit}>
							Yes
						</Button>
					</>
					)
				}
			</DialogActions>
		</Dialog>
  	);
};
