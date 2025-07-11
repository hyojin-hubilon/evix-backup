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
import { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { RegistrableSurvey, SurveyDetail } from '@/types/survey';
import DraggableList from './DraggableList';
import { DropResult } from '@hello-pangea/dnd';
import { reorder } from '@/utils/helper';
import SurveyConnectPreview from './SurveyConnectPreview';
import surveyApi from '@/apis/survey';
import studyApi from '@/apis/study';
import SurveyDeleteDialog from './SurveyDeleteDialog';
import { t } from 'i18next';
import { ResCommonSuccess } from '@/apis/axios-common';
import { Link, useNavigate } from 'react-router-dom';
import { StudySurveyList, StudySurveySetList } from '@/types/study';

interface SurveyConnectDialogProps {
    isOpen: boolean;
    handleClose: () => void;
    setStudySurveySetList: (list: any[]) => void;
    initialSurveySetList: StudySurveySetList[] | null;
    mode: 'create' | 'edit';
    studyNo?: number;
    startDate?: string;
    endDate?: string;
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
    startDate,
    endDate,
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

    // 등록 가능한 설문 목록 api 분리
    const fetchSurvey = async () => {
        try {
            let response: ResCommonSuccess<RegistrableSurvey[]>;
            if (mode === 'edit' && studyNo) {
                response = await surveyApi.registrableSurveyStudyInfo(studyNo);
            } else {
                response = await surveyApi.registrableSurvey();
            }

            if (response && response.code === 200 && response.result) {
                const newSurveyList = response.content || [];
                setSurveyList(newSurveyList);
                setSearchedResult(newSurveyList);
            } else {
                console.warn('Unexpected response:', response);
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
                setSuccessMessage(t('study.survey_successfully_deleted')); //설문이 성공적으로 삭제되었습니다.
                setOpenAlert(true);
            } catch (error) {
                console.error('Failed to disconnect survey:', error);
                setSuccessMessage(t('study.failed_delete_survey')); //설문 삭제에 실패했습니다.
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
                set.surveyList.map((survey:StudySurveyList) => ({
                    ...survey,
                    frequency: set.survey_cycle.toLowerCase(),
                    times: set.number_in_cycle,
                    set_no: set.set_no, // set_no를 추가
                }))
            );
            setSelectedSurvey(flattenedSurveys);
        }

		if(isOpen) {
			fetchSurvey();
			setSearchText('');
		}
    }, [initialSurveySetList, isOpen]);

	

    // Survey 새로 추가되었는지 여부 판별하기 위함
    const [addedSurveys, setAddedSurveys] = useState(new Set<number>());

    const handleSelectedSurvey = (addSurvey: SurveyAdd) => {
        if (addSurvey.type === 'add') {
            const newSurveyItem = { ...addSurvey.survey, frequency: 'monthly', times: 1, sort: 1 };
            setSelectedSurvey([...selectedSurvey, newSurveyItem]);
            setAddedSurveys(new Set(addedSurveys).add(newSurveyItem.survey_no));
        } else {
            const newItems = selectedSurvey
                .filter((survey) => survey.survey_no !== addSurvey.survey.survey_no)
                .map((survey, index) => ({ ...survey, sort: index + 1 }));
            setSelectedSurvey(newItems);
            setAddedSurveys(
                new Set([...addedSurveys].filter((no) => no !== addSurvey.survey.survey_no))
            );
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
                            set.surveyList.some(
                                (s: { survey_no: number }) => s.survey_no === survey.survey_no
                            )
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

			console.log(newStudySurveySetList);
			// return;
			
            if (newStudySurveySetList.length > 0) {
                try {
                    const data = {
                        std_no: studyNo,
                        std_start_date: initialSurveySetList
                            ? initialSurveySetList[0].survey_start_date
                            : startDate,
                        std_end_date: initialSurveySetList
                            ? initialSurveySetList[0].survey_end_date
                            : endDate,
                        studySurveySetList: newStudySurveySetList,
                    };
                    await studyApi.postSurvey(data);
                    setSuccessMessage(t('study.new_survey_connected')); //새로운 설문이 성공적으로 연결되었습니다.
                    setOpenAlert(true);
                } catch (error) {
                    console.error('Failed to post survey:', error);
                    setSuccessMessage(t('study.failed_connect_survey')); //설문 연결에 실패했습니다.
                    setOpenAlert(true);
                }
            } else {
                setSuccessMessage(t('study.no_new_surveys')); //새로 추가된 설문이 없습니다.
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

    const handleSearchSurvey = (e:FormEvent) => {
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

    const handleSelectPreview = (surveyNo:number) => {
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
				aria-hidden="false"
                maxWidth="lg"
                scroll="body"
            >
                <Grid container width={previewSurveyNo ? 1100 : 730}>
                    <Grid item xs={previewSurveyNo ? 8 : 12}>
                        <DialogTitle id="survey-connect-title" variant="h4">
                            {t('study.survey_connection')}
                            {/* Survey 연결 */}
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
                                {/* 1개 이상의 Survey를 연결해주세요. */}
                                <span>{t('study.connect_one_or_more')}</span>
                                {/* Survey가 여러개일 경우, 설정 순서에 따라 진행됩니다. */}
                                <span>{t('study.if_there_are_multiple_surveys')}</span>
                            </Typography>
                            <form onSubmit={handleSearchSurvey}>
                                <Box display="flex" mt="1rem" mb="1rem" gap={1}>
                                    <FormControl size="small" sx={{ width: '400px' }}>
                                        <OutlinedInput
                                            placeholder={t('study.survey_title')}
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
                                        {t('common.search')}
                                        {/* 검색 */}
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        sx={{ flexGrow: 1 }}
                                        onClick={handleSeeAll}
                                    >
                                        {t('study.view_all')}
                                        {/* 전체보기 */}
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
                                            addedSurveys={addedSurveys}
                                        />
                                    </Box>

                                    <Button
                                        onClick={handleConnectSurvey}
                                        variant="contained"
                                        sx={{ width: '10rem' }}
                                    >
                                        {t('study.connect')}
                                        {/* 연결하기 */}
                                    </Button>
                                </Box>
                            )}

                            <Box mt={1}>
								{
									searchedResult.length > 0 ?
									<SurveyListTable
										surveyList={searchedResult}
										selectedSurvey={selectedSurvey}
										handleSelected={(e) => handleSelectedSurvey(e)}
										handleSelectPreview={(surveyNo) =>
											handleSelectPreview(surveyNo)
										}
									/>
									:
									<Box p="1rem " textAlign="center">
										<Typography gutterBottom>
											{/* 연결 가능한 설문이 없습니다. */}
											{t('study.no_surveys_connect')}
										</Typography>
										<Link to="/survey/samples" target="_blank" rel="noopener noreferrer" onClick={() => handleClose()}>
											{/* 설문 생성하기 */}
											{t('study.create_a_survey')}
										</Link>
									</Box>
								}
                                
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
