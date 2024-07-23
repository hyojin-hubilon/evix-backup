import { createSlice } from "@reduxjs/toolkit";
import { QuestionTypes } from "@/types/survey";
import { PersistState } from "redux-persist/lib/types";

export interface StateProps {
	cards: CardProps[];
	required: string;
	_persist: PersistState;
}
export interface ItemTypeProps { //options
	id: string;
	text?: string;
	example_title?: string;
	isEtc?: boolean;
}
  
export interface CardProps { //question
	id: string;
	cardTitle: string;
	inputType: QuestionTypes;
	contents: ItemTypeProps[] | string;
	isFocused: boolean;
	isRequired: boolean;
}
interface PayloadProps {
	[key: string]: string;
}

interface ActionProps {
	type: string;
	payload: PayloadProps;
}

const initialCards = {
	id: "TitleCard",
	cardTitle: "제목 없는 설문지",
	inputType: "TITLE",
	contents: "설명",
	isFocused: false,
	isRequired: false,
};

const createNewCard = (cardId: string, cardTitle = "") => ({
	id: cardId,
	cardTitle,
	inputType: QuestionTypes.WRITE,
	contents: "",
	isFocused: true,
	isRequired: false,
});

export const requiredSlice = createSlice({
	name: "Required",
	initialState: "",
	reducers: {
		setRequiredCardId: (state: string, action: ActionProps) => action.payload.cardId,
		removeRequiredCardId: () => "",
	},
});

const sortEtcItem = (currentContents: ItemTypeProps[]) => {
	const etcIndex = currentContents.findIndex((content) => content.isEtc);
	if (etcIndex !== -1) {
	  const etcItem = { ...currentContents[etcIndex] };
	  currentContents.splice(etcIndex, 1);
	  currentContents.push(etcItem);
	}
	return currentContents;
  };
  
  const deleteEtcItem = (currentContents: ItemTypeProps[]) => {
	const etcIndex = currentContents.findIndex((content) => content.isEtc);
	if (etcIndex !== -1) {
	  currentContents.splice(etcIndex, 1);
	}
	return currentContents;
  };
  
