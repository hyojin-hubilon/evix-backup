import { DragDropContext, Droppable, OnDragEndResponder } from '@hello-pangea/dnd';
import { List } from '@mui/material';
import { MyCRFList } from '@/types/ecrf';
import CrfDraggableListItem from './CrfDraggableListItem';

export type CrfDraggableListProps = {
    items: MyCRFList[];
    onDragEnd: OnDragEndResponder;
    itemChanged: (items) => void;
    onDeleteClick: (survey) => void;
    addedCrf: Set<number>;
};

const CrfDraggableList = ({
    items,
    onDragEnd,
    itemChanged,
    onDeleteClick,
    addedCrf
}: CrfDraggableListProps) => {
    const handleChangeCrf = (item: MyCRFList, index: number) => {
        items[index] = item;
        itemChanged(items);
    };

    const handleDeleteCrf = (crf: MyCRFList) => {
        onDeleteClick(crf);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-list">
                {(provided) => (
                    <List ref={provided.innerRef} {...provided.droppableProps}>
                        {items.map((item: MyCRFList, index: number) => (
                            <CrfDraggableListItem
                                item={item}
                                index={index}
                                key={item.crf_no}
                                deleteItem={handleDeleteCrf}
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
