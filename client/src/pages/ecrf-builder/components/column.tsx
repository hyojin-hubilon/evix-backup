import { Droppable } from '@hello-pangea/dnd';
import Task from './task';
import { Box, Typography } from '@mui/material';


type ColumnProps = {
	column : {
		id: string,
		title:string
	},
	isDropDisabled: boolean,
	isDraggingOver?: boolean,
	tasks: [
		{id: string, content: string;}
	]
}

const Column = (props : ColumnProps) => {
  
    return (
		<Box>
			<Typography variant="h4" p="8px">{props.column.title}</Typography>
			<Droppable
			droppableId={props.column.id}
			isDropDisabled={props.isDropDisabled}
			>
			{(provided, snapshot) => (
				<Box
					ref={provided.innerRef}
					{...provided.droppableProps}
					sx={{
						padding: '8px',
						transition: 'background-color 0.2s ease',
						backgroundColor: props.isDraggingOver ? 'skyblue' : 'white',
						flexGrow: 1,
						minHeight: '100px',
					}}
				>
				{props.tasks.map((task, index) => (
					<Task key={task.id} task={task} index={index} />
				))}
				{provided.placeholder}
				</Box>
			)}
			</Droppable>
		</Box>
    );
}

export default Column;