export const cardSlice = createSlice({
	name: "Reducer",
	initialState: [initialCards] as CardProps[],
	reducers: {
	 	addCard: (state: CardProps[], action: ActionProps) => {
			const copiedState = state.map((card) => ({ ...card, isFocused: false }));
	
			if (Number(action.payload.focusedCardIndex) > 0) {
				copiedState.splice(Number(action.payload.focusedCardIndex) + 1, 0, createNewCard(action.payload.cardId, action.payload.cardTitle));
			} else {
				copiedState.push(createNewCard(action.payload.cardId, action.payload.cardTitle));
			}

			return copiedState;
	  	},
  
		copyCard: (state: CardProps[], action: ActionProps) => {
			const copiedState = state.map((card) => ({ ...card, isFocused: false }));
			const targetCard = copiedState.find((card) => card.id === action.payload.cardId) as CardProps;
			const targetCardIndex = copiedState.findIndex((card) => card.id === action.payload.cardId);
			const copiedCard = {
				...targetCard,
				id: action.payload.copiedCardId,
				isFocused: true,
			};
			
			if (typeof copiedCard.contents === "object") {
				const itemTypeCopiedCardContents = copiedCard.contents.map((example, index) => ({
					...example,
					id: String(Number(action.payload.copiedCardId) + index),
				}));
				copiedCard.contents = itemTypeCopiedCardContents;
			}

			copiedState.splice(targetCardIndex + 1, 0, copiedCard);
			return copiedState;
		},
  
		removeCard: (state: CardProps[], action: ActionProps) => {
			const copiedState = state.map((card) => ({ ...card, isFocused: false }));
			const targetCardIndex = copiedState.findIndex((card) => card.id === action.payload.cardId);
			const filteredState = copiedState.filter((card) => card.id !== action.payload.cardId);
			if (targetCardIndex !== 1) {
				return filteredState.map((card, index) =>
					index === targetCardIndex - 1 ? { ...card, isFocused: true } : card,
				);
			}
			if (targetCardIndex === 1) {
				return filteredState.map((card, index) =>
					index === targetCardIndex ? { ...card, isFocused: true } : card,
				);
			}
	
			return filteredState;
		},
  
		focus: (state: CardProps[], action: ActionProps) => {
			const copiedState = state.map((card) =>
			action.payload.id === card.id
				? { ...card, isFocused: true }
				: { ...card, isFocused: false },
			);
			return copiedState;
		},
  
		typeChange: (state: CardProps[], action: ActionProps) => {
			const targetCard = state.find((card) => card.id === action.payload.id) as CardProps;
			if (
			!(
				targetCard.inputType === QuestionTypes.SINGLE ||
				targetCard.inputType === QuestionTypes.MULTIPLE
			) &&
			(action.payload.inputType === QuestionTypes.SINGLE ||
				action.payload.inputType === QuestionTypes.MULTIPLE)
			) {
				targetCard.contents = [
					{
					id: String(Date.now()),
					text: "옵션 1",
					},
				];
			} else if (
				(targetCard.inputType === QuestionTypes.SINGLE ||
					targetCard.inputType === QuestionTypes.MULTIPLE) &&
				!(
					action.payload.inputType === QuestionTypes.SINGLE ||
					action.payload.inputType === QuestionTypes.MULTIPLE
				)
			) {
				targetCard.contents = "";
			}
			if (
			targetCard.inputType === QuestionTypes.SINGLE && action.payload.inputType === QuestionTypes.MULTIPLE
			) {
				deleteEtcItem(targetCard.contents as ItemTypeProps[]);
			}
			targetCard.inputType = action.payload.inputType as QuestionTypes;
	  	},
  
		addSelectItem: (state: CardProps[], action: ActionProps) => {
			const contents = state.find((card) => card.id === action.payload.id)
			?.contents as ItemTypeProps[];
			contents.push({ id: action.payload.contentId, text: action.payload.text });
			sortEtcItem(contents);
		},
  
		removeSelectItem: (state: CardProps[], action: ActionProps) => {
			const targetCard = state.find((card) => card.id === action.payload.cardId) as CardProps;
			const contents = targetCard.contents as ItemTypeProps[];
			const filteredContents = contents.filter((item) => item.id !== action.payload.contentId);
			targetCard.contents = filteredContents;
		},
	
		setTitle: (state: CardProps[], action: ActionProps) => {
			const targetCard = state.find((card) => card.id === action.payload.cardId) as CardProps;
			targetCard.cardTitle = action.payload.text;
		},
  
		setText: (state: CardProps[], action: ActionProps) => {
			const targetCard = state.find((card) => card.id === action.payload.cardId) as CardProps;
	
			if (targetCard.inputType === QuestionTypes.TITLE) {
				targetCard.contents = action.payload.text;
			}
			if (
				targetCard.inputType === QuestionTypes.SINGLE ||
				targetCard.inputType === QuestionTypes.MULTIPLE
			) {
				const contents = targetCard.contents as ItemTypeProps[];
				const targetContent = contents.find(
					(content) => content.id === action.payload.contentId,
				) as ItemTypeProps;
				targetContent.text = action.payload.text;
			}
		},
  
		addEtcItem: (state: CardProps[], action: ActionProps) => {
			const contents = state.find((card) => card.id === action.payload.id)
			?.contents as ItemTypeProps[];
			contents.push({ id: action.payload.contentId, isEtc: true });
		},
	
		toggleIsRequired: (state: CardProps[], action: ActionProps) => {
			const targetCard = state.find((card) => card.id === action.payload.id) as CardProps;
			targetCard.isRequired = !targetCard.isRequired;
		},
  
		moveCard: (state: CardProps[], action: ActionProps) => {
			const copiedState = [...state];
			const movingCard = copiedState.splice(Number(action.payload.sourceIndex), 1);
			copiedState.splice(Number(action.payload.destinationIndex), 0, ...movingCard);
			return copiedState;
		},
  
		moveContent: (state: CardProps[], action: ActionProps) => {
			const targetCard = state.find((card) => card.id === action.payload.cardId) as CardProps;
			const contents = targetCard.contents as ItemTypeProps[];
			const tmp = contents.splice(Number(action.payload.sourceIndex), 1);
			contents.splice(Number(action.payload.destinationIndex), 0, ...tmp);
		},
	},
});

export const {
	addCard,
	copyCard,
	removeCard,
	focus,
	typeChange,
	addSelectItem,
	removeSelectItem,
	setTitle,
	setText,
	addEtcItem,
	toggleIsRequired,
	moveCard,
	moveContent,
  } = cardSlice.actions;