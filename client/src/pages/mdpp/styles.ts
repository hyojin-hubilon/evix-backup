import { StudyParticipantStatus } from '@/types/participant';
import { Box, Typography, TextField as MuiTextField, styled } from '@mui/material';

export const Title = styled('h5')`
	font-size: 18px;
	font-weight: 600;
`

export const CommonText = styled('p')`
	font-weight: 400;
	font-size: 15px;
	line-height: 21px;
	letter-spacing: -0.3px;
	margin: 0
`


export const GreyBox = styled(Box)(() => ({
	backgroundColor: '#F0F2F4',
	boxShadow: 'none',
	padding:'16px',
	borderRadius: '12px',
	'h5' : {		
		fontWeight:'600',
		fontSize: '15px',
		lineHeight : '19px',
		letterSpacing: '-0.5px',
		marginBottom:'12px'
	}
}))



export const StudyStatus = styled(Box, {
	shouldForwardProp: (prop) => prop !== "studyStatus"
})<{ studyStatus:StudyParticipantStatus}>(({studyStatus, theme}) => ({
	fontSize: '12px',
	fontWeight: 500,
	lineHeight:'21px',
	letterSpacing: '-0.05em',
	minWidth: '82px',
	height: '21px',
	color: '#424242',
	textAlign:'center',	
  	backgroundColor: studyStatus == StudyParticipantStatus.IN_PROGRESS ? '#CFF1FF' : '#F6E676'
}));


export const StudyTitle = styled('h6')`
	margin:0;
	font-size:15px;
	line-height: 21px;
	font-weight: 700;
	max-width: 200px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
	color: #424242;
	height: 21px;
`

export const StudyDetail = styled('p')`
	font-size: 13px;
	font-weight: 500;
	line-height: 1;
	margin-top:0;
	margin-bottom:10px;
`

export const StudyTags = styled('span')`
	font-size: 12px;
	font-weight: 500;
	line-height: 12px;
	letter-spacing: -0.05em;
	text-align: center;
	padding: 4px;
	color: #4896E5;
	border-radius: 4px;
	display: block;
	background: #EFF3F6;

`