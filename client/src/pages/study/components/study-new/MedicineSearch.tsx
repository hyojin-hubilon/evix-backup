import { Drug, fetchKoreanDrugs, fetchUSDrugs } from '@/apis/test/drug/drugsAPI_TEST';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    Grid,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    useTheme,
} from '@mui/material';
import { DataGrid, gridClasses, GridColDef } from '@mui/x-data-grid';
import { t } from 'i18next';
import { useState } from 'react';
type MedicineSearchProps = {
    isOpen: boolean;
    handleClose: () => void;
    selectMedicine: (drug: Drug) => void;
    country: string;
    onCountryChange: (country: string) => void;
};

const MedicineSearch = ({
    isOpen,
    handleClose,
    selectMedicine,
    country,
    onCountryChange,
}: MedicineSearchProps) => {
    const theme = useTheme();
    const { grey, primary } = theme.palette;

    const [searchTerm, setSearchTerm] = useState('');
    const [medicines, setMedcines] = useState<Drug[]>([]);
    const [selected, setSelected] = useState<Drug>();

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'No', width: 50 },
        {
            field: 'productName',
            headerName: t('study.product_name'),
            width: 400,
            renderCell: (params) => {
                const onClickName = (e) => {
                    e.stopPropagation();
                    setSelected(params.row);
                    selectMedicine(params.row);
                    handleClose();
                };

                return (
                    <span
                        style={{
                            textDecoration: 'underline',
                            color: primary.main,
                            fontWeight: 600,
                            cursor: 'pointer',
                        }}
                        onClick={onClickName}
                    >
                        {params.value}
                    </span>
                );
            },
        },
        { field: 'companyName', headerName: t('study.company_name'), width: 100 },
        { field: 'itemCode', headerName: t('study.item_standard_code'), width: 100 },
    ];

    const getKoreanDrugs = async () => {
        try {
            const response = await fetchKoreanDrugs(searchTerm);
            setMedcines(response);
        } catch (error) {
            console.error('Feiled to search', error);
            setMedcines([]);
        }
    };

    const getUSDrugs = async () => {
        try {
            const response = await fetchUSDrugs(searchTerm);
            setMedcines(response);
        } catch (error) {
            console.error('Feiled to search', error);
            setMedcines([]);
        }
    };

    const handleChangeCountry = (e: SelectChangeEvent) => {
        onCountryChange(e.target.value); // Call handler from props
        setMedcines([]);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm) return;
        else if (country == 'KO_KR') getKoreanDrugs();
        else getUSDrugs();
    };

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="medicine-search-title"
            aria-describedby="medicine-search-description"
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle id="medicine-search-title" variant="h5">
				{t('study.search_for_medicines')}
                {/* 의약품 검색 */}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="medicine-search-description" color={grey[600]} mb={1}>
					{t('study.after_searching_for')}
                    {/* 의약품 검색 후 제품명을 선택해주세요. */}
                </DialogContentText>
                <Box width={1}>
                    <Grid container columnGap={1}>
                        <Grid item xs={3.8}>
                            <FormControl size="small" fullWidth>
                                <Select value={country} onChange={handleChangeCountry}>
                                    <MenuItem value="KO_KR">
										{t('study.korea_drug_information')}
										{/* 한국 약품통합정보시스템 */}
									</MenuItem>
                                    <MenuItem value="EN_US">
										{t('study.us_fda')}
										{/* 미국 FDA Drug Search */}
									</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={8}>
                            <form onSubmit={handleSearch}>
                                <Box gap={1} display="flex">
                                    <FormControl size="small" fullWidth>
                                        <OutlinedInput
                                            placeholder={t('study.enter_search_term')} // 검색어 입력
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </FormControl>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSearch}
                                    >
                                        {t('common.search')}
										{/* 검색 */}
                                    </Button>
                                </Box>
                            </form>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ pt: '1rem' }}>
                    {
                        medicines.length > 0 ? (
                            <Box sx={{ height: 400 }}>
                                <DataGrid
                                    columns={columns}
                                    rows={medicines}
                                    disableColumnFilter
                                    disableColumnSelector
                                    disableDensitySelector
                                    sx={{
                                        border: '1px solid #ddd',
                                        [`& .${gridClasses.virtualScrollerContent}`]: {
                                            borderTop: `1px solid ${grey[500]}`,
                                        },
                                        [`& .${gridClasses.row}`]: {
                                            borderBottom: `1px solid ${grey[400]}`,
                                        },
                                    }}
                                />
                            </Box>
                        ) : (
                            <></>
                        )
                        // <Typography>검색 결과가 없습니다.</Typography>
                    }
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>{t('common.close')}</Button>
				{/* 닫기 */}
            </DialogActions>
        </Dialog>
    );
};

export default MedicineSearch;
