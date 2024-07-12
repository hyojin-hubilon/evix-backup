import { Avatar, Box, Button, Dialog, DialogContent, DialogTitle, Grid, IconButton, MenuItem, Select, Tab, Tabs, Typography, useTheme, FormControl, Autocomplete, TextField, Chip, List } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from "react";
import * as yup from 'yup';
import { ManagerType } from '../study-info/StudyMemberStatus';

import InviteConfirmDialog from './InviteConfirmDialog';
import MemberListItem from './MemberListItem';
import DeleteConfirmDialog from './DeleteConfirmDialog';


export type MemberTempType = { // ManagerType등 으로 변경예정
	profile_image_url: string, //프로필이미지
	first_name: string, //이름
	last_name: string,
	std_privilege: string, //권한
	belong: string, //소속
	email: string, //이메일
	inviteStatus: string //승인상태
}


const MemberMangement = ({isOpen, handleClose}) => {
	const [ activeTab, setActiveTab ] = useState('0')
	const [ newAuthority, setNewAuthority ] = useState<string>('')

	const [ emails, setEmails ] = useState<string[]>([])//초대받을 사람 input의 emails
	const [ emailInput, setEmailInput] = useState("")//메일주소입력 input의 value
	const [ sendingEmails, setSendingEmails ] = useState<string[]>([]);//실제로 초대 보내고 confirm창에서 확인하는 용도

	const [ openInviteConfirm, setOpenInviteConfirm ] = useState(false); //초대메일 발송 완료 Dialog
	const [ openDeleteConfirm, setOpenDeleteConfirm ] = useState(false);

	const [ deleteMember, setDeleteMember ] = useState<MemberTempType>()

	
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

	const handleSelectMails = (e, value) => {
		const errorEmail = value.find((email) => !emailSchema.isValidSync(email));//메일주소 Valid Check
		if (errorEmail) {
		  setEmailInput(errorEmail);
		}
		setEmails(value.filter((email) => emailSchema.isValidSync(email)));
	}

	const onInputChange = (e, newValue) => {
		setEmailInput(newValue);
	}

	const handleSendInvite = () => {
		setSendingEmails(emails);
		handleOpenSendInvite();	
	}

	const handleSendReInvite = (member:MemberTempType) => {
		setSendingEmails([member.email]);
		handleOpenSendInvite();	
	}

	const handleOpenSendInvite = () => {
		setOpenInviteConfirm(!openInviteConfirm);
	}

	const handleMemberDelete = (member:MemberTempType) => {
		setDeleteMember(member);
		handleOpenMemberDelete();
	}

	const handleOpenMemberDelete = () => {
		setOpenDeleteConfirm(!openDeleteConfirm)
	}

	return (
		<>
			<Dialog
				open={isOpen}
				onClose={handleClose}
				aria-labelledby="member-management-title"
				aria-describedby="member-management-description"
				maxWidth="sm"
			>
				<DialogTitle id="member-management-title" variant="h4" width={600}>
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
							<Typography id="member-management-description" variant="h5">
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

							<Button variant="contained" sx={{ml: "auto"}} onClick={handleSendInvite}>보내기</Button>
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
									return <MemberListItem member={member} key={index} sendMailConfirm={handleSendReInvite} sendDeleteConfirm={handleMemberDelete} />
								})
							}
							
						</List>
					</Box>


				</DialogContent>
				{/* <DialogActions>
					<Button onClick={handleClose}>닫기</Button>
				</DialogActions> */}
			</Dialog>

			<InviteConfirmDialog open={openInviteConfirm} handleClose={handleOpenSendInvite} emails={sendingEmails} />
			{
				deleteMember && <DeleteConfirmDialog open={openDeleteConfirm} handleClose={handleOpenMemberDelete} member={deleteMember} />
			}
			
		</>
	)
}

export default MemberMangement;