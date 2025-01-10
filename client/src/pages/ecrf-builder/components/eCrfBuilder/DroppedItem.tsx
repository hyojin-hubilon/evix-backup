import { DeletedItem, ItemType } from "@/types/ecrf"
import { Draggable } from "@hello-pangea/dnd"
import { AddedItem, Handle, ItemContent, VisuallyHiddenInput } from "./styles"

import DragHandleIcon from '@mui/icons-material/DragHandle';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, Checkbox, FormControlLabel, FormGroup, MenuItem, Radio, RadioGroup, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers"
import { Input } from "antd";


type DroppedItemType = {
	droppedItem : ItemType
	index: number
	columnId:string
	deleteThisItem: (deleteItem : DeletedItem) => void
	editThisItem: (droppedItem, columnId, index) => void
}
const DroppedItem = ({droppedItem, index, columnId, deleteThisItem, editThisItem}: DroppedItemType) => {

	const deleteThis = (index: number) => {
		const deleteItem = {
			index: index,
			id: columnId
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
						<DragHandleIcon fontSize="small" color="secondary" />
					</Handle>
					<ItemContent>
						<Stack spacing={1} maxWidth="inherit">
							
						<Typography variant="h6" sx={{fontSize: '0.7rem'}}>{droppedItem.itemType}</Typography>
						<Box display="flex" mb={1}>
							<Typography variant={droppedItem.itemType ==='Headline' ? 'h3' : 'h5'}>{droppedItem.content?.title}</Typography>
							{ droppedItem.content?.required &&  <Typography sx={{fontSize: '0.7rem', color:'red'}}>* Required</Typography>}
						</Box>
						{
							droppedItem.content?.description && <Typography>{ droppedItem.content?.description }</Typography>
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
							(droppedItem.content?.options && droppedItem.itemType === 'Radio Buttons') &&
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
						{
							// 테이블 미리보기
							droppedItem.itemType === 'Table' && droppedItem.content.table &&
							<Box sx={{overflowX: 'auto', maxWidth: '100%'}}>
								<table className="viewTable">
									<thead>
										<tr>
										{
											droppedItem.content.table[0].map((column, i) => {
												return <th key={i}><div className="th-content">{column['COLUMN']}</div></th>
											})
										}
										</tr>
									</thead>
									<tbody>
									{
										droppedItem.content.table.slice(1).map(
											(row, i) => {
												return <tr key={i}>
													{
														row.map((column, k) => {
															return <td key={k}>
																<div className="td-content">
																	{ column['TEXT'] ? column['TEXT'] : <Input size="small" disabled /> }
																</div>
															</td>
														})
													}
												</tr>
											}
											
										)
									}
									</tbody>

								</table>
							</Box>	
						}
						</Stack>
						<Box sx={{position:'absolute', right: '5px', top:'5px'}}>
							{/* 삭제, 수정버튼 */}
							<Button size="small" sx={{minWidth: '30px'}} color="secondary" onClick={() => deleteThis(index)}>
								<DeleteIcon sx={{fontSize: '1.2rem'}}/>
							</Button>

							<Button size="small"  sx={{minWidth: '30px'}} color="secondary" onClick={() => editThisItem(droppedItem, columnId, index)}>
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