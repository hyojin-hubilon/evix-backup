import { Draggable } from '@hello-pangea/dnd';
import { Box } from '@mui/material';

type TaskProps = {
	task : {
		id : string;
		content: string;
	},
	index: number;
}

const Task = (props : TaskProps) => {
    const isDragDisabled = props.task.id === 'task-1';
	
    return (
      <Draggable
        draggableId={props.task.id}
        index={props.index}
        isDragDisabled={isDragDisabled}
      >
        {(provided, snapshot) => (
          <Box
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
			sx={{
				backgroundColor : isDragDisabled ? 'lightgrey' : snapshot.isDragging ? 'lightgreen' : 'white'
			}}
          >
            {props.task.content}
          </Box>
        )}
      </Draggable>
	)
}

export default Task;
