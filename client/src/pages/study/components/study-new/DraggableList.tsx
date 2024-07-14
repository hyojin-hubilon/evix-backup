import React, { FC } from 'react';
import DraggableListItem from './DraggableListItem';
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from '@hello-pangea/dnd';
import { List } from '@mui/material';
import { RegistrableSurvey } from '@/apis/survey';

export type Props = {
  items: RegistrableSurvey[];
  onDragEnd: OnDragEndResponder;
};

const DraggableList = ({ items, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      	<Droppable droppableId="droppable-list">
			{(provided) => (
				<List ref={provided.innerRef} {...provided.droppableProps}>
					{items.map((item: RegistrableSurvey, index: number) => (
						<DraggableListItem item={item} index={index} key={item.survey_no} />
					))}
					{provided.placeholder}
				</List>
			)}
      	</Droppable>
    </DragDropContext>
  );
};

export default DraggableList;
