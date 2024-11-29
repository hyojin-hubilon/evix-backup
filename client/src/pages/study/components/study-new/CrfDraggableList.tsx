import { DragDropContext, Droppable, OnDragEndResponder } from '@hello-pangea/dnd';
import { List } from '@mui/material';
import { MyCRFList } from '@/types/ecrf';
import CrfDraggableListItem from './CrfDraggableListItem';

export type CrfDraggableListProps = {
    items: MyCRFList[];
    onDragEnd: OnDragEndResponder;
    onDeleteClick: (survey) => void;
    // addedCrf: Set<number>;
};

const CrfDraggableList = ({
    items,
    onDragEnd,
    onDeleteClick,
    // addedCrf
}: CrfDraggableListProps) => {
    
    const handleDeleteCrf = (crf: MyCRFList) => {
        onDeleteClick(crf);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-list" type="content">
                {(provided) => (
                    <List ref={provided.innerRef} {...provided.droppableProps}>
                        {items.map((item: MyCRFList, index: number) => (
                            <CrfDraggableListItem
                                item={item}
                                index={index}
                                key={item.crf_no}
                                deleteItem={handleDeleteCrf}
								// isAddedSurvey={addedCrf.has(item.crf_no)}
                            />
                        ))}
                        {provided.placeholder}
                    </List>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default CrfDraggableList;
