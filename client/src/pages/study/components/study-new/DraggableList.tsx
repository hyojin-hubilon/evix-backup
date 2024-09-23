import DraggableListItem from './DraggableListItem';
import { DragDropContext, Droppable, OnDragEndResponder } from '@hello-pangea/dnd';
import { List } from '@mui/material';
import { RegistrableSurvey } from '@/types/survey';

export type DraggableListProps = {
    items: RegistrableSurvey[];
    onDragEnd: OnDragEndResponder;
    itemChanged: (items) => void;
    onDeleteClick: (survey) => void;
    mode: 'create' | 'edit';
    addedSurveys: Set<number>;
};

const DraggableList = ({
    items,
    onDragEnd,
    itemChanged,
    onDeleteClick,
    mode,
    addedSurveys,
}: DraggableListProps) => {
    const handleChangeSurvey = (item: RegistrableSurvey, index: number) => {
        items[index] = item;
        itemChanged(items);
    };

    const handleDeleteSurvey = (survey: RegistrableSurvey) => {
        onDeleteClick(survey);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-list">
                {(provided) => (
                    <List ref={provided.innerRef} {...provided.droppableProps}>
                        {items.map((item: RegistrableSurvey, index: number) => (
                            <DraggableListItem
                                item={item}
                                index={index}
                                key={item.survey_no}
                                itemChanged={handleChangeSurvey}
                                deleteItem={handleDeleteSurvey}
                                mode={mode}
                                isAddedSurvey={addedSurveys.has(item.survey_no)}
                            />
                        ))}
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default DraggableList;
