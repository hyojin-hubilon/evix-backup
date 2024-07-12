import { Draggable } from '@hello-pangea/dnd';
import {
	Button,
	ListItem,
	ListItemText,
	MenuItem,
	Select,
	useTheme
} from '@mui/material';
import { RegistrableSurvey } from '@/apis/survey';

export type DraggableItemListProps = {
	item: RegistrableSurvey;
	index: number;
};

const DraggableListItem = ({ item, index }: DraggableItemListProps) => {
	const theme = useTheme();
	const { grey } = theme.palette;
  	return (
    	<Draggable draggableId={item.title} index={index}>
			{(provided, snapshot) => (
				<ListItem
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					sx={{
						background : snapshot.isDragging ? 'rgb(235,235,235)' : 'white',
						border: `1px dashed ${grey[500]}`,
						borderRadius: "5px", cursor:'pointer'
					}}
				>
				<ListItemText primary={item.title}  />
				<Select>
					<MenuItem value="month">월</MenuItem>
					<MenuItem value="week">주</MenuItem>
					<MenuItem value="day">일</MenuItem>
				</Select>
				마다
				<Select>
					<MenuItem value="1">1</MenuItem>
					<MenuItem value="2">2</MenuItem>
					<MenuItem value="3">3</MenuItem>
				</Select>
				회 반복

				<Button color="error">삭제</Button>
			</ListItem>
		)}
    	</Draggable>
 	);
};

export default DraggableListItem;
