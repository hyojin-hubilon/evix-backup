import { Draggable } from '@hello-pangea/dnd';
import { Grid, Button, ListItem, ListItemText, MenuItem, Select, useTheme } from '@mui/material';
import { RegistrableSurvey } from '@/types/survey';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { useState } from 'react';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

export type DraggableItemListProps = {
    item: RegistrableSurvey;
    index: number;
    itemChanged: (item: RegistrableSurvey, index: number) => void;
    deleteItem: (survey: RegistrableSurvey) => void;
    mode: 'create' | 'edit';
    isAddedSurvey: boolean;
};

const DraggableListItem = ({
    item,
    index,
    itemChanged,
    deleteItem,
    mode,
    isAddedSurvey,
}: DraggableItemListProps) => {
    const [survey, setSurvey] = useState(item);
    const theme = useTheme();
    const { grey } = theme.palette;
	
	const { t, i18n } = useTranslation();

    const handleChangeFrequency = (e) => {
        const changedSurvey = { ...survey, frequency: e };
        setSurvey(changedSurvey);
        itemChanged(changedSurvey, index);
    };

    const handleChangeTimes = (e) => {
        const changedSurvey = { ...survey, times: e };
        setSurvey(changedSurvey);
        itemChanged(changedSurvey, index);
    };

    const handleDeleteSurvey = () => {
        deleteItem(survey);
    };

    // 기존에 연결된 survey는 disabled 처리, 새로 연결된 survey는 주기, 횟수 설정 가능하도록 함
    const isDisabled = mode === 'edit' && !isAddedSurvey;

    return (
        <Draggable draggableId={item.title} index={index} isDragDisabled={mode === 'edit' ? true : false}>
            {(provided, snapshot) => (
                <ListItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    sx={{
                        background: snapshot.isDragging ? 'rgb(235,235,235)' : 'white',
                        border: `1px dashed ${grey[300]}`,
                        borderRadius: '5px',
                        cursor: 'pointer',
                        mb: '5px',
                        '&:last-child': {
                            mb: 0,
                        },
                    }}
                >
                    <Grid container alignItems="center" gap={1}>
						{
							mode === 'create' && <DragHandleIcon sx={{ color: grey[500] }} />
						}
                        
                        <ListItemText primary={survey.title} sx={{ maxWidth: '280px' }} />


						{
							i18n.language === 'en' ? <>
							
							{t('study.repeat')}
							<Select
								size="small"
								value={survey.times}
								onChange={(e) => handleChangeTimes(e.target.value)}
								sx={{ width: '60px', bgcolor: 'white' }}
								disabled={isDisabled}
							>
								<MenuItem value={1}>1</MenuItem>
								<MenuItem value={2}>2</MenuItem>
								<MenuItem value={3}>3</MenuItem>
							</Select>
							{/* 회 반복 */}
							{t('study.time_per')}
							<Select
								size="small"
								value={survey.frequency}
								onChange={(e) => handleChangeFrequency(e.target.value)}
								sx={{ width: '90px', bgcolor: 'white' }}
								disabled={isDisabled}
							>
								<MenuItem value="monthly">{t('study.monthly')}</MenuItem>
								<MenuItem value="weekly">{t('study.weekly')}</MenuItem>
								<MenuItem value="daily">{t('study.daily')}</MenuItem>
							</Select>
							{/* 마다 */}
							</>
							:
							<>
							<Select
								size="small"
								value={survey.frequency}
								onChange={(e) => handleChangeFrequency(e.target.value)}
								sx={{ width: '60px', bgcolor: 'white' }}
								disabled={isDisabled}
							>
								<MenuItem value="monthly">{t('study.monthly')}</MenuItem>
								<MenuItem value="weekly">{t('study.weekly')}</MenuItem>
								<MenuItem value="daily">{t('study.daily')}</MenuItem>
							</Select>
							{/* 마다 */}
							{t('study.repeat')}
							<Select
								size="small"
								value={survey.times}
								onChange={(e) => handleChangeTimes(e.target.value)}
								sx={{ width: '60px', bgcolor: 'white' }}
								disabled={isDisabled}
							>
								<MenuItem value={1}>1</MenuItem>
								<MenuItem value={2}>2</MenuItem>
								<MenuItem value={3}>3</MenuItem>
							</Select>
							{/* 회 반복 */}
							{t('study.time_per')}
						</>
						}
                        
                        <Button color="error" onClick={() => handleDeleteSurvey()}>
                            {/* 삭제 */}
                            {t('common.delete')}
                        </Button>
                    </Grid>
                </ListItem>
            )}
        </Draggable>
    );
};

export default DraggableListItem;
