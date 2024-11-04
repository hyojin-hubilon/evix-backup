import { DragDropContext, Draggable, DraggableLocation, Droppable, DropResult, OnDragEndResponder } from "@hello-pangea/dnd";
import { Fragment, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Grid, Box, Button,Typography, Input, OutlinedInput, TextField, Stack, Select, MenuItem, RadioGroup, Radio, FormControlLabel, Checkbox, FormGroup } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers"

import { AddedItem, Clone, DropBox, EditBox, Handle, Item, ItemContent, Kiosk, Notice, VisuallyHiddenInput } from "./styles";
import SelectedItemEdit from "./SelectedItemEdit";

import DehazeIcon from '@mui/icons-material/Dehaze';
import AddIcon from '@mui/icons-material/Add';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export type ItemContents = {
	title: string;
	label?:string;
	options?: Array<string>;
	placeholder?: string;
	description?:string;
	required?:boolean // default = false?;
}

export type ItemType = {
	id?:string; //draggableid, key로 사용, json 저장시에는 삭제해도 될듯
	itemType: string;
	content: ItemContents;
}

type Idstype = {
	[x: string]: ItemType[] //json 저장시에는 순서대로 key를 1,2,3...으로 변경
}

// a little function to help us with reordering the result
const reorder = (list:ItemType[], startIndex:number, endIndex:number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
/**
 * Moves an item from one list to another list.
 */
const copy = (source:ItemType[], destination:ItemType[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];

    destClone.splice(droppableDestination.index, 0, { ...item, id: uuidv4() });
    return destClone;
    
};

const move = (source :ItemType[], destination:ItemType[], droppableSource:DraggableLocation, droppableDestination:DraggableLocation, ids: Idstype) => {
	const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = ids;
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

	console.log(result)

    return result;
};



const ITEMS: ItemType[] = [
    {
        id: uuidv4(),
        itemType: 'Headline',
		content: {
			title: 'Headline'
		},
    },
	{
        id: uuidv4(),
        itemType: 'Paragraph',
		content: {
			title: 'Paragraph'
		}
    },
    {
        id: uuidv4(),
        itemType: 'Radio Buttons',
		content: {
			title: "Radio Title",
			options: ['option 1', 'options 2']
		}
    },
    {
        id: uuidv4(),
        itemType: 'Checkbox',
		content: {
			title: 'Checkbox Title',
			options: ['option 1', 'option 2']
		}
    },
	{
        id: uuidv4(),
        itemType: 'Select Box',
		content: {
			title: 'Select Box Title',
			options: ['option 1', 'option 2']
		}
    },
	{
        id: uuidv4(),
        itemType: 'Text Input',
		content: {
			title: 'Text Input Title',
			placeholder: 'Placeholder'
		}
    },
	{
        id: uuidv4(),
        itemType: 'Text Area',
		content: {
			title: 'Text Area Title',
			placeholder: 'Placeholder'
		}
    },
	{
        id: uuidv4(),
        itemType: 'File Input',
		content: {
			title: 'File Input Title',
			label: 'Label'
		}
    },
	{
        id: uuidv4(),
        itemType: 'Datepicker',
		content: {
			title: 'Datepicker',
			label: 'Label'
		}
    },
    {
        id: uuidv4(),
        itemType: 'Table',
		content : {
			title: 'Table Title'
		}
    },
    
];

type ECrfBuilderType = {
	saveCRF: (crf) => void
}

const ECrfBuilder = ({saveCRF}: ECrfBuilderType) => {
	const [ids, setIds] = useState<Idstype>({[uuidv4()] : []});
	const [selectedItem, setSelectedItem]  = useState<ItemType>({} as ItemType);
	
    const onDragEnd = (result:DropResult) => {
        const { source, destination } = result;

		console.log(source.droppableId, destination?.droppableId)
        // dropped outside the list
        if (!destination) {
            return;
        }

        switch (source.droppableId) {
            case destination.droppableId:
				//폼 리스트 하나 안에서 이동
                setIds({...ids, 
					[destination.droppableId]: reorder(
                        ids[source.droppableId],
                        source.index,
                        destination.index
                    )}
                );
                break;
            case 'ITEMS':
				//아이템 리스트에서 폼 리스트로 이동
                setIds({ ...ids, 
                    [destination.droppableId]: copy(
                        ITEMS,
                        ids[destination.droppableId],
                        source,
                        destination
                    )
                });
                break;
            default:
				//다른 폼 리스트로 이동
                setIds(move(
					ids[source.droppableId],
					ids[destination.droppableId],
					source,
					destination,
					ids
				));
                break;
        }

		console.log(ids);
    };

    const addList = () => {
        setIds({ ...ids, [uuidv4()]: [] });
    };

	const editThisItem = (item:ItemType) => {
		setSelectedItem(item);
	}

	const handleSetCrf = () => {
		const newCrf = {};

		console.log(ids);

		Object.keys(ids).map((id, i) => {
			if(ids[id].length > 0) {

				const items = ids[id].map(item => {
					delete item["id"];
					return item;
				})
				const newIds = {[i] : items} //uuid를 number로 변경
				Object.assign(newCrf, newIds);
			}
			
		});

		saveCRF(newCrf);
	}

	

	return (
		<>	
			
			<DragDropContext onDragEnd={onDragEnd}>
				<Grid container spacing={1}>
					<Grid item xs={2}>
						<Droppable droppableId="ITEMS" isDropDisabled={true}>
							{(provided, snapshot) => (
								<Kiosk
									ref={provided.innerRef}
									isDraggingOver={snapshot.isDraggingOver}>
									{ITEMS.map((item, index) => (
										<Draggable
											key={item.id}
											draggableId={item.id ? item.id : item.itemType + index}
											index={index}>
											{(provided, snapshot) => (
												<Fragment>
													<Item
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														isDragging={snapshot.isDragging}
														style={provided.draggableProps.style}
														>
														{item.itemType} 
													</Item>
													{snapshot.isDragging && (
														<Clone isDragging={snapshot.isDragging}>{item.itemType}</Clone>
													)}
												</Fragment>
											)}
										</Draggable>
									))}

									{provided.placeholder}

								</Kiosk>
							)}
							
						</Droppable>
					</Grid>
					<Grid item xs={6}>
						<Box>
							{Object.keys(ids).map((id, i) => (
								<Droppable key={id} droppableId={id}>
									{(provided, snapshot) => (
										<DropBox
											ref={provided.innerRef}
											isDraggingOver={snapshot.isDraggingOver}>
											{ids[id].length > 0
												? ids[id].map(
													(droppedItem: ItemType, index) => (
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
																	<ItemContent onClick={() => editThisItem(droppedItem)}>
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
																					<DatePicker  disabled  />
																				</Box>
																		}
																		</Stack>
																		<Box sx={{position:'absolute', right: '5px', top:'5px'}}>
																			{/* 삭제, 수정버튼 */}
																			<Button size="small" sx={{minWidth: '30px'}} color="secondary">
																				<DeleteIcon sx={{fontSize: '1.2rem'}}/>
																			</Button>

																			<Button size="small"  sx={{minWidth: '30px'}} color="secondary">
																				<EditIcon sx={{fontSize: '1.2rem'}}/>
																			</Button>
																		</Box>
																	</ItemContent>
																</AddedItem>
															)}
														</Draggable>
													)
												)
												: 
													<Notice>Drop items here</Notice>
												}
											{provided.placeholder}
										</DropBox>
									)}
								</Droppable>
							))}

							<Button onClick={addList}>
								<AddIcon />Add List
							</Button>
						</Box>
					</Grid>
					<Grid item xs={4}>
						<SelectedItemEdit selectedItem={selectedItem} />
					</Grid>
				</Grid>
			</DragDropContext>
			
            <Grid container>
				<Grid item xs={12}>
					<Box sx={{borderTop:'1px solid #eee', pt: '0.5rem', mt: '0.5rem'}} display="flex">
						<Button variant="contained" onClick={() => handleSetCrf()}>Save</Button>
					</Box>
				</Grid>
			</Grid>
		</>
	);
}

export default ECrfBuilder;