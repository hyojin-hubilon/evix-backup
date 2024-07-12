import PersonIcon from '@mui/icons-material/Person';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { MemberTempType } from './MemberManagement';
import { ListItem, ListItemAvatar, Avatar, Box, ListItemText, Typography, FormControl, Select, MenuItem, Button } from '@mui/material';
import { useState } from 'react';

type MemberListItemProps = {
	member: MemberTempType,
	sendMailConfirm: (member: MemberTempType) => void,
	sendDeleteConfirm: (member: MemberTempType) => void
};

const MemberListItem = ({member, sendMailConfirm, sendDeleteConfirm}: MemberListItemProps) => {
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
					<Button size="small" color="primary" sx={{minWidth:"40px"}} variant="outlined" onClick={() => sendMailConfirm(member)}>
						<MailOutlineIcon  />
					</Button>
				}

				<Button size="small" color="error" sx={{minWidth:"40px"}} variant="outlined" onClick={() => sendDeleteConfirm(member)}>
					<DeleteOutlineIcon />
				</Button>
			</Box>


		</ListItem>
	)
}

export default MemberListItem;