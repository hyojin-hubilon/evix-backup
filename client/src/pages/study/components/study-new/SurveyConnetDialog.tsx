import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Grid,
    Hidden,
    IconButton,
    List,
    OutlinedInput,
    Snackbar,
    Typography,
    useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SurveyListTable, { SurveyAdd } from './SurveyListTable';
import { useEffect, useState } from 'react';
import { RegistrableSurvey } from '@/types/survey';
import DraggableList from './DraggableList';
import { DropResult } from '@hello-pangea/dnd';
import { reorder } from '@/utils/helper';
import SurveyConnectPreview from './SurveyConnectPreview';
import surveyApi from '@/apis/survey';
import studyApi from '@/apis/study';
import SurveyDeleteDialog from './SurveyDeleteDialog';

interface SurveyConnectDialogProps {
    isOpen: boolean;
    handleClose: () => void;
    setStudySurveySetList: (list: any[]) => void;
    initialSurveySetList: any[] | null;
    mode: 'create' | 'edit';
    studyNo?: number;
}

interface StudySurveySet {
    survey_cycle: string;
    number_in_cycle: number;
    sort: number;
    surveyList: { survey_no: number; sort: number; title: string }[];
}

const SurveyConnectDialog = ({
    isOpen,
    handleClose,
    setStudySurveySetList,
    initialSurveySetList,
    mode,
    studyNo,
}: SurveyConnectDialogProps) => {
    const theme = useTheme();
    const { grey } = theme.palette;
    const [searchText, setSearchText] = useState('');
    const [previewSurveyNo, setPreviewSurveyNo] = useState<number>();
    const [surveyList, setSurveyList] = useState<RegistrableSurvey[]>([]);
    const [searchedResult, setSearchedResult] = useState<RegistrableSurvey[]>([]);
    const [selectedSurvey, setSelectedSurvey] = useState<RegistrableSurvey[]>([]);

    const [successMessage, setSuccessMessage] = useState('');
    const [openAlert, setOpenAlert] = useState<boolean>(false);

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [surveyToDelete, setSurveyToDelete] = useState<RegistrableSurvey | null>(null);

    // console.log('initialSurveySetList: ', initialSurveySetList);

    const fetchSurvey = async () => {
        try {
            const response = await surveyApi.registrableSurvey();
            if (response.code === 200 && response.result) {
                const newSurveyList = response.content || [];
                setSurveyList(newSurveyList);
                setSearchedResult(newSurveyList);
            }
        } catch (error) {
            console.error('Failed to fetch surveys:', error);
        }
    };

    const handleDeleteClick = (survey: RegistrableSurvey) => {
        if (mode === 'edit') {
            setSurveyToDelete(survey);
            setShowDeleteConfirm(true);
        } else {
            // mode가 'create'인 경우 바로 삭제
            const newSelectedSurvey = selectedSurvey.filter(
                (s) => s.survey_no !== survey.survey_no
            );
            setSelectedSurvey(newSelectedSurvey);
        }
    };

    const handleDeleteConfirm = async () => {
        if (surveyToDelete) {
            try {
                await studyApi.disconnectSurvey({
                    std_no: studyNo,
                    set_no: surveyToDelete.set_no,
                    survey_no: surveyToDelete.survey_no,
                });
                const newSelectedSurvey = selectedSurvey.filter(
                    (s) => s.survey_no !== surveyToDelete.survey_no
                );
                setSelectedSurvey(newSelectedSurvey);
                setSuccessMessage('설문이 성공적으로 삭제되었습니다.');
                setOpenAlert(true);
            } catch (error) {
                console.error('Failed to disconnect survey:', error);
                setSuccessMessage('설문 삭제에 실패했습니다.');
                setOpenAlert(true);
            }
        }
        setShowDeleteConfirm(false);
        setSurveyToDelete(null);
    };

    const handleDeleteCancel = () => {
        setShowDeleteConfirm(false);
        setSurveyToDelete(null);
    };

    useEffect(() => {
        // Study Info -> Survey Edit 시
        if (initialSurveySetList) {
            const flattenedSurveys = initialSurveySetList.flatMap((set) =>
                set.surveyList.map((survey) => ({
                    ...survey,
                    frequency: set.survey_cycle.toLowerCase(),
                    times: set.number_in_cycle,
                    set_no: set.set_no, // set_no를 추가
                }))
            );
            setSelectedSurvey(flattenedSurveys);
        }
        fetchSurvey();
    }, [initialSurveySetList]);

    const handleSelectedSurvey = (addSurvey: SurveyAdd) => {
        if (addSurvey.type === 'add') {
            const newSurveyItem = { ...addSurvey.survey, frequency: 'monthly', times: 1, sort: 1 };
            setSelectedSurvey([...selectedSurvey, newSurveyItem]);
        } else {
            const newItems = selectedSurvey
                .filter((survey) => survey.survey_no !== addSurvey.survey.survey_no)
                .map((survey, index) => ({ ...survey, sort: index + 1 }));
            setSelectedSurvey(newItems);
        }
    };

    const onDragEnd = ({ destination, source }: DropResult) => {
        // dropped outside the list
        if (!destination || !selectedSurvey) return;

        const newItems = reorder(selectedSurvey, source.index, destination.index);

        setSelectedSurvey(newItems);
    };

    const handleChangeSurveyItem = (items: RegistrableSurvey[]) => {
        setSelectedSurvey(items);
    };

    const handleConnectSurvey = async () => {
        if (mode === 'edit') {
            let newStudySurveySetList: StudySurveySet[];

            if (initialSurveySetList) {
                // 기존 설문이 있는 경우
                const newSurveys = selectedSurvey.filter(
                    (survey) =>
                        !initialSurveySetList.some((set) =>
                            set.surveyList.some((s) => s.survey_no === survey.survey_no)
                        )
                );

                newStudySurveySetList = newSurveys.reduce(
                    (acc: StudySurveySet[], survey: RegistrableSurvey) => {
                        const cycleKey = survey.frequency.toUpperCase();
                        const timesKey = survey.times ?? 1;
                        const existingSet = acc.find(
                            (set) =>
                                set.survey_cycle === cycleKey && set.number_in_cycle === timesKey
                        );

                        if (existingSet) {
                            existingSet.surveyList.push({
                                survey_no: survey.survey_no,
                                sort: existingSet.surveyList.length + 1,
                                title: survey.title,
                            });
                        } else {
                            acc.push({
                                survey_cycle: cycleKey,
                                number_in_cycle: timesKey,
                                sort: 1,
                                surveyList: [
                                    { survey_no: survey.survey_no, sort: 1, title: survey.title },
                                ],
                            });
                        }

                        return acc;
                    },
                    []
                );
            } else {
                // initialSurveySetList가 null인 경우 (기존 설문이 없는 경우)
                newStudySurveySetList = selectedSurvey.reduce(
                    (acc: StudySurveySet[], survey: RegistrableSurvey) => {
                        const cycleKey = survey.frequency.toUpperCase();
                        const timesKey = survey.times ?? 1;
                        const existingSet = acc.find(
                            (set) =>
                                set.survey_cycle === cycleKey && set.number_in_cycle === timesKey
                        );

                        if (existingSet) {
                            existingSet.surveyList.push({
                                survey_no: survey.survey_no,
                                sort: existingSet.surveyList.length + 1,
                                title: survey.title,
                            });
                        } else {
                            acc.push({
                                survey_cycle: cycleKey,
                                number_in_cycle: timesKey,
                                sort: 1,
                                surveyList: [
                                    { survey_no: survey.survey_no, sort: 1, title: survey.title },
                                ],
                            });
                        }

                        return acc;
                    },
                    []
                );
            }

            if (newStudySurveySetList.length > 0) {
                try {
                    const data = {
                        std_no: studyNo,
                        std_start_date: initialSurveySetList
                            ? initialSurveySetList[0].survey_start_date
                            : undefined,
                        std_end_date: initialSurveySetList
                            ? initialSurveySetList[0].survey_end_date
                            : undefined,
                        studySurveySetList: newStudySurveySetList,
                    };
                    await studyApi.postSurvey(data);
                    setSuccessMessage('새로운 설문이 성공적으로 연결되었습니다.');
                    setOpenAlert(true);
                } catch (error) {
                    console.error('Failed to post survey:', error);
                    setSuccessMessage('설문 연결에 실패했습니다.');
                    setOpenAlert(true);
                }
            } else {
                setSuccessMessage('새로 추가된 설문이 없습니다.');
                setOpenAlert(true);
            }
        } else if (mode === 'create') {
            const newStudySurveySetList: StudySurveySet[] = selectedSurvey.reduce(
                (acc: StudySurveySet[], survey: RegistrableSurvey) => {
                    const cycleKey = survey.frequency.toUpperCase();
                    const timesKey = survey.times ?? 1;

                    const existingSet = acc.find(
                        (set) => set.survey_cycle === cycleKey && set.number_in_cycle === timesKey
                    );

                    if (existingSet) {
                        existingSet.surveyList.push({
                            survey_no: survey.survey_no,
                            // sort: 1,
                            sort: existingSet.surveyList.length + 1,
                            title: survey.title,
                        });
                    } else {
                        acc.push({
                            survey_cycle: cycleKey,
                            number_in_cycle: timesKey,
                            sort: 1,
                            surveyList: [
                                { survey_no: survey.survey_no, sort: 1, title: survey.title },
                            ],
                        });
                    }

                    return acc;
                },
                []
            );
            setStudySurveySetList(newStudySurveySetList);
        }

        handleClose();
    };

    const handleSearchSurvey = (e) => {
        e.preventDefault();
        const searched = surveyList.filter((survey) =>
            survey.title.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResult(searched);
    };

    const handleSeeAll = () => {
        setSearchText('');
        setSearchedResult(surveyList);
    };

    const handleSelectPreview = (surveyNo) => {
        console.log(surveyNo);
        setPreviewSurveyNo(surveyNo);
    };

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="survey-connect-title"
                aria-describedby="survey-connect-description"
                maxWidth="lg"
                scroll="body"
            >
                <Grid container width={previewSurveyNo ? 1100 : 730}>
                    <Grid item xs={previewSurveyNo ? 8 : 12}>
                        <DialogTitle id="survey-connect-title" variant="h4">
                            Survey 연결
                            <IconButton
                                size="small"
                                sx={{ position: 'absolute', top: '10px', left: '680px' }}
                                onClick={handleClose}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent sx={{ overflow: 'hidden' }}>
                            <Typography
                                id="survey-connect-description"
                                sx={{
                                    'span': {
                                        display: 'block',
                                    },
                                }}
                            >
                                <span>1개 이상의 Survey를 연결해주세요.</span>
                                <span>Survey가 여러개일 경우, 설정 순서에 따라 진행됩니다.</span>
                            </Typography>
                            <form onSubmit={handleSearchSurvey}>
                                <Box display="flex" mt="1rem" mb="1rem" gap={1}>
                                    <FormControl size="small" sx={{ width: '400px' }}>
                                        <OutlinedInput
                                            placeholder="Survey 제목"
                                            value={searchText}
                                            onChange={(e) => setSearchText(e.target.value)}
                                        />
                                    </FormControl>
                                    <Button
                                        variant="contained"
                                        sx={{ flexGrow: 1 }}
                                        type="submit"
                                        onClick={handleSearchSurvey}
                                    >
                                        검색
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        sx={{ flexGrow: 1 }}
                                        onClick={handleSeeAll}
                                    >
                                        전체보기
                                    </Button>
                                </Box>
                            </form>

                            {selectedSurvey.length > 0 && (
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    gap="0.5rem"
                                    alignItems="center"
                                >
                                    <Box
                                        sx={{
                                            borderRadius: '5px',
                                            backgroundColor: grey[100],
                                            p: '0.5rem',
                                            'ul': { p: 0 },
                                            width: 1,
                                        }}
                                    >
                                        <DraggableList
                                            items={selectedSurvey}
                                            onDragEnd={onDragEnd}
                                            itemChanged={handleChangeSurveyItem}
                                            onDeleteClick={handleDeleteClick}
                                            mode={mode}
                                        />
                                    </Box>

                                    <Button
                                        onClick={handleConnectSurvey}
                                        variant="contained"
                                        sx={{ width: '10rem' }}
                                    >
                                        연결하기
                                    </Button>
                                </Box>
                            )}

                            <Box mt={1}>
                                <SurveyListTable
                                    surveyList={searchedResult}
                                    selectedSurvey={selectedSurvey}
                                    handleSelected={(e) => handleSelectedSurvey(e)}
                                    handleSelectPreview={(surveyNo) =>
                                        handleSelectPreview(surveyNo)
                                    }
                                />
                            </Box>
                        </DialogContent>
                    </Grid>
                    <Grid item xs={previewSurveyNo ? 4 : 0}>
                        {previewSurveyNo && <SurveyConnectPreview surveyNo={previewSurveyNo} />}
                    </Grid>
                </Grid>
            </Dialog>
            <Snackbar
                open={openAlert}
                autoHideDuration={3000}
                onClose={() => setOpenAlert(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setOpenAlert(false)}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    {successMessage}
                </Alert>
            </Snackbar>

            <SurveyDeleteDialog
                isOpen={showDeleteConfirm}
                handleClose={handleDeleteCancel}
                handleConfirm={handleDeleteConfirm}
            />
        </>
    );
};

export default SurveyConnectDialog;
