
import { Button, Card, Grid, Typography, useTheme } from "@mui/material";

const StudyInvitedItem = () => {
	const theme = useTheme();
	return (
		<Card sx={{bgcolor: theme.palette.primary.lighter, p: "1rem", height: "5rem"}}>
			<Grid container>
				<Grid item xs={8}>
					<Typography variant="h4">중증 아토피 피부염 임상연구 – 부작용</Typography>
					<Typography sx={{fontSize: "0.7rem", color: theme.palette.grey[500]}}>Study Owner: John Lee</Typography>
				</Grid>
				<Grid item container xs={4} alignItems="center" justifyContent="flex-end" gap={1}>
					<Button size="large" variant="contained">
						Join us now
					</Button>
				</Grid>
			</Grid>
		</Card>
	)
}

export default StudyInvitedItem;