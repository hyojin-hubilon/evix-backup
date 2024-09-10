import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Button, Container, Grid, InputAdornment, OutlinedInput, Tab, Tabs, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router';
import { t } from "i18next";


const Help = () => {
	const [ searchTerm, setSearchTerm] = useState('');
	const [ activeTab, setActiveTab] = useState('0');

	const navigate = useNavigate();

	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
	}

	const handleMoveToSupport = () => {
		navigate('/user-support')
	}

	const handleChangeTab = (_event: React.SyntheticEvent, newValue: string) => {
		setActiveTab(newValue);	
	};

	return (
		<Container maxWidth="lg">
			<Grid container flexDirection="row" rowSpacing={2}>
				<Grid item xs={12}>
					<Typography variant="h3">Help</Typography>
				</Grid>
				<Grid
					container
					item
					xs={12}
					sx={{ borderBottom: 1, borderColor: 'divider' }}
					alignItems="center"
					justifyContent="space-between"
					pb={1}
					mt={1}
					
				>
					<Grid item xs={8}>
						<OutlinedInput size="small" fullWidth sx={{bgcolor: 'white'}} 
							startAdornment={
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							}
							value={searchTerm}
							onChange={(e) => handleSearch(e.target.value)}
							placeholder={t('help.search_placeholder')} //도움말을 검색해보세요.
						/>
					</Grid>
					<Grid item xs={2}>
						<Button variant="contained" onClick={handleMoveToSupport} fullWidth>
							<LiveHelpIcon sx={{mr:'0.5rem'}}/>
							<Typography>
								{t('help.contact_us')}
								{/* 문의하기 */}
							</Typography>
						</Button>
					</Grid>							
				</Grid>
				
				<Grid item xs={12}>
					<Tabs
						value={activeTab}
						onChange={handleChangeTab}
						aria-label="help-select-tab"
					>
						{/* 자주찾는 도움말 */}
						<Tab label={t('help.faq')} value="0" />
						{/* 서비스 소개 */}
						<Tab label={t('help.service_introduction')} value="1" />
						<Tab label="Study" value="2" />
						{/* 멤버관리 */}
						<Tab label={t('help.member_management')} value="3" />
						<Tab label="Survey" value="4" />
						<Tab label="Billing" value="5" />
						<Tab label="Report" value="6" />
						<Tab label="Settings" value="7" />
					</Tabs>
				
				</Grid>


				<Grid item xs={12}>
					<Accordion>
						<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1-content"
						id="panel1-header"
						>
						Accordion 1
						</AccordionSummary>
						<AccordionDetails>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
						malesuada lacus ex, sit amet blandit leo lobortis eget.
						</AccordionDetails>
					</Accordion>
					<Accordion>
						<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel2-content"
						id="panel2-header"
						>
						Accordion 2
						</AccordionSummary>
						<AccordionDetails>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
						malesuada lacus ex, sit amet blandit leo lobortis eget.
						</AccordionDetails>
					</Accordion>
					<Accordion defaultExpanded>
						<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel3-content"
						id="panel3-header"
						>
						Accordion 3
						</AccordionSummary>
						<AccordionDetails>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
						malesuada lacus ex, sit amet blandit leo lobortis eget.
						</AccordionDetails>
					</Accordion>
				</Grid>

			</Grid>


		</Container>
		
	);
}

export default Help