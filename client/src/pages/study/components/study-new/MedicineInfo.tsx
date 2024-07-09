import { Button, FormControl, Grid, OutlinedInput, Typography, useTheme } from "@mui/material"

const MedicineInfo = () => {
	const theme = useTheme();
	const { divider } = theme.palette;
	return (
	<>
		<Grid item xs={3}></Grid>
		<Grid container item xs={9} rowGap={2} alignItems="center" sx={{backgroundColor: divider}} p="1rem" borderRadius="1rem">
			<Grid item xs={3}>
				<Typography>검색</Typography>
			</Grid>
			<Grid item xs={9}>		
				<Button variant="contained">의약품 검색</Button>
			</Grid>

			<Grid item xs={3}>
				<Typography>제품명</Typography>
			</Grid>
			<Grid item xs={9}>		
				<FormControl size="small" fullWidth>
					<OutlinedInput placeholder="제품명" sx={{backgroundColor: "white"}} />
				</FormControl>
			</Grid>


			<Grid item xs={3}>
				<Typography>업체명</Typography>
			</Grid>
			<Grid item xs={9}>		
				<FormControl size="small" fullWidth>
					<OutlinedInput placeholder="업체명" sx={{backgroundColor: "white"}} />
				</FormControl>
			</Grid>


			<Grid item xs={3}>
				<Typography>품목기준코드</Typography>
			</Grid>
			<Grid item xs={3}>		
				<FormControl size="small" fullWidth>
					<OutlinedInput placeholder="품목기준코드" sx={{backgroundColor: "white"}} />
				</FormControl>
			</Grid>


			<Grid item xs={3}>
				<Typography ml={1}>품목구분</Typography>
			</Grid>
			<Grid item xs={3}>		
				<FormControl size="small" fullWidth>
					<OutlinedInput placeholder="품목구분" sx={{backgroundColor: "white"}} />
				</FormControl>
			</Grid>

			<Grid item xs={3}>
				<Typography>허가번호</Typography>
			</Grid>
			<Grid item xs={3}>		
				<FormControl size="small" fullWidth>
					<OutlinedInput placeholder="허가번호" sx={{backgroundColor: "white"}} />
				</FormControl>
			</Grid>
		
			<Grid item xs={3}>
				<Typography ml={1}>허가일</Typography>
			</Grid>
			<Grid item xs={3}>		
				<FormControl size="small" fullWidth>
					<OutlinedInput placeholder="허가일" sx={{backgroundColor: "white"}} />
				</FormControl>
			</Grid>
		</Grid>
	</>
	)
}

export default MedicineInfo;