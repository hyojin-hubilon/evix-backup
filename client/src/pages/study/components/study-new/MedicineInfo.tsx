import { Button, FormControl, Grid, OutlinedInput, Typography, useTheme } from '@mui/material';
import MedicineSearch from './MedicineSearch';
import { useState } from 'react';
import { Drug } from '@/apis/test/drug/drugsAPI_TEST';

const MedicineInfo = ({}) => {
    const theme = useTheme();
    const { divider } = theme.palette;
    const [openSearch, setOpenSearch] = useState<boolean>(false);
    const [drug, setDrug] = useState<Drug>();

    const setSelectedDrug = (e) => {
        console.log(e);
        setDrug(e);
    };

    const handleSearchClose = () => {
        setOpenSearch(!openSearch);
    };

    return (
        <>
            <Grid item xs={3}></Grid>
            <Grid
                container
                item
                xs={9}
                rowGap={2}
                alignItems="center"
                sx={{ backgroundColor: divider }}
                p="1rem"
                borderRadius="1rem"
            >
                <Grid item xs={3}>
                    <Typography>검색</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Button variant="contained" onClick={() => setOpenSearch(true)}>
                        의약품 검색
                    </Button>
                </Grid>

                <Grid item xs={3}>
                    <Typography>제품명</Typography>
                </Grid>
                <Grid item xs={9}>
                    <FormControl size="small" fullWidth>
                        <OutlinedInput
                            placeholder="제품명"
                            sx={{ backgroundColor: 'white' }}
                            value={drug?.productName}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <Typography>업체명</Typography>
                </Grid>
                <Grid item xs={9}>
                    <FormControl size="small" fullWidth>
                        <OutlinedInput
                            placeholder="업체명"
                            sx={{ backgroundColor: 'white' }}
                            value={drug?.companyName}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <Typography>품목기준코드</Typography>
                </Grid>
                <Grid item xs={3}>
                    <FormControl size="small" fullWidth>
                        <OutlinedInput
                            placeholder="품목기준코드"
                            sx={{ backgroundColor: 'white' }}
                            value={drug?.itemCode}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <Typography ml={1}>품목구분</Typography>
                </Grid>
                <Grid item xs={3}>
                    <FormControl size="small" fullWidth>
                        <OutlinedInput
                            placeholder="품목구분"
                            sx={{ backgroundColor: 'white' }}
                            value={drug?.itemType}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <Typography>허가번호</Typography>
                </Grid>
                <Grid item xs={3}>
                    <FormControl size="small" fullWidth>
                        <OutlinedInput
                            placeholder="허가번호"
                            sx={{ backgroundColor: 'white' }}
                            value={drug?.approvalNumber}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <Typography ml={1}>허가일</Typography>
                </Grid>
                <Grid item xs={3}>
                    <FormControl size="small" fullWidth>
                        <OutlinedInput
                            placeholder="허가일"
                            sx={{ backgroundColor: 'white' }}
                            value={drug?.approvalDate}
                        />
                    </FormControl>
                </Grid>
            </Grid>

            <MedicineSearch
                isOpen={openSearch}
                handleClose={handleSearchClose}
                selectMedicine={(e) => setSelectedDrug(e)}
            />
        </>
    );
};

export default MedicineInfo;
