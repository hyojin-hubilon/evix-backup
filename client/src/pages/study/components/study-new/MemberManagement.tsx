import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, MenuItem, Select, Tab, Tabs, Typography, useTheme, FormControl, Autocomplete, TextField, Chip, ListItem, ListItemAvatar, List, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import * as yup from 'yup';
import { ManagerType } from '../study-info/StudyMemberStatus';
import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';



type MemberTempType = { // ManagerType등 으로 변경예정
	profile_image_url: string, //프로필이미지
	first_name: string, //이름
	last_name: string,
	std_privilege: string, //권한
	belong: string, //소속
	email: string, //이메일
	inviteStatus: string //승인상태
}

type MemberListItemProps = {
	member: MemberTempType,
	key: number
};

const MemberListItem = ({member, key}: MemberListItemProps) => {
	const [ memberAuth, setMemberAuth ] = useState(member.std_privilege.toLowerCase())
	return (
		<ListItem divider>
			<ListItemAvatar>
				{
					member.first_name || member.last_name ?
					<Avatar alt={`${member.first_name} ${member.last_name}`} src={member.profile_image_url} />
					:
					<Avatar>
						<PersonIcon />
			  		</Avatar>
				}
			</ListItemAvatar>
			<Box width="300px">
			{	
				member.first_name || member.last_name ? 
				<ListItemText 
					
					primary={<Typography variant="h6" color="primary" fontWeight={500}>{`${member.first_name} ${member.last_name}`}</Typography>}
					secondary={member.belong}
				/>
				:
				<ListItemText>{ member.email }</ListItemText>
			}
			</Box>

			<Box display="flex" width="300px" gap={0.5} justifyContent="flex-end">
				<FormControl size='small' sx={{width: member.inviteStatus !== 'Approved' ? '100px' : '148px'}}>
					<Select 
						value={memberAuth}
						onChange={(e) => setMemberAuth(e.target.value)}
						sx={{width: 1, backgroundColor: 'white'}}
						displayEmpty
						disabled={member.inviteStatus !== 'Approved' ? true : false}
						>
						<MenuItem value="">권한</MenuItem>
						<MenuItem value="maintainer">Maintainer</MenuItem>
						<MenuItem value="developer">Developer</MenuItem>
					</Select>
				</FormControl>

				{
					(!member.first_name && !member.last_name) && 
					<Button size="small" color="primary" sx={{minWidth:"40px"}} variant="outlined">
						<MailOutlineIcon  />
					</Button>
				}

				<Button size="small" color="error" sx={{minWidth:"40px"}} variant="outlined">
					<DeleteOutlineIcon />
				</Button>
			</Box>


		</ListItem>
	)
}


