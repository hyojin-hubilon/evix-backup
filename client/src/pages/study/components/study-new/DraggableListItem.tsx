import { Draggable } from '@hello-pangea/dnd';
import {
	ListItem,
	ListItemText
} from '@mui/material';
import { RegistrableSurvey } from '@/apis/survey';

export type DraggableItemListProps = {
	item: RegistrableSurvey;
	index: number;
};

const DraggableListItem = ({ item, index }: DraggableItemListProps) => {
  	return (
    	<Draggable draggableId={item.title} index={index}>
			{(provided, snapshot) => (
				<ListItem
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					sx={{background : snapshot.isDragging ? 'rgb(235,235,235)' : ''}}
				>
				<ListItemText primary={item.title} />
			</ListItem>
		)}
    	</Draggable>
 	);
};

export default DraggableListItem;
