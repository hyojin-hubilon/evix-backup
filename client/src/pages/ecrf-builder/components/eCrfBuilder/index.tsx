import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { Fragment, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Grid, Box, Button, Select, MenuItem, Typography } from "@mui/material";

import { Clone, DropBox, Handle2, Item, Kiosk, MainBox, Notice } from "./styles";
import SelectedItemEdit from "./SelectedItemEdit";

import TableEditor from "../TableEditor";
import { CRFFormJson, DeletedItem, Idstype, ItemType, SelectedItem } from "@/types/ecrf";

import AddIcon from '@mui/icons-material/Add';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import DroppedItem from "./DroppedItem";
import useSticky from "@/utils/useSticky";
import AddFileInput from "./AddFileInput";
import { useConfirmation } from "@/context/ConfirmDialogContext";
import { useNavigate } from "react-router-dom";
import { copy, deleteItem, getParentIndexByChildId, move, reorder, reorderParentBox } from "../utils";


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
        itemType: 'Radio Buttons',
		content: {
			title: "Radio Title",
			options: ['option 1', 'option 2']
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
        itemType: 'Datepicker',
		content: {
			title: 'Datepicker'
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
	saveCRF: (crf : CRFFormJson[]) => void,
	eCrfJson?: Idstype[] | null;
	existFileSet?: ItemType | null;
}

const ECrfBuilder = ({saveCRF, eCrfJson, existFileSet}: ECrfBuilderType) => {
	const { ref } = useSticky();
	const [ids, setIds] = useState<Idstype[]>([ {[uuidv4()] : []} ]);
	const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
	const [selectedTableData, setSelectedTableData] = useState<{[x:number] : string}[][] | null>(null);
	const [openTableEditor, setOpenTableEditor] = useState(false);

	const confirm = useConfirmation();
	const navigate = useNavigate();

	const fileSet: ItemType = {
		id: uuidv4(),
		itemType: 'File Input',
		content: {
			title: 'File Input Title'
		}
	}

	const [ fileAddShow, setFileAddShow ] = useState(false);
	const [ fileInput, setFileInput ] = useState<any>(fileSet);
	const [ editFileShow, setEditFileShow ] = useState<boolean>(false);
	
    const onDragEnd = (result:DropResult) => {
        const { source, destination } = result;

		console.log(result, source, destination)
        // dropped outside the list
        if (!destination) {
            return;
        }
		
        switch (source.droppableId) {
			case 'MAIN': 
				//상위박스의 REORDER
				setIds(reorderParentBox(
					source.index,
					destination.index,
					ids));
				break;
            case destination.droppableId:
                setIds(
					//1개 박스내 아이템의 REORDER
					reorder(
						destination.droppableId,
                        source.index,
                        destination.index,
						ids
                    )
                );
                break;
            case 'ITEMS':
				//아이템 리스트에서 폼 리스트로 복사하여 추가
				setIds(copy(ids, 
							ITEMS,
							source,
							destination));
                break;
            default:
				//아이템을 다른 폼으로 이동
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

	const editThisItem = (item:ItemType, columnId:string, index:number) => {
		
		if(item.content.table) {
			setSelectedTableData(item.content.table);
		} else {
			setSelectedTableData(null);
		}
		
		if(item.itemType !== 'File Input') {
			setEditFileShow(false);
		}
		

		const selected:SelectedItem = {...item, columnId: columnId, index:index};
		setSelectedItem(selected);
	}

	const deleteThisItem = (deletedItem : DeletedItem) => {
		setIds(deleteItem(ids, deletedItem.id, deletedItem.index));
	}

	const editFileInput = () => {
		setSelectedItem(null);
		setEditFileShow(true);
	}

	const changeFileAddShow = (e:boolean) => {
		setFileAddShow(e);
		if(editFileShow) {
			setEditFileShow(false);
		}
		if(!e) {
			setFileInput(fileSet); //파일인풋 삭제 시 file title, label 등 리셋
		}
	}

	const addColumnList = (value:string) => {
		const times = Number(value);
		let newColumns = {};
		for(let i = 0; i<times; i++) {
			newColumns = {...newColumns, ...{[uuidv4()] : []}}
		}
		setIds([...ids, newColumns]);
	}

	const handleSetCrf = () => {
		let newItems : CRFFormJson[] = ids.map((idsItem, i) => {
			const newCrf = {}
			Object.keys(idsItem).map((id, j) => {				
				if(idsItem[id].length > 0) {
					const items = idsItem[id];
					const newIds = {[j] : items} //uuid를 number로 변경
					Object.assign(newCrf, newIds);
				}				
			});

			return newCrf;
		})

		if(fileAddShow) {
			newItems = [fileInput, ...newItems];
		}
		
		saveCRF(newItems);
	}

	const handleCloseTableEditor = () => {
		setOpenTableEditor(false);
	}

	const handleSaveTable = (tableState:{[x:number] : string}[][]) => {
		if(selectedItem) {
			const columnId = selectedItem.columnId;
			const itemIndex = selectedItem.index;

			const parentId = getParentIndexByChildId(ids, columnId);
			
			const newItem = selectedItem
			newItem.content.table = tableState;
			const result = Array.from(ids);
			result[parentId][columnId][itemIndex] = newItem;
			
			setIds(result);
		}
	}

	const handleSaveChanges = (item:SelectedItem) => {
		console.log(item);

		const columnId = item.columnId;
		const itemIndex = item.index;

		const parentId = getParentIndexByChildId(ids, columnId);
		
		const result = Array.from(ids);
		result[parentId][columnId][itemIndex] = item;
		
		console.log(result);
		setIds(result);
	}

	const handleSaveFileInputChanges = (item:ItemType) => {
		setFileInput(item);
		setEditFileShow(false);
	}

	useEffect(() => {
		if(eCrfJson) {
			setIds(eCrfJson);
		}
	}, [eCrfJson]);

	useEffect(() => {
		if(existFileSet) {
			setFileInput(existFileSet);
			setFileAddShow(true);
		}
	}, [existFileSet]);

	const handleCancelCrf = () => {
		confirm({
			title : 'All work done so far will be cancelled. Do you still want to cancel?',
			description: 'The action cannot be reversed.',
			variant: 'danger'
		})
		.then(() => { 
			navigate('/e-crf');
		});
	}

	return (
		<>	
			<DragDropContext onDragEnd={onDragEnd}>
				<Grid container spacing={1}>
					<Grid item xs={2}>
						<Box position="sticky"
							sx={{top: '70px'}}
							ref={ref}
						>
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
														<DragIndicatorIcon color="secondary" fontSize="small" />
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
						</Box>
					</Grid>
					<Grid item xs={7}>
						{/* 파일 인풋 영역 */}
						{
							fileAddShow &&
							<AddFileInput fileInput={fileInput} fileAddShow={(e) => changeFileAddShow(e)} editFileInput={editFileInput} />
						}
						
						<Box>
							{/* 메인 박스 */}
							<Droppable droppableId="MAIN"  type="content">
								{(provided, snapshot) => (
									<MainBox ref={provided.innerRef} sx={{mb: '0.5rem', p: '1rem'}}>
										<Typography variant="h5">Form Add</Typography>
										{ids.map((id1, i) => {
											return (
											<Draggable key={i} draggableId={"main"+i} index={i}>
												{(provided, snapshot) => (
													<DropBox
														ref={provided.innerRef}
														{...provided.draggableProps}
														style={provided.draggableProps.style}
														>
														<Handle2
															{...provided.dragHandleProps}
														>
															<DragHandleIcon fontSize="small" color="secondary" />
														</Handle2>
														<Box display="flex" gap={1}>
														{Object.keys(ids[i]).map((id2, j) => { 
															return (
																<Droppable key={j} droppableId={id2}>{/* 아이템 추가 영역 */}
																{(provided, snapshot) => (
																	<DropBox
																		ref={provided.innerRef}
																		isDraggingOver={snapshot.isDraggingOver}
																		style={{width:'100%'}}
																		>
																			<Box display="flex" flexDirection="column" gap={0.5} maxWidth="inherit">
																			{id1[id2].length > 0
																			? id1[id2].map(
																				(droppedItem: ItemType, index) => (
																					<DroppedItem key={index} droppedItem={droppedItem} index={index} columnId={id2} deleteThisItem={deleteThisItem} editThisItem={editThisItem} />
																				)
																			)
																			: 
																				<Notice>Drop items here</Notice>
																			}
																		{provided.placeholder}
																		</Box>
																	</DropBox>
																)}
															</Droppable>
														)})}
														</Box>				
													</DropBox>
												)}		
											</Draggable>
										)})}

										{provided.placeholder}
									</MainBox>
								)}
								
							</Droppable>
							<Box mt="0.5rem" mb="1rem" display="flex" gap={1}>
								<Button onClick={addList} variant="contained" color="secondary">
									<AddIcon />Add List
								</Button>

								<Select value="Select" onChange={(e) => addColumnList(e.target.value)} sx={{background:'white'}} size="small">
									<MenuItem value="Select" disabled>
										<Box display="flex" alignItems="center" justifyContent="center"><AddIcon /> Add Column List</Box>
									</MenuItem>
									<MenuItem value="2">
										Two Column
									</MenuItem>
									<MenuItem value="3">
										Three Column
									</MenuItem>
								</Select>

								{
									!fileAddShow && <Button variant="contained" onClick={() => setFileAddShow(true)}>Add File Input Area</Button>
								}
								
							</Box>
						</Box>
					</Grid>
					<Grid item xs={3}>
						<Box position="sticky"
							sx={{top: '70px'}}>
						{
							(selectedItem || editFileShow) &&
							<>
							{
								editFileShow ?
								<SelectedItemEdit selectedItem={fileInput} saveChanges={handleSaveFileInputChanges} />
									:
									<>
									{
										selectedItem && <SelectedItemEdit selectedItem={selectedItem} saveChanges={handleSaveChanges} openTableEditor={() => setOpenTableEditor(true)}/>
									}
								
								</>
							}
							</>
						}
						</Box>
						
					</Grid>
				</Grid>
			</DragDropContext>
			
            <Grid container sx={{borderTop:'1px solid #eee', pt: '1rem', mt:'1rem'}} >
				<Grid item xs={2}>
				</Grid>
				<Grid item xs={7}>
					<Box display="flex" gap={1}>
						<Button variant="outlined" color="error" size="large" fullWidth onClick={() => handleCancelCrf()}>Cancel</Button>
						<Button variant="contained" size="large" onClick={() => handleSetCrf()} fullWidth>Submit</Button>
					</Box>
				</Grid>
			</Grid>

			<TableEditor isOpen={openTableEditor} handleClose={handleCloseTableEditor} handleSave={handleSaveTable} tableData={selectedTableData ? selectedTableData : null}/>
		</>
	);
}

export default ECrfBuilder;