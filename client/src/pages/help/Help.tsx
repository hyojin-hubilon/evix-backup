import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, Card, Container, Grid, InputAdornment, OutlinedInput, Tab, Tabs, Typography, useTheme } from '@mui/material';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router';

import './Help.scss';
import enHelps from './helpContentsEn.json';
import krHelps from './helpContentsKr.json';
import { useTranslation } from "react-i18next";
import { Helps } from "@/types/help";

const Help = () => {
	const [ searchTerm, setSearchTerm] = useState('');
	const [ activeTab, setActiveTab] = useState(0);
	const [ helps, setHelps ] = useState<Helps[]>([]);
	const { t, i18n } = useTranslation();

	const [expanded, setExpanded] = useState<string | false>('panel0');

	const navigate = useNavigate();
	const theme = useTheme();

	const handleMoveToSupport = () => {
		navigate('/user-support')
	}

	const handleChangeTab = (_event: React.SyntheticEvent, newValue: number) => {
		setExpanded(false);
		setActiveTab(newValue);	
	};

	const getHelps = () => {
		if(i18n.language == 'en') {
			setHelps(enHelps);
		} else {
			setHelps(krHelps);
		}
	}

	useEffect(() => {
		getHelps();
	}, [])

	const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      	setExpanded(isExpanded ? panel : false);
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
					<Grid item xs={10}>
						<OutlinedInput size="small" fullWidth sx={{bgcolor: 'white'}} 
							startAdornment={
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							}
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							placeholder={t('help.search_placeholder')} //도움말을 검색해보세요.
						/>
					</Grid>
					<Grid item xs={1.9}>
						<Button variant="contained" onClick={handleMoveToSupport} fullWidth>
							<LiveHelpIcon sx={{fontSize:'1rem', mr:'0.5rem'}}/>
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
						{
							helps?.map((help, index) => 
								<Tab label={help.tab} value={index} key={index} />
							)
						}
						
						{/* Evix-DCT 사용 */}
						<Tab label={t('help.using_evix-dct')} disabled />
						{/* 구매 */}
						<Tab label={t('help.purchasing')} disabled />
						{/* 환불 및 반품 */}
						<Tab label={t('help.refunds_returns')} disabled />
						{/* 계정 관리하기 */}
						<Tab label={t('help.managing_accounts')} disabled />
					</Tabs>
				
				</Grid>

					
				<Grid item xs={12}>
					{
						helps?.map((help, helpsIndex) => {
							return (
								<Box key={helpsIndex}>
								{
									helpsIndex === activeTab &&
									<Box>
										{
											help.helpList.map((helpList, helpListIndex) => 
												<Accordion key={helpListIndex} expanded={expanded === `panel${helpListIndex}`} onChange={handleChange(`panel${helpListIndex}`)}>
													<AccordionSummary
														expandIcon={<ExpandMoreIcon />}
														aria-controls={`panel${helpListIndex}`}
														id={`panel${helpListIndex}`}
														>
															{ helpList.helpTitle }
													</AccordionSummary>
													<AccordionDetails>
														<div className="help-box">
														{
																helpList.contents.map((content, helpContentsIndex) =>
																	<div key={helpContentsIndex}>
																		{
																			content.title && <h3>{ content.title }</h3>
																		}
																		{
																			content.description && <p>{content.description}</p>
																		}
																		{
																			content.subs && content.subs.map((sub, subsIndex) => 
																				<div key={subsIndex}>
																					{
																						sub.subTitle && <h4>{sub.subTitle}</h4>
																					}
																					{
																						sub.description && <p>{sub.description}</p>
																					}
																					{
																						(sub.exTitle || sub.exList) && 
																						<ul>
																							{
																								sub.exTitle && <li className="sub-title">{ sub.exTitle }</li>
																							}
																							{
																								sub.exList && sub.exList.map((ex, exIndex) => <li key={exIndex}>{ex}</li>)
																							}
																						</ul>
																					}
																				</div>
																			)
																		}
																		
																		
																	</div>
																)
															}
														</div>
														<Box border={`1px solid ${theme.palette.divider}`}
															sx={{
																borderRadius: '1rem',
																m: '1rem',
																p: '2rem',
																display: 'flex',
																alignItems:'center',
																flexDirection: 'column'
															}}
														>
															<Typography variant='h5'>{t('help.need_more_help')}</Typography>
															<Typography>{t('help.next_steps')}</Typography>


															<Button sx={{
																display: 'flex',
																flexDirection: 'row',
																alignItems: 'center', 
																gap: '1rem',
																mt: '2rem'
															}}
																color="primary"
																variant="contained"
																onClick={handleMoveToSupport}
															>
																<SupportAgentIcon />
																<Box sx={{
																	display: 'flex',
																	flexDirection: 'column',
																	alignItems: 'flex-start'
																}}>
																	<Typography variant='h5'>{t('help.contact_us')}</Typography>
																	<Typography>{t('help.tell_us_more')}</Typography>
																</Box>
															</Button>
														</Box>
													</AccordionDetails>
												</Accordion>
											)
										}
										
									</Box>
								}
								
								</Box>
							);
						})
					}
				</Grid>

			</Grid>


		</Container>
		
	);
}

export default Help