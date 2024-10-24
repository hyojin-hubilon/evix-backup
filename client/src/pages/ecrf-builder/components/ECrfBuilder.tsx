import { DragDropContext, Draggable, Droppable, DropResult, OnDragEndResponder } from "@hello-pangea/dnd";
import { Fragment, useState } from "react";
import { Grid, styled } from "@mui/material";
import { v4 as uuidv4 } from 'uuid';

type DSource = {
	index: number;
	id: string;
	droppableId: number;
	content: string;
}
// a little function to help us with reordering the result
const reorder = (list:DSource[], startIndex:number, endIndex:number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
/**
 * Moves an item from one list to another list.
 */
const copy = (source:DSource[], destination:DSource[], droppableSource: DSource, droppableDestination: DSource) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];
	destClone.splice(droppableDestination.index, 0, { ...item, id: uuidv4() });
    return destClone;
};

const move = (source :DSource[], destination:DSource[], droppableSource:DSource, droppableDestination:DSource) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 8;

const Content = styled('div')`
  	margin-right: 200px;
`;

const Item = styled('div', {
	shouldForwardProp: (prop) => prop !== "isDragging"
})<{isDragging : boolean}>(({isDragging}) => ({
	display: 'flex',
	userSelect: 'none',
	padding: '0.5rem',
	margin: '0 0  0.5rem 0',
	alignItems: 'flex-start',
	alignContent: 'flex-start',
	lineHeight: '1.5',
	borderRadius: '3px',
	background: '#fff',
	border: isDragging ? '1px dashed #000' : '1px solid #ddd'
}))

const Clone = styled(Item)`
	+ div {
		transform: none!important;
		margin: 0 0 0.5rem!important;
		~ div {
		transform: none!important;
		margin: 0 0 0.5rem!important;

			&:last-child {
				display:none!important;
			}
		}		
  	}
`;



const Handle = styled('div')`
	display: flex;
	align-items: center;
	align-content: center;
	user-select: none;
	margin: -0.5rem 0.5rem -0.5rem -0.5rem;
	padding: 0.5rem;
	line-height: 1.5;
	border-radius: 3px 0 0 3px;
	background: #fff;
	border-right: 1px solid #ddd;
	color: #000;
`;

const List = styled("div", {
		shouldForwardProp: (prop) => prop !== "isDraggingOver"
	})<{ isDraggingOver?: boolean}>(
		({ theme, isDraggingOver }) => ({
			border: isDraggingOver ? '1px dashed #000' : '1px solid #ddd',
			background: 'fff',
			padding: '0.5rem 0.5rem 0',
			borderRadius: '3px'
	}))
		
// flex: 0 0 150px;

const Kiosk = styled("div", {
	shouldForwardProp: (prop) => prop !== "isDraggingOver"
})<{ isDraggingOver?: boolean}>(
	({ theme, isDraggingOver }) => ({
		border: isDraggingOver ? '1px dashed #000' : '1px solid #ddd',
		// background: 'fff',
		// padding: '0.5rem 0.5rem 0',
		// borderRadius: '3px'
}))



const DropBox = styled(List)`
	background: white;
  	margin: 0 0 0.5rem 0;
	padding: 1rem;
	display:flex;
	
	min-height: 20px;
`;

const Notice = styled('div')`
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: center;
	padding: 0.5rem;
	margin: 0 0.5rem 0.5rem;
	border: 1px solid transparent;
	line-height: 1.5;
	color: #aaa;
`;

const Button = styled('button')`
	display: flex;
	align-items: center;
	align-content: center;
	justify-content: center;
	padding: 0.5rem;
	color: #000;
	border: 1px solid #ddd;
	background: #fff;
	border-radius: 3px;
	font-size: 1rem;
	cursor: pointer;
`;

const ButtonText = styled('div')`
  	margin: 0 1rem;
`;

const ITEMS = [
    {
        id: uuidv4(),
        content: 'Headline'
    },
    {
        id: uuidv4(),
        content: 'Copy'
    },
    {
        id: uuidv4(),
        content: 'Image'
    },
    {
        id: uuidv4(),
        content: 'Slideshow'
    },
    {
        id: uuidv4(),
        content: 'Quote'
    }
];

const getListStyle = (isDraggingOver) => ({
	background: isDraggingOver ? 'lightblue' : 'lightgrey',
	padding: grid,
	width: 250
});

const ECrfBuilder = () => {
	const [ids, setIds] = useState({[uuidv4()] : []});
	console.log(ids);
	const items = Object.keys(ids).map(item => item);
	console.log(items);

    const onDragEnd = (result:DropResult) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        // switch (source.droppableId) {
        //     case destination.droppableId:
        //         setIds({
		// 			[destination.droppableId]: reorder(
        //                 ids[source.droppableId],
        //                 source.index,
        //                 destination.index
        //             )}
        //         );
        //         break;
        //     case 'ITEMS':
        //         setIds({
        //             [destination.droppableId]: copy(
        //                 ITEMS,
        //                 ids[destination.droppableId],
        //                 source,
        //                 destination
        //             )
        //         });
        //         break;
        //     default:
        //         setIds(
        //             move(
        //                 ids[source.droppableId],
        //                 ids[destination.droppableId],
        //                 source,
        //                 destination
        //             )
        //         );
        //         break;
        // }
    };

    const addList = () => {
        setIds({ ...ids, [uuidv4()]: [] });
    };

	return (
		<>
			<DragDropContext onDragEnd={onDragEnd}>
				<Grid container spacing={1}>
					<Grid item xs={3}>
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
														style={
															provided.draggableProps
																.style
														}>
														{item.content} 

													</Item>
													{snapshot.isDragging && (
														<Clone isDragging={snapshot.isDragging}>{item.content}</Clone>
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
					<Grid item xs={7}>
						<Content>
							
							{Object.keys(ids).map((id, i) => (
								<Droppable key={id} droppableId={id}>
									{(provided, snapshot) => (
										<DropBox
											ref={provided.innerRef}
											isDraggingOver={snapshot.isDraggingOver}>
											{ids[id].length > 0
												? ids[id].map(
													(item: DSource, index) => (	
														<Draggable
															key={item.id}
															draggableId={item.id}
															index={index}>
															{(provided, snapshot) => (
																<Item
																	ref={
																		provided.innerRef
																	}
																	{...provided.draggableProps}
																	isDragging={
																		snapshot.isDragging
																	}
																	style={
																		provided
																			.draggableProps
																			.style
																	}>
																	<Handle
																		{...provided.dragHandleProps}>
																		<svg
																			width="24"
																			height="24"
																			viewBox="0 0 24 24">
																			<path
																				fill="currentColor"
																				d="M3,15H21V13H3V15M3,19H21V17H3V19M3,11H21V9H3V11M3,5V7H21V5H3Z"
																			/>
																		</svg>
																	</Handle>
																	{item.content}
																</Item>
															)}
														</Draggable>
													)
												)
												: !provided.placeholder && (
													<Notice>Drop items here</Notice>
												)}
											{provided.placeholder}
										</DropBox>
									)}
								</Droppable>
							))}

							<Button onClick={addList}>
								<svg width="24" height="24" viewBox="0 0 24 24">
									<path
										fill="currentColor"
										d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
									/>
								</svg>
								<ButtonText>Add List</ButtonText>
							</Button>
						</Content>
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