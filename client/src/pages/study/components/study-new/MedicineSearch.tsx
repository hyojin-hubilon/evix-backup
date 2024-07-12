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
    TableContainer,
    Typography,
    useTheme,
} from '@mui/material';
import { DataGrid, GridApi, gridClasses, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';

type MedicineSearchProps = {
    isOpen: boolean;
    handleClose: () => void;
    selectMedicine: (drug: Drug) => void;
};

const MedicineSearch = ({ isOpen, handleClose, selectMedicine }: MedicineSearchProps) => {
    const theme = useTheme();
    const { grey, primary } = theme.palette;

    const [country, setCountry] = useState('korea');
    const [searchTerm, setSearchTerm] = useState('');
    const [medicines, setMedcines] = useState<Drug[]>([]);
    const [selected, setSelected] = useState<Drug>();

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'No', width: 50 },
        {
            field: 'productName',
            headerName: '제품명',
            width: 400,
            renderCell: (params) => {
                const onClickName = (e) => {
                    e.stopPropagation(); // don't select this row after clicking
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
        { field: 'companyName', headerName: '업체명', width: 100 },
        { field: 'itemCode', headerName: '품목기준코드', width: 100 },
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
        setCountry(e.target.value);
        setMedcines([]);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm) return;
        else if (country == 'korea') getKoreanDrugs();
        else getUSDrugs();
    };

    // const handleSelectMedicine: GridEventListener<'rowClick'> = ( row 전체클릭으로 변경해야되면 이것을 사용...
    // 	params, // GridRowParams
    // 	event, // MuiEvent<React.MouseEvent<HTMLElement>>
    // 	details, // GridCallbackDetails
    //   ) => {
    // 	setMessage(`Movie "${params.row.title}" clicked`);
    //   };

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
                의약품 검색
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="medicine-search-description" color={grey[600]} mb={1}>
                    의약품 검색 후 제품명을 선택해주세요.
                </DialogContentText>
                <Box width={1}>
                    <Grid container columnGap={1}>
                        <Grid item xs={3.8}>
                            <FormControl size="small" fullWidth>
                                <Select value={country} onChange={(e) => handleChangeCountry(e)}>
                                    <MenuItem value="korea">한국 약품통합정보시스템</MenuItem>
                                    <MenuItem value="us">미국 FDA Drug Search</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={8}>
                            <form onSubmit={(e) => handleSearch(e)}>
                                <Box gap={1} display="flex">
                                    <FormControl size="small" fullWidth>
                                        <OutlinedInput
                                            placeholder="검색어 입력"
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </FormControl>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSearch}
                                    >
                                        검색
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
                                    // onRowDoubleClick={handleSelectMedicine}
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
                <Button onClick={handleClose}>닫기</Button>
            </DialogActions>
        </Dialog>
    );
};

export default MedicineSearch;
