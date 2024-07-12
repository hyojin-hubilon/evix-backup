import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import { MemberTempType } from "./MemberManagement";
import { useEffect, useState } from "react";

type DeleteConfirmDialogProps = {
	member : MemberTempType,
	open: boolean,
	handleClose: () => void
}
const DeleteConfirmDialog = ({member, open, handleClose} : DeleteConfirmDialogProps) => {
	const [ mode, setMode ] = useState<'delete' | 'confirmed'>('delete');

	const handleConfirmDelete = () => {
		setMode('confirmed');
	}

	useEffect(() => {
		setTimeout(() => {
			setMode('delete');
		}, 500)
	}, [open])

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="member-delete-dialog-title"
			aria-describedby="member-delete-dialog-description"
			maxWidth="xs"
			>
			<DialogTitle id="member-delete-dialog-title" variant='h5'>
				멤버 삭제
			</DialogTitle>
			<DialogContent>
				<Box minWidth="300px">
					<Typography id="member-delete-dialog-description">
						{
							mode == 'delete' ? 
							<>
								<b>{member.first_name} {member.last_name}</b>님을 멤버에서 삭제하시겠습니까? 
							</>
							:
							<>
								<b>{member.first_name} {member.last_name}</b>님이 멤버에서 삭제되었습니다. 
							</>
						}
					</Typography>
				</Box>
			</DialogContent>
			<DialogActions>
				{
					mode == 'delete' ?
					<>
						<Button variant="outlined" onClick={handleClose}>취소</Button>
						<Button variant="contained" color="error" onClick={handleConfirmDelete}>확인</Button>
					</>

					:

					<>
						<Button variant="contained" color="primary" onClick={handleClose}>확인</Button>
					</>
				}
				
			</DialogActions>
		</Dialog>
	)
}

export default DeleteConfirmDialog;