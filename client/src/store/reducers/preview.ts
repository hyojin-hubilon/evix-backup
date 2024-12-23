import { createSlice } from "@reduxjs/toolkit";
import { ExampleList, QuestionTypes } from "@/types/survey";
import { ParticipantSurveyExampleList } from "@/types/participant";

export interface PreviewStateProps {
	previewCards: PreviewProps[];
}
  
export interface PreviewProps {
	cardId: string;
	question: string;
	questionType: QuestionTypes;
	exampleList: ExampleList[] |  ParticipantSurveyExampleList[];
	isRequired: 'Y' | 'N';
}

interface ActionProps {
	type: string;
	payload: PreviewProps;
}

const createNewPreview = (cardId: string, question: string, questionType: QuestionTypes, exampleList: ExampleList[] | ParticipantSurveyExampleList[], isRequired: 'Y' | 'N' ) => ({
	cardId: cardId,
	question:question,
	questionType: questionType,
	exampleList: exampleList,
	isRequired: isRequired,
});
  
export const previewSlice = createSlice({
	name: "Preview",
	initialState: [] as PreviewProps[],
	reducers: {
		addPreview: (state: PreviewProps[], action: ActionProps) => {
			const copiedState = [...state];
			copiedState.push(createNewPreview(action.payload.cardId, action.payload.question, action.payload.questionType, action.payload.exampleList, action.payload.isRequired));
			return copiedState;
		},

		resetAll: (state: PreviewProps[]) => {
			state = [] as PreviewProps[]
			return state;
		},
	},
});

export const {
	addPreview,
	resetAll
} = previewSlice.actions;