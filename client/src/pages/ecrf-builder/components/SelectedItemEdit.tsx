import { Box, Button, Checkbox, FormControlLabel, IconButton, OutlinedInput, Stack, TextField, Typography } from "@mui/material";

import { EditBox } from "./styles"
import { ChangeEvent, useEffect, useState } from "react";
import { ItemContents, ItemType, SelectedItem } from "@/types/ecrf";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

type SelectedItemEditType = {
	selectedItem: SelectedItem | ItemType;
	saveChanges: (item) => void;
	fileEdit?:boolean;
}
const SelectedItemEdit = ({selectedItem, saveChanges, fileEdit} : SelectedItemEditType) => {
	const [ title, setTitle ] = useState<string>('');
	const [ desc, setDesc ] = useState<string>('');
	const [ label, setLabel ] = useState<string>('');
	const [ options, setOptions ] = useState<string[]>([]);
	const [ required, setRequired ] = useState<boolean>(false);
	
	const handleSaveChanges = () => {
		const newItem = { ...selectedItem };
		const itemContents = {...selectedItem.content, title: title, description : desc, label: label, options: options, required: required};
		newItem.content = itemContents;
		saveChanges(newItem);
	}

	useEffect(() => {
		const content = selectedItem.content;
		if(content) {
			setTitle(content.title);
			setDesc(content.description ? content.description : '');
			setLabel(content.label ? content.label : '');
			setOptions(content.options ? content.options : []);
			setRequired(content.required ? content.required : false);
		}
		
	}, [selectedItem]);


	const handleOptionChange = (e:string, index:number) => {
		const newOptions = options;
		newOptions[index] = e;
		setOptions([...newOptions]);
	}

	const handleAddOption = () => {
		const newOptions = [...options, ''];
		setOptions(newOptions);
	}

	const handleDeleteOption = (index:number) => {
		const newOptions = options;
		newOptions.splice(index, 1);
		setOptions([...newOptions]);
	}

	const handleChangeRequired = (event:ChangeEvent<HTMLInputElement>) => {
		setRequired(event.target.checked);
	}
	
	
	return (
		<EditBox>
			{
			selectedItem.itemType !== 'Table' ?
			<Box>
				<Typography variant="h5">Edit {selectedItem.itemType}</Typography>
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
						value={desc}
						onChange={(e) => setDesc(e.target.value)}
						/>

					<OutlinedInput
						size="small"
						placeholder="Label"
						value={label}
						onChange={(e) => setLabel(e.target.value)}
						/>
					{
						options.length > 0 && 
						<Stack>
							<Typography variant="h5">Options</Typography>
							{
								options.map((option, index) =>
									<Box key={index} display="flex">
										<OutlinedInput
											size="small"
											value={option}
											onChange={(e) => handleOptionChange(e.target.value, index)}
										/>
										{
											options.length > 1 &&
											<IconButton aria-label="delete" size="small" onClick={() => handleDeleteOption(index)}>
												<HighlightOffIcon />
											</IconButton>
										}
										
									</Box>
									
								)	
							}
							<Button onClick={handleAddOption}>Add Options</Button>
						</Stack>
					}

					<FormControlLabel
								control={
								<Checkbox checked={required} onChange={handleChangeRequired} name="required" />
								}
								label="Required"
							/>
					
					<Button variant="contained" onClick={handleSaveChanges}>Save</Button>
				</Stack>
			</Box>
			:
			<Typography variant="h5">Edit Item</Typography>
		}
	</EditBox>
	)
}

export default SelectedItemEdit;