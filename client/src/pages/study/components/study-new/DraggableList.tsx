import DraggableListItem from './DraggableListItem';
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from '@hello-pangea/dnd';
import { List } from '@mui/material';
import { RegistrableSurvey } from '@/apis/survey';

export type DraggableListProps = {
  items: RegistrableSurvey[];
  onDragEnd: OnDragEndResponder;
  itemChanged: (items) => void; 
};

const DraggableList = ({ items, onDragEnd, itemChanged }: DraggableListProps) => {
	const handleChangeSurvey = (item: RegistrableSurvey, index: number) => {
		items[index] = item;
		itemChanged(items);
	}

	const handleDeleteSurvey = (surveyNo: number) => {
		const surveyList = items.filter(item => item.survey_no !== surveyNo);
		itemChanged(surveyList);
	}

  	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="droppable-list">
				{(provided) => (
					<List ref={provided.innerRef} {...provided.droppableProps}>
						{items.map((item: RegistrableSurvey, index: number) => (
							<DraggableListItem item={item} index={index} key={item.survey_no} itemChanged={handleChangeSurvey} deleteItem={handleDeleteSurvey} />
						))}
						{provided.placeholder}
					</List>
				)}
			</Droppable>
		</DragDropContext>
  	);
};

export default DraggableList;
