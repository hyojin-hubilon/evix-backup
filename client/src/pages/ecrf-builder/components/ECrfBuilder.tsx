import { DragDropContext, Draggable, DraggableLocation, Droppable, DropResult, OnDragEndResponder } from "@hello-pangea/dnd";
import { Fragment, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Grid, Box, styled, Button,Typography, Input, OutlinedInput, TextField, Stack, Select, MenuItem } from "@mui/material";
import DehazeIcon from '@mui/icons-material/Dehaze';
import AddIcon from '@mui/icons-material/Add';
import { AddedItem, Clone, DropBox, EditBox, Handle, Item, ItemContent, Kiosk, Notice } from "./styles";

type ItemContents = {
	title: string;
	label?:string;
	options?: Array<string>;
	placeholder?: string;
	description?:string;
}

type ItemType = {
	id:string;
	itemType: string;
	content: ItemContents | null;
}

type Idstype = {
	[x: string]: ItemType[]
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
        itemType: 'Radio',
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
        itemType: 'Image File Input',
		content: {
			title: 'Image File Input Title',
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



const ECrfBuilder = () => {
	const [ids, setIds] = useState<Idstype>({[uuidv4()] : []});
	const [selectedItem, setSelectedItem]  = useState<ItemType | null>(null);
	
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
    };

    const addList = () => {
        setIds({ ...ids, [uuidv4()]: [] });
    };

	const editThisItem = (item:ItemType) => {
		setSelectedItem(item);
		console.log(item);
	}

	const handleChangeIds = (value, item: ItemType, name:string) => {
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
											draggableId={item.id}
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
															draggableId={droppedItem.id}
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
																		<Typography variant="h6" sx={{fontSize: '0.7rem'}}>{droppedItem.itemType}</Typography>
																		<Typography>{droppedItem.content?.title}</Typography>
																		{
																			droppedItem.content?.description && <Typography>{ droppedItem.content?.description }</Typography>
																		}
																		{
																			droppedItem.content?.label && <Typography variant="h6">{ droppedItem.content?.label }</Typography>
																		}
																		{
																			droppedItem.content?.placeholder && 
																				<TextField
																					size="small"
																					placeholder={droppedItem.content?.placeholder}
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
						<EditBox>
							
							{
								selectedItem &&
								<Box>
									<Typography variant="h5">Edit {selectedItem.itemType }</Typography>
									<Stack spacing={1} m="1rem 0 0">
										<TextField
											label="Title"
											size="small"
											placeholder={selectedItem.content?.title}
											
											/>
										<TextField
											label="Description"
											size="small"
											placeholder={selectedItem.content?.description}
											// onChange={(e) => handleChangeIds(e.target.value, selectedItem, 'description')}
											
											/>

											{/* handleChangeIdsContents */}
									</Stack>
								</Box>
							}
						</EditBox>
					</Grid>
				</Grid>
            </DragDropContext>
			{/* <Grid item xs={2}>
				<Typography variant="h4">Add Components</Typography>
				<List>
					<ListItem>
						Container
					</ListItem>
				</List>
			</Grid>
			<Grid item xs={7}>
				<MainCard />
			</Grid>
			<Grid item xs={3}>
				<MainCard />
			</Grid> */}
		</>
	);
}

export default ECrfBuilder;