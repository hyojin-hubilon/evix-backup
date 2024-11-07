import { DeletedItem, ItemType } from "@/types/ecrf"
import { Draggable } from "@hello-pangea/dnd"
import { AddedItem, Handle, ItemContent, VisuallyHiddenInput } from "./styles"

import DehazeIcon from '@mui/icons-material/Dehaze';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers"


type DroppedItemType = {
	droppedItem : ItemType
	index: number
	id:string
	deleteThisItem: (deleteItem : DeletedItem) => void
	editThisItem: (droppedItem) => void
}
const DroppedItem = ({droppedItem, index, id, deleteThisItem, editThisItem}: DroppedItemType) => {

	const deleteThis = (index: number) => {
		const deleteItem = {
			index: index,
			id: id
		}

		deleteThisItem(deleteItem)
	}

	return (
		<Draggable
			key={droppedItem.id}
			draggableId={droppedItem.id ? droppedItem.id : droppedItem.itemType + index}
			index={index}>
			{(provided, snapshot) => (
				<AddedItem
					ref={provided.innerRef}
					{...provided.draggableProps}
					isDragging={snapshot.isDragging}
					style={provided.draggableProps.style}
					>
					<Handle
						{...provided.dragHandleProps}>
						<DehazeIcon />
					</Handle>
					<ItemContent>
						<Stack spacing={1}>
						<Typography variant="h6" sx={{fontSize: '0.7rem'}}>{droppedItem.itemType}</Typography>
						<Typography>{droppedItem.content?.title}</Typography>
						{
							droppedItem.content?.description && <Typography>{ droppedItem.content?.description }</Typography>
						}
						{
							droppedItem.content?.label && <Typography variant="h6">{ droppedItem.content?.label }</Typography>
						}
						{
							(droppedItem.content?.placeholder && droppedItem.itemType === 'Text Input') && 
								<TextField
									size="small"
									placeholder={droppedItem.content?.placeholder}
									disabled
								/>
						}
						{
							(droppedItem.content?.placeholder && droppedItem.itemType === 'Text Area') && 
								<TextField
									size="small"
									placeholder={droppedItem.content?.placeholder}
									multiline
									rows={3}
									disabled
									
								/>
						}
						{
							(droppedItem.content?.options && droppedItem.itemType === 'Select Box') &&
								<Select size="small" value="Select">
									<MenuItem value="Select" disabled>
										<em>Select</em>
									</MenuItem>
									{
										droppedItem.content?.options.map((option, index) => {
											return <MenuItem value={option} key={index}>
												{option}
											</MenuItem>
										})
										
									}
								</Select> 
						}
						{
							(droppedItem.content?.options && droppedItem.itemType === 'Radio') &&
								<RadioGroup>
									{
										droppedItem.content?.options.map((option, index) => {
											return <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
										})
										
									}
								</RadioGroup> 
						}
						{
							(droppedItem.content?.options && droppedItem.itemType === 'Checkbox') &&
								<FormGroup>
									{
										droppedItem.content?.options.map((option, index) => {
											return <FormControlLabel key={index}
													control={
														<Checkbox name={option} />
													}
													label={option}
												/>
										})	
									}
								</FormGroup> 
						}
						{
							(droppedItem.itemType === 'File Input') &&
								<Button
									component="label"
									role={undefined}
									variant="contained"
									tabIndex={-1}
									startIcon={<CloudUploadIcon />}
									disabled={true}
								>
									Upload files
									<VisuallyHiddenInput
										type="file"
										onChange={(event) => console.log(event.target.files)}
										multiple
									/>
								</Button>
						}
						{
							(droppedItem.itemType === 'Datepicker') &&
								<Box alignItems="center" display="flex" gap={1}
									sx={{
										".MuiInputBase-input" : {
											height: "1.375em",
											padding: "8px 14px",
											width: 1
										},
										".MuiButtonBase-root" :{
											fontSize: "1.2em",

											".MuiSvgIcon-root": {
												fontSize: "1em"
											}
										}
									}}>
									<DatePicker disabled  />
								</Box>
						}
						</Stack>
						<Box sx={{position:'absolute', right: '5px', top:'5px'}}>
							{/* 삭제, 수정버튼 */}
							<Button size="small" sx={{minWidth: '30px'}} color="secondary" onClick={() => deleteThis(index)}>
								<DeleteIcon sx={{fontSize: '1.2rem'}}/>
							</Button>

							<Button size="small"  sx={{minWidth: '30px'}} color="secondary" onClick={() => editThisItem(droppedItem)}>
								<EditIcon sx={{fontSize: '1.2rem'}}/>
							</Button>
						</Box>
					</ItemContent>
				</AddedItem>
			)}
		</Draggable>
	)
}

export default DroppedItem;