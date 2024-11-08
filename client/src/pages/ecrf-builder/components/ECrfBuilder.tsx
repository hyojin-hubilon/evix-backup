import { DragDropContext, Draggable, DraggableLocation, Droppable, DropResult } from "@hello-pangea/dnd";
import { Fragment, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Grid, Box, Button } from "@mui/material";

import { Clone, DropBox, Handle, Item, Kiosk, Notice } from "./styles";
import SelectedItemEdit from "./SelectedItemEdit";


import AddIcon from '@mui/icons-material/Add';
import TableEditor from "./TableEditor";
import { DeletedItem, Idstype, InsideIds, ItemType } from "@/types/ecrf";

import DehazeIcon from '@mui/icons-material/Dehaze';
import DroppedItem from "./DroppedItem";
import MainCard from "@/components/MainCard";

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

const getParentIdByChildId = (object: Idstype, childId: string) => {
	return Object.keys(object).find((key) => Object.keys(object[key]).some((key2) => key2 === childId)) as string;
}

const copy2 = (list: Idstype, source:ItemType[], destinationId:string, droppableSource: DraggableLocation, droppableDestination: DraggableLocation) => {
	const parentKey = getParentIdByChildId(list, destinationId);
	
    const sourceClone = Array.from(source);
    const destClone = Array.from(list[parentKey][destinationId]);
    const item = sourceClone[droppableSource.index];

    destClone.splice(droppableDestination.index, 0, { ...item, id: uuidv4() });
	const result = list;
	result[parentKey][destinationId] = destClone;
	
    return result;
};

const move = (source :ItemType[], destination:ItemType[], droppableSource:DraggableLocation, droppableDestination:DraggableLocation, ids: Idstype) => {
	const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = ids;
    // result[droppableSource.droppableId] = sourceClone;
    // result[droppableDestination.droppableId] = destClone;

	console.log(result)

    return result;
};

const deleteItem = (list:Idstype, droppableId:string, index:number) => {
	// const result = Array.from(list[droppableId]);
	// result.splice(index, 1);

	// return result;
}



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
		itemType: 'Two Column',
		columnFirst: {
			[uuidv4()] : []
		},
		columnSecond: {
			[uuidv4()] : []
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
	const [ids, setIds] = useState<Idstype>({[uuidv4()] : { [uuidv4()] : [] }});
	const [selectedItem, setSelectedItem]  = useState<ItemType>({} as ItemType);
	const [openTableEditor, setOpenTableEditor] = useState(false);
	
    const onDragEnd = (result:DropResult) => {
        const { source, destination } = result;

		console.log(result, source, destination)
        // dropped outside the list
        if (!destination) {
            return;
        }

		
        switch (source.droppableId) {
            // case destination.droppableId:
				//폼 리스트 하나 안에서 이동
                // setIds(
				// 	[destination.droppableId]: reorder(
                //         ids[source.droppableId],
                //         source.index,
                //         destination.index
                //     )
                // );
                // break;
            case 'ITEMS':
				//아이템 리스트에서 폼 리스트로 이동
				
				setIds(copy2(ids, 
							ITEMS,
							destination.droppableId,
							source,
							destination));
                // setIds({ ...ids, 
                //     [destination.droppableId]: copy(
                //         ITEMS,
                //         ids[destination.droppableId],
                //         source,
                //         destination
                //     )
                // });
                break;
            default:
				//다른 폼 리스트로 이동
                // setIds(move(
				// 	ids[source.droppableId],
				// 	ids[destination.droppableId],
				// 	source,
				// 	destination,
				// 	ids
				// ));
                break;
        }
    };

    const addList = () => {
        setIds({ ...ids, [uuidv4()] : { [uuidv4()] : [] } });
    };

	const editThisItem = (item:ItemType) => {
		setSelectedItem(item);
	}

	const deleteThisItem = (deletedItem : DeletedItem) => {
		// setIds({...ids, [deletedItem.id] : deleteItem(ids, deletedItem.id, deletedItem.index)});
	}

	const handleSetCrf = () => {
		const newCrf = {};

		console.log(ids);

		Object.keys(ids).map((id, i) => {
			// if(ids[id].length > 0) {

			// 	const items = ids[id].map(item => {
			// 		delete item["id"];
			// 		return item;
			// 	})
			// 	const newIds = {[i] : items} //uuid를 number로 변경
			// 	Object.assign(newCrf, newIds);
			// }
			
		});

		saveCRF(newCrf);
	}

	const handleCloseTableEditor = () => {
		setOpenTableEditor(false);
	}

	useEffect(() => {
		console.log(ids);
	}, [ids])

	

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
							<Droppable droppableId="MAIN" isDropDisabled={true}>
								{(provided, snapshot) => (
									<div ref={provided.innerRef} style={{border:'1px solid #ddd'}}>
										
										{Object.keys(ids).map((id1, i) => (
											<Draggable key={i} draggableId={id1} index={i}>
												{(provided, snapshot) => (
													<DropBox
														ref={provided.innerRef}
														{...provided.draggableProps}
														style={provided.draggableProps.style}
														>
														<Handle
															{...provided.dragHandleProps}
														>
															<DehazeIcon />
														</Handle>
														{ id1 }
														{Object.keys(ids[id1]).map((id2, j) => { 
															console.log(ids[id1], id2);
															return (
																<Droppable key={j} droppableId={id2}>
																{(provided, snapshot) => (
																	<DropBox
																		ref={provided.innerRef}
																		isDraggingOver={snapshot.isDraggingOver}>
																		{ids[id1][id2].length > 0
																			? ids[id1][id2].map(
																				(droppedItem: ItemType, index) => (
																					<DroppedItem key={index} droppedItem={droppedItem} index={index} id={id2} deleteThisItem={deleteThisItem} editThisItem={editThisItem} />
																				)
																			)
																			: 
																				<Notice>Drop items here</Notice>
																			}
																		{provided.placeholder}
																	</DropBox>
																)}
															</Droppable>
														)})}				
															
														
														






													</DropBox>
												)}		
											</Draggable>
										))}

										{provided.placeholder}
									</div>
								)}
								
							</Droppable>
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

			<TableEditor isOpen={openTableEditor} handleClose={handleCloseTableEditor}/>
		</>
	);
}

export default ECrfBuilder;