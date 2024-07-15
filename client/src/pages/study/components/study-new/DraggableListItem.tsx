import { Draggable } from '@hello-pangea/dnd';
import {
	Grid,
	Button,
	ListItem,
	ListItemText,
	MenuItem,
	Select,
	useTheme
} from '@mui/material';
import { RegistrableSurvey } from '@/apis/survey';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { useState } from 'react';

export type DraggableItemListProps = {
	item: RegistrableSurvey,
	index: number,
	itemChanged : (item: RegistrableSurvey, index: number) => void,
	deleteItem : (index: number) => void
};

const DraggableListItem = ({ item, index, itemChanged, deleteItem }: DraggableItemListProps) => {
	const [ survey, setSurvey ] = useState(item);
	const theme = useTheme();
	const { grey } = theme.palette;

	const handleChangeFrequency = (e) => {
		const changedSurvey = {...survey, frequency: e}; 
		setSurvey(changedSurvey);
		itemChanged(changedSurvey, index);
	}

	const handleChangeTimes = (e) => {
		const changedSurvey = { ...survey, times: e};
		setSurvey(changedSurvey);
		itemChanged(changedSurvey, index);
	}

	const handleDeleteSurvey = (surveyNo: number) => {
		deleteItem(surveyNo);
	}

  	return (
    	<Draggable draggableId={item.title} index={index}>
			{(provided, snapshot) => (
				<ListItem
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					sx={{
						background : snapshot.isDragging ? 'rgb(235,235,235)' : 'white',
						border: `1px dashed ${grey[300]}`,
						borderRadius: "5px", cursor:'pointer',
						mb: '5px',
						'&:last-child': {
							mb: 0
						}
					}}
				>
					<Grid container alignItems="center" gap={1}>
						<DragHandleIcon sx={{ color: grey[500]}}/>
						<ListItemText primary={survey.title} sx={{maxWidth: "280px"}} />
						
						<Select
							size="small"
							value={survey.frequency}
							onChange={(e) => handleChangeFrequency(e.target.value)}
							sx={{width: "60px", bgcolor: "white"}}
							>
							<MenuItem value="month">월</MenuItem>
							<MenuItem value="week">주</MenuItem>
							<MenuItem value="day">일</MenuItem>
						</Select>
						마다
						<Select
							size="small"
							value={survey.times}
							onChange={(e) => handleChangeTimes(e.target.value)}
							sx={{width: "60px", bgcolor: "white"}}
							>
							<MenuItem value={1}>1</MenuItem>
							<MenuItem value={2}>2</MenuItem>
							<MenuItem value={3}>3</MenuItem>
						</Select>
						회 반복

						<Button color="error" onClick={() => handleDeleteSurvey(item.survey_no)}>삭제</Button>
					</Grid>
				</ListItem>
			)}
    	</Draggable>
 	);
};

export default DraggableListItem;
