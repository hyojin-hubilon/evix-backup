import { Draggable } from '@hello-pangea/dnd';
import { Grid, Button, ListItem, ListItemText, MenuItem, Select, useTheme, Box } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { useState } from 'react';
import { t } from 'i18next';
import { MyCRFList } from '@/types/ecrf';

export type CrfDraggableItemListProps = {
    item: MyCRFList;
    index: number;
    deleteItem: (survey: MyCRFList) => void;  
};

const CrfDraggableListItem = ({
    item,
    index,
    deleteItem,
	
}: CrfDraggableItemListProps) => {
    const [crf, setCrf] = useState(item);
    const theme = useTheme();
    const { grey } = theme.palette;


    const handleDeleteCrf = () => {
        deleteItem(crf);
    };

    return (
        <Draggable draggableId={`crfDraggable-${item.crf_no}`} index={index}>
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
                    <Grid container alignItems="center" justifyContent="space-between "gap={1}>
						<Box display="flex" gap={1}>
							<DragHandleIcon sx={{ color: grey[500] }} />
							<ListItemText primary={crf.crf_title} sx={{ maxWidth: '280px' }} />
						</Box>
                        <Button color="error" onClick={() => handleDeleteCrf()}>
                            {/* 삭제 */}
                            {t('common.delete')}
                        </Button>
                    </Grid>
                </ListItem>
            )}
        </Draggable>
    );
};

export default CrfDraggableListItem;