const MemberMangement = ({isOpen, handleClose}) => {
	const [ activeTab, setActiveTab ] = useState('0')
	const [ newAuthority, setNewAuthority ] = useState<string>('')
	const [ emails, setEmails ] = useState([])
	const [ emailInput, setEmailInput] = useState("")
	const emailSchema = yup.string().email();
	
	const theme = useTheme();
	const { primary, grey } = theme.palette;


	const handleChangeTab = (e, newValue) => {
		setActiveTab(newValue)
	}

	const createData = (
        profile_image_url: string, //프로필이미지
        first_name: string, //이름
		last_name: string,
        std_privilege: string, //권한
        belong: string, //소속
        email: string, //이메일
        inviteStatus: string //승인상태
    ) => {
        return { profile_image_url, first_name, last_name, std_privilege, belong, email, inviteStatus };
    };

	const membersTempData : MemberTempType[] = [
		createData('', '', '', '', '', "test@test.com", ''),
		createData('test', 'Linda', 'Lim', 'Maintainer', '아주대학교 병원', "linda@test.com", 'Approved'),
		createData('test', 'Ben', 'Park', 'Developer', '서울대학교 병원', "ben@test.com", 'Approved'),
		createData('', '', '', '', '', "greenapple@test.com", ''),
		createData('test', 'Jason', ' Kwak', 'Maintainer', '순천향대학교 중앙의료원', "greenapple@test.com", 'Approved'),
		createData('', '', '', '', '', 'chloe_happy@test.com', ''),
	]

	const handleSelectMails = (e, value) => {//메일주소 Valid Check
		const errorEmail = value.find((email) => !emailSchema.isValidSync(email));
		if (errorEmail) {
		  setEmailInput(errorEmail);
		}
		setEmails(value.filter((email) => emailSchema.isValidSync(email)));
	}

	const onInputChange = (e, newValue) => {
		setEmailInput(newValue);
	}

	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			aria-labelledby="medicine-search-title"
			aria-describedby="medicine-search-description"
			maxWidth="sm"
		>
			<DialogTitle id="medicine-search-title" variant="h4" width={600}>
				멤버관리 <span style={{color: primary.main}}>(8)</span>
				<IconButton 
					size="small"
					sx={{position: 'absolute', top: "10px", right: '10px'}}
					onClick={handleClose}
					>
					<CloseIcon />
				</IconButton>
			</DialogTitle>
			<DialogContent>
				<Grid container mb={1}>
					<Grid item container xs={8} alignItems="center">
						<Typography id="medicine-search-description" variant="h5">
							중증 아토피 피부염 임상연구 – 부작용 
						</Typography>
					</Grid>
					<Grid item xs={4}>
						<Box display="flex" gap={1} justifyContent="flex-end">
							<Avatar
								alt="Ben Kim"
								src=""
							/>
							<Box>
								<Typography variant="caption" sx={{ mb: '0' }}>
									Owner
								</Typography>
								<Typography color="primary">
									Ben Kim
								</Typography>
							</Box>
						</Box>
					</Grid>
				</Grid>
				<Box sx={{borderRadius: "0.5rem", backgroundColor: grey[100]}} display="flex" flexDirection="column" gap={1} p="1rem">
					<Typography variant="h6" fontWeight="600">초대받을 사람</Typography>
					<Autocomplete 
						multiple
						freeSolo
						options={[]}
						value={emails}
						inputValue={emailInput}
						onChange={handleSelectMails}
						onInputChange={onInputChange}
						sx={{backgroundColor: 'white', width: 1}}
						renderTags={(value, getTagProps) =>
							value.map((option, index) => (
							<Chip
								label={option}
								{...getTagProps({ index })}
							/>
							))
						}
						renderInput={(params) => (
							<TextField {...params} placeholder="메일 주소 입력" />
						)}
						/>
					<Box display="flex">
						<FormControl size="small" sx={{width: '8rem'}}>
							<Select 
								value={newAuthority}
								onChange={(e) => setNewAuthority(e.target.value)}
								sx={{width: 1, backgroundColor: 'white'}}
								displayEmpty
								>
								<MenuItem value="">권한</MenuItem>
								<MenuItem value="maintainer">Maintainer</MenuItem>
								<MenuItem value="developer">Developer</MenuItem>
							</Select>
						</FormControl>

						<Button variant="contained" sx={{ml: "auto"}}>보내기</Button>
					</Box>
				</Box>
				<Box mt={1}>
					<Tabs
						value={activeTab}
						onChange={handleChangeTab}
						aria-label="Study Status Tab"
					>
						<Tab label="전체" value="0" />
						<Tab label="Maintainer" value="1" />
						<Tab label="Developer" value="2" />
						<Tab label="대기" value="3" />
					</Tabs>

					<List>
						{
							membersTempData.map((member, index) => {
								return <MemberListItem member={member} key={index} />
							})
						}
						
					</List>
				</Box>


			</DialogContent>
			{/* <DialogActions>
				<Button onClick={handleClose}>닫기</Button>
			</DialogActions> */}
		</Dialog>
	)
}

export default MemberMangement;