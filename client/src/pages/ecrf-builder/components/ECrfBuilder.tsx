import { DragDropContext, Draggable, DraggableLocation, Droppable, DropResult } from "@hello-pangea/dnd";
import { Fragment, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Grid, Box, Button } from "@mui/material";

import { Clone, DropBox, Handle, Item, Kiosk, Notice } from "./styles";
import SelectedItemEdit from "./SelectedItemEdit";


import AddIcon from '@mui/icons-material/Add';
import TableEditor from "./TableEditor";
import { DeletedItem, Idstype, ItemType } from "@/types/ecrf";

import DehazeIcon from '@mui/icons-material/Dehaze';
import DroppedItem from "./DroppedItem";
import MainCard from "@/components/MainCard";


const getParentIndexByChildId = (list: Idstype[], childId: string) => {
	return list.findIndex((e, i) => Object.keys(list[i]).some((key2) => key2 === childId));
}

const reorder = (destinationId:string, startIndex:number, endIndex:number, ids: Idstype[]) => {
    const result = Array.from(ids);
	const parentIndex = getParentIndexByChildId(ids, destinationId);


	const itemsResult = Array.from(ids[parentIndex][destinationId]);
	const [removed] = itemsResult.splice(startIndex, 1);
    itemsResult.splice(endIndex, 0, removed);



	result[parentIndex][destinationId] = itemsResult;

    return result;
};

const copy = (list: Idstype[], source:ItemType[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation) => {
	const destinationId = droppableDestination.droppableId;
	const parentIndex = getParentIndexByChildId(list, destinationId);
	
    const sourceClone = Array.from(source);
    const destClone = Array.from(list[parentIndex][destinationId]);
    const item = sourceClone[droppableSource.index];

    destClone.splice(droppableDestination.index, 0, { ...item, id: uuidv4() });
	const result = list;
	result[parentIndex][destinationId] = destClone;
	
    return result;
};

const move = (droppableSource:DraggableLocation, droppableDestination:DraggableLocation, ids: Idstype[]) => {
	const sourceId = droppableSource.droppableId;
	const destinationId = droppableDestination.droppableId;

	const sourceParentIndex = getParentIndexByChildId(ids, sourceId);
	const destinationParentIndex = getParentIndexByChildId(ids, destinationId);
	
	const sourceClone = Array.from(ids[sourceParentIndex][sourceId]);
	const destClone = Array.from(ids[destinationParentIndex][destinationId]);
	const [removed] = sourceClone.splice(droppableSource.index, 1);

	destClone.splice(droppableDestination.index, 0, removed);

	const result = ids;
	result[sourceParentIndex][sourceId] = sourceClone;
	result[destinationParentIndex][destinationId]= destClone;

	return result;
};


const reorderParentBox = (sourceIndex:number, destIndex:number, ids: Idstype[]) => {
	const result = Array.from(ids);
	const [removed] = result.splice(sourceIndex, 1);
	result.splice(destIndex, 0, removed);

	return result;	
}

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
		}
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
	const [ids, setIds] = useState<Idstype[]>([ {[uuidv4()] : []} ]);
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
            case destination.droppableId:
                setIds(
					//박스내 아이템의 REORDER
					reorder(
						destination.droppableId,
                        source.index,
                        destination.index,
						ids
                    )
                );
                break;
			case 'MAIN': 
				//상위박스의 REORDER
				setIds(reorderParentBox(
					source.index,
					destination.index,
					ids));
				break;
            case 'ITEMS':
				//아이템 리스트에서 폼 리스트로 이동
				setIds(copy(ids, 
							ITEMS,
							source,
							destination));
                break;
            default:
				//아이템을 다른 폼 리스트로 이동
                setIds(move(
					source,
					destination,
					ids
				));
			break;
        }
    };

    const addList = () => {
        setIds([ ...ids, {[uuidv4()] : []}]);
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
											index={index}
											>
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
							{/* 메인 박스 */}
							<Droppable droppableId="MAIN"  type="content">
								{(provided, snapshot) => (
									<div ref={provided.innerRef} style={{border:'1px solid #ddd'}}>
										
										{ids.map((id1, i) => (
											<Draggable key={i} draggableId={"main"+i} index={i}>
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
														{ i }
														{Object.keys(ids[i]).map((id2, j) => { 
															// console.log(ids[id1], id2);
															return (
																<Droppable key={j} droppableId={id2}>{/* 아이템 추가 영역 */}
																{(provided, snapshot) => (
																	<DropBox
																		ref={provided.innerRef}
																		isDraggingOver={snapshot.isDraggingOver}>
																		{id1[id2].length > 0
																			? id1[id2].map(
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