import { Button, FormControl, Grid, OutlinedInput, Typography, useTheme } from '@mui/material';
import MedicineSearch from './MedicineSearch';
import { useState } from 'react';
import { t } from 'i18next';

const MedicineInfo = ({ country, setCountry, drug, setDrug }) => {
    const theme = useTheme();
    const { divider } = theme.palette;
    const [openSearch, setOpenSearch] = useState<boolean>(false);

    const setSelectedDrug = (e) => {
        console.log(e);
        setDrug(e);
    };

    const handleSearchClose = () => {
        setOpenSearch(!openSearch);
    };

    const handleCountryChange = (newCountry: string) => {
        setCountry(newCountry);
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
                    <Typography>
						{t('common.search')}
						{/* 검색 */}
					</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Button variant="contained" onClick={() => setOpenSearch(true)}>
						{t('study.search_for_medicines')}
                        {/* 의약품 검색 */}
                    </Button>
                </Grid>

                <Grid item xs={3}>
                    <Typography>
						{t('study.product_name')}
						{/* 제품명 */}
					</Typography>
                </Grid>
                <Grid item xs={9}>
                    <FormControl size="small" fullWidth>
                        <OutlinedInput
                            placeholder={t('study.product_name')}
                            sx={{ backgroundColor: 'white' }}
                            value={drug?.productName}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <Typography>
						{t('study.company_name')}
						{/* 업체명 */}
					</Typography>
                </Grid>
                <Grid item xs={9}>
                    <FormControl size="small" fullWidth>
                        <OutlinedInput
                            placeholder={t('study.company_name')}
                            sx={{ backgroundColor: 'white' }}
                            value={drug?.companyName}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <Typography>
						{t('study.item_standard_code')}
						{/* 품목기준코드 */}
					</Typography>
                </Grid>
                <Grid item xs={3}>
                    <FormControl size="small" fullWidth>
                        <OutlinedInput
                            placeholder={t('study.item_standard_code')}
                            sx={{ backgroundColor: 'white' }}
                            value={drug?.itemCode}
                        />
                    </FormControl>
                </Grid>

                {/* <Grid item xs={3}>
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
                </Grid> */}
            </Grid>

            <MedicineSearch
                isOpen={openSearch}
                handleClose={handleSearchClose}
                selectMedicine={(e) => setSelectedDrug(e)}
                country={country}
                onCountryChange={handleCountryChange}
            />
        </>
    );
};

export default MedicineInfo;
