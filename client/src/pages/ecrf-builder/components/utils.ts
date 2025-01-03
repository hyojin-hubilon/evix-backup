import { v4 as uuidv4 } from 'uuid';
import { Idstype, ItemType } from "@/types/ecrf";
import { DraggableLocation } from "@hello-pangea/dnd";

export function shortId() {
	return "_" + Math.random().toString(36).substr(2, 9);
}


export const getParentIndexByChildId = (list: Idstype[], childId: string) => {
	return list.findIndex((e, i) => Object.keys(list[i]).some((key2) => key2 === childId));
}

export const reorder = (destinationId:string, startIndex:number, endIndex:number, ids: Idstype[]) => {
	const result = Array.from(ids);
	const parentIndex = getParentIndexByChildId(ids, destinationId);

	const itemsResult = Array.from(ids[parentIndex][destinationId]);
	const [removed] = itemsResult.splice(startIndex, 1);
	itemsResult.splice(endIndex, 0, removed);

	result[parentIndex][destinationId] = itemsResult;

	return result;
};

export const copy = (list: Idstype[], source:ItemType[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation) => {
	const destinationId = droppableDestination.droppableId;
	const parentIndex = getParentIndexByChildId(list, destinationId);
	
	const sourceClone = Array.from(source);
	const destClone = Array.from(list[parentIndex][destinationId]);
	const item = sourceClone[droppableSource.index];

	destClone.splice(droppableDestination.index, 0, { ...item, id: uuidv4() });
	const result = list;
	result[parentIndex][destinationId] = destClone;
	
	return result;
};

export const move = (droppableSource:DraggableLocation, droppableDestination:DraggableLocation, ids: Idstype[]) => {
	const sourceId = droppableSource.droppableId;
	const destinationId = droppableDestination.droppableId;

	const sourceParentIndex = getParentIndexByChildId(ids, sourceId);
	const destinationParentIndex = getParentIndexByChildId(ids, destinationId);
	
	const sourceClone = Array.from(ids[sourceParentIndex][sourceId]);
	const destClone = Array.from(ids[destinationParentIndex][destinationId]);
	const [removed] = sourceClone.splice(droppableSource.index, 1);

	destClone.splice(droppableDestination.index, 0, removed);

	const result = ids;
	result[sourceParentIndex][sourceId] = sourceClone;
	result[destinationParentIndex][destinationId]= destClone;

	return result;
};


export const reorderParentBox = (sourceIndex:number, destIndex:number, ids: Idstype[]) => {
	const result = Array.from(ids);
	const [removed] = result.splice(sourceIndex, 1);
	result.splice(destIndex, 0, removed);

	return result;	
}

export const deleteItem = (list:Idstype[], droppableId:string, index:number) => {
	const result = Array.from(list);
	const parentIndex = getParentIndexByChildId(list, droppableId);

	const itemsResult = Array.from(list[parentIndex][droppableId]);
	
	itemsResult.splice(index, 1);

	result[parentIndex][droppableId] = itemsResult;

	return result;	
}

