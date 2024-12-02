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
import { FormEvent, useEffect, useState } from 'react';
import { RegistrableSurvey } from '@/types/survey';
import DraggableList from './DraggableList';
import { DropResult } from '@hello-pangea/dnd';
import { reorder } from '@/utils/helper';
import SurveyConnectPreview from './SurveyConnectPreview';

import studyApi from '@/apis/study';
import SurveyDeleteDialog from './SurveyDeleteDialog';
import { t } from 'i18next';

import { Link, useNavigate } from 'react-router-dom';
import ecrfApi from '@/apis/ecrf';
import { MyCRFList, StudyCrfListRespone } from '@/types/ecrf';
import CrfDraggableList from './CrfDraggableList';
import ECrfListTable, { CrfAdd } from './ECrfListTable';
import { StudyCrfSet } from '@/types/study';

interface ECrfConnectDialogProps {
    isOpen: boolean;
    handleClose: () => void;
    setStudyCrfSetList: (list: StudyCrfSet[]) => void;
    initialCrfSetList: StudyCrfListRespone[] | null;
    mode: 'create' | 'edit';
    studyNo?: number;
}


const ECrfConnectDialog = ({
    isOpen,
    handleClose,
    setStudyCrfSetList,
    initialCrfSetList,
    mode,
    studyNo
}: ECrfConnectDialogProps) => {
    const theme = useTheme();
    const { grey } = theme.palette;
    const [searchText, setSearchText] = useState('');
    const [previewSurveyNo, setPreviewSurveyNo] = useState<number>();
    const [crfList, setCrfList] = useState<MyCRFList[]>([]);
    const [searchedResult, setSearchedResult] = useState<MyCRFList[]>([]);
    const [selectedCrf, setSelectedCrf] = useState<MyCRFList[]>([]);

    const [successMessage, setSuccessMessage] = useState('');
    const [openAlert, setOpenAlert] = useState<boolean>(false);

    // const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [crfToDelete, setCrfToDelete] = useState<MyCRFList | null>(null);

    // console.log('initialSurveySetList: ', initialSurveySetList);

    // 등록 가능한 CRF 목록 api 분리
    const fetchECrf = async () => {
        try {
			const response = await ecrfApi.getCRFList();
			const crfList = response.content || [];
			setCrfList(crfList);
			setSearchedResult(crfList);
        } catch (error) {
            console.error('Failed to fetch surveys:', error);
        }
    };

    const handleDeleteClick = (crf: MyCRFList) => {
        if (mode === 'edit') {
            // setSurveyToDelete(crf);
            // setShowDeleteConfirm(true);
        } else {
            // mode가 'create'인 경우 바로 삭제
			console.log(selectedCrf)
            const newSelectedCrf = selectedCrf.filter(
                (s) => crf.crf_no !== s.crf_no
            );
            setSelectedCrf(newSelectedCrf);
        }
    };

    // const handleDeleteConfirm = async () => {
    //     if (crfToDelete) {
    //         try {
    //             await studyApi.deleteCrfpair({
    //                 std_no: studyNo,
    //                 //pair_no: crfToDelete.pair_no, //?
    //             });
    //             const newSelectedCrf = selectedCrf.filter(
    //                 (s) => s.crf_no !== crfToDelete.crf_no
    //             );
    //             setSelectedCrf(newSelectedCrf);
    //             setSuccessMessage(t('study.crf_successfully_deleted')); //ECRF가 성공적으로 삭제되었습니다.
    //             setOpenAlert(true);
    //         } catch (error) {
    //             console.error('Failed to disconnect survey:', error);
    //             setSuccessMessage(t('study.failed_delete_survey')); //설문 삭제에 실패했습니다.
    //             setOpenAlert(true);
    //         }
    //     }
    //     setShowDeleteConfirm(false);
    //     setCrfToDelete(null);
    // };

    // const handleDeleteCancel = () => {
    //     setShowDeleteConfirm(false);
    //     setCrfToDelete(null);
    // };

    useEffect(() => {
		if(isOpen) {
			fetchECrf();
			setSearchText('');
		}
    }, [isOpen]);

	useEffect(() => {
        if (initialCrfSetList) {
            const selectedCrfs = crfList.filter((crf) => {
				const findedCrf = initialCrfSetList.findIndex(set => set.crf_no === crf.crf_no);
				if(findedCrf > -1) return true;
			}).map((crf) => {
				const findedCrf = initialCrfSetList.findIndex(set => set.crf_no === crf.crf_no);
				return {...crf, sort : initialCrfSetList[findedCrf].sort};
			});

			selectedCrfs.sort((a, b) => a.sort - b.sort );			
            setSelectedCrf(selectedCrfs);
        }

	}, [initialCrfSetList, crfList])

	

    //CRF가 새로 추가되었는지 여부 판별하기 위함
    const [addedCrf, setAddedCrf] = useState(new Set<number>());

    const handleSelectedCrf = (addCrf: CrfAdd) => {
		console.log(addCrf);
        if (addCrf.type === 'add') {
            const newCrfItem = { ...addCrf.crf };
            setSelectedCrf([...selectedCrf, newCrfItem]);
            setAddedCrf(new Set(addedCrf).add(newCrfItem.crf_no));
        } else {
            const newItems = selectedCrf
                .filter((crf) => crf.crf_no !== addCrf.crf.crf_no)
                .map((crf, index) => ({ ...crf, sort: index + 1 }));
            setSelectedCrf(newItems);
            setAddedCrf(
                new Set([...addedCrf].filter((no) => no !== addCrf.crf.crf_no))
            );
        }
    };

    const onDragEnd = ({ destination, source }: DropResult) => {
        // dropped outside the list
        if (!destination || !selectedCrf) return;

        const newItems = reorder(selectedCrf, source.index, destination.index);

        setSelectedCrf(newItems);
    };


    const handleConnectCrf = () => {
		console.log(selectedCrf);

			if(mode=== 'create') {

			
			//새로 추가할때
			const newStudyCefSetList: StudyCrfSet[] = selectedCrf.map((crf, index) => { 
				return {
					crf_no: crf.crf_no,
					sort: index
				}
			});

			

			setStudyCrfSetList(newStudyCefSetList);
		

			} else {
				const newStudyCefSetList: StudyCrfSet[] = selectedCrf.map((crf, index) => { 
					return {
						crf_no: crf.crf_no,
						sort: index,
						std_no: studyNo
					}
				});
	
				console.log(newStudyCefSetList);
	
				setStudyCrfSetList(newStudyCefSetList);
			}
			
		

		

        handleClose();
    };

    const handleSearchCrf = (e:FormEvent) => {
        e.preventDefault();
        const searched = crfList.filter((crf) =>
            crf.crf_title.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResult(searched);
    };

    const handleSeeAll = () => {
        setSearchText('');
        setSearchedResult(crfList);
    };

    // const handleSelectPreview = (surveyNo) => {
    //     console.log(surveyNo);
    //     setPreviewSurveyNo(surveyNo);
    // };

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="crf-connect-title"
                aria-describedby="crf-connect-description"
                maxWidth="lg"
                scroll="body"
            >
                <Grid container width={previewSurveyNo ? 1100 : 730}>
                    <Grid item xs={previewSurveyNo ? 8 : 12}>
                        <DialogTitle id="crf-connect-title" variant="h4">
                            {t('study.crf_connection')}
                            {/* eCRF Sheet 연결 */}
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
                                id="crf-connect-description"
                                sx={{
                                    'span': {
                                        display: 'block',
                                    },
                                }}
                            >
                                {/* 1개 이상의 eCRF Sheet를 연결해주세요. */}
                                <span>{t('study.connect_one_or_more_crf')}</span>
                                {/* eCRF Sheet가 여러개일 경우, 설정 순서에 따라 진행됩니다. */}
                                <span>{t('study.if_there_are_multiple_crfs')}</span>
                            </Typography>
                            <form onSubmit={handleSearchCrf}>
                                <Box display="flex" mt="1rem" mb="1rem" gap={1}>
                                    <FormControl size="small" sx={{ width: '400px' }}>
                                        <OutlinedInput
                                            placeholder={t('study.crf_title')}
                                            value={searchText}
                                            onChange={(e) => setSearchText(e.target.value)}
                                        />
                                    </FormControl>
                                    <Button
                                        variant="contained"
                                        sx={{ flexGrow: 1 }}
                                        type="submit"
                                        onClick={handleSearchCrf}
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

                            {selectedCrf.length > 0 && (
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
                                        <CrfDraggableList
                                            items={selectedCrf}
                                            onDragEnd={onDragEnd}
                                            onDeleteClick={handleDeleteClick}
                                            // mode={mode}
                                            // addedCrf={addedCrf}
                                        />
                                    </Box>

                                    <Button
                                        onClick={handleConnectCrf}
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
									<ECrfListTable
										crfList={searchedResult}
										selectedCrf={selectedCrf}
										handleSelected={(e) => handleSelectedCrf(e)}
										// handleSelectPreview={(surveyNo) =>
										// 	handleSelectPreview(surveyNo)
										// }
									/>
									:
									<Box p="1rem " textAlign="center">
										<Typography gutterBottom>
											{/* 연결 가능한 ECRF Sheet가 없습니다. */}
											{t('study.no_crf_connect')}
										</Typography>
										<Link to="/survey/samples" target="_blank" rel="noopener noreferrer" onClick={() => handleClose()}>
											{/* ECRF Sheet 생성하기 */}
											{t('study.create_a_crf')}
										</Link>
									</Box>
								}
                                
                            </Box>
                        </DialogContent>
                    </Grid>
                    {/* <Grid item xs={previewSurveyNo ? 4 : 0}>
                        {previewSurveyNo && <SurveyConnectPreview surveyNo={previewSurveyNo} />}
                    </Grid> */}
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

            {/* <SurveyDeleteDialog
                isOpen={showDeleteConfirm}
                handleClose={handleDeleteCancel}
                handleConfirm={handleDeleteConfirm}
            /> */}
        </>
    );
};

export default ECrfConnectDialog;
