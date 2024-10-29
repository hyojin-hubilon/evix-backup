import { Box, Button, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import { ItemType } from "./ECrfBuilder"
import { EditBox } from "./styles"
import { useEffect, useState } from "react";

type SelectedItemEditType = {
	selectedItem: ItemType;
}
const SelectedItemEdit = ({selectedItem} : SelectedItemEditType) => {
	const [title, setTitle] = useState<string>('');
	const [ description, setDescription] = useState<string>('');

	useEffect(() => {
		if(selectedItem.content) {
			setTitle(selectedItem.content.title);
			if(selectedItem.content.description) setDescription(selectedItem.content.description);
			else setDescription('');
		}
	}, [selectedItem])
	
	
	return (
		<EditBox>
			{
			selectedItem.itemType ?
			<Box>
				<Typography variant="h5">Edit {selectedItem.itemType }</Typography>
				<Stack spacing={1} m="1rem 0 0">
					<OutlinedInput
						size="small"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						/>
					<OutlinedInput
						size="small"
						placeholder="Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						/>
					<Button variant="contained">Save</Button>
				</Stack>
			</Box>
			:
			<Typography variant="h5">Edit Item</Typography>
		}
	</EditBox>
	)
}

export default SelectedItemEdit;