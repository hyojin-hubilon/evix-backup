import {
    Alert,
    Box,
    Button,
    Dialog,
    DialogContent,
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
import SurveyPreview from './SurveyPreview';
import surveyApi from '@/apis/survey';

const SurveyConnectDialog = ({ isOpen, handleClose, setStudySurveySetList }) => {
    const theme = useTheme();
    const { grey } = theme.palette;
    const [searchText, setSearchText] = useState('');
    const [previewSurveyNo, setPreviewSurveyNo] = useState<number>();
    const [surveyList, setSurveyList] = useState<RegistrableSurvey[]>([]);
    const [searchedResult, setSearchedResult] = useState<RegistrableSurvey[]>([]);
    const [selectedSurvey, setSelectedSurvey] = useState<RegistrableSurvey[]>([]);

    const [successMessage, setSuccessMessage] = useState('');
    const [openAlert, setOpenAlert] = useState<boolean>(false);

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

    useEffect(() => {
        fetchSurvey();
    }, []);

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

    const handleConnectSurvey = () => {
        // 원하는 구조로 배열을 다시 만들어야 함...
        const groupedSurveys = selectedSurvey.reduce((acc, survey) => {
            const cycleKey = survey.frequency.toUpperCase(); // 주기 (DAILY, WEEKLY, MONTHLY)
            const timesKey = survey.times; // 횟수

            const groupKey = `${cycleKey}_${timesKey}`; // MONTHLY_2, WEEKLY_1 이런식으로 묶자

            if (!acc[groupKey]) {
                acc[groupKey] = [];
            }

            acc[groupKey].push(survey);
            return acc;
        }, {});

        const newStudySurveySetList = Object.keys(groupedSurveys).map((groupKey, index) => {
            const [cycle, times] = groupKey.split('_');
            const sortedSurveys = groupedSurveys[groupKey].sort(
                (a: { sort: number }, b: { sort: number }) => a.sort - b.sort
            );

            return {
                survey_cycle: cycle,
                number_in_cycle: times,
                sort: index + 1,
                surveyList: sortedSurveys.map((survey: { survey_no: number }, idx: number) => ({
                    survey_no: survey.survey_no,
                    sort: idx + 1,
                })),
            };
        });

        console.log(newStudySurveySetList);
        setStudySurveySetList(newStudySurveySetList);
        setSuccessMessage('연결되었습니다');
        setOpenAlert(true);
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
                                    handleSelectPreview={(studyNo) => handleSelectPreview(studyNo)}
                                />
                            </Box>
                        </DialogContent>
                    </Grid>
                    <Grid item xs={previewSurveyNo ? 4 : 0}>
                        {previewSurveyNo && <SurveyPreview surveyNo={previewSurveyNo} />}
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
        </>
    );
};

export default SurveyConnectDialog;
