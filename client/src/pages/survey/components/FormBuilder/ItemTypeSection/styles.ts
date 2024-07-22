
import { Box, TextField as MuiTextField, styled, Theme } from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

export const Container = styled(Box)<{isFocused?: boolean}>(({isFocused, theme}) => ({
	position: 'relative',
	display: 'flex',
	width: '100%',
	alignItems: 'center',
	fontSize: '0.9rem',
	paddingLeft: '1rem',
	':hover': {
		'& .MuiInputBase-root': {
			'::before' : {
				borderBottom: "1px solid transparent !important"
			},
			':not(.Mui-disabled)' : {
				'borderBottom': isFocused ? `1px solid ${theme.palette.grey[700]}!important` : "1px solid transparent !important"
			},
			'.Mui-disabled' : {
				'borderBottom': isFocused ? `1px dotted ${theme.palette.grey[700]} !important` : "1px solid transparent !important"
			}
		}
	},
	'& .MuiInputBase-root' : {
		fontSize: '1rem',
		'::before' : {
			'borderBottom': "1px solid transparent !important"
		},
		'::after': {
			'borderBottom': `2px solid ${theme.palette.primary.main}`,
		}
	}
}))


export const ContentDndHandle = styled('div')<{ isFocused: boolean}>(({isFocused, theme}) => ({
	display: isFocused ? "flex" : "none",
	position: 'absolute',
	left: 0,
	minHeight: '60%',
	top: '10px',
	width: '10px',
	height: '60%',
	zIndex: 20,
	borderRadius: '4px',
	':hover': {
		backgroundColor: theme.palette.primary.light
	}
}));



export const TextField = styled(MuiTextField)<{isFocused: boolean}>(({isFocused}) => ({
	padding: '8px',
	height: '3rem',
	flexGrow: '1'
}))
 

export const DeleteIcon = styled(ClearIcon)(({theme}) => ({
	width: '30px',
	height: '30px',
	padding: '4px',
	cursor: 'pointer',
	':hover' : {
		borderRadius: '100%',
		backgroundColor: theme.palette.grey[200]
	}
}))
 

export const Sqare = styled(CropSquareIcon)(({theme}) => ({
	color: theme.palette.grey[500],
	width: '23px',
	height: '23px',
}))


export const Circle = styled(CircleOutlinedIcon)(({theme}) => ({
	color: theme.palette.grey[500],
	width: '23px',
	height: '23px',
}))

export const NumberSpan = styled('span')`
	width: 23px;
	height: 23px;
	text-align: center;
	box-sizing: border-box;
	padding-top: 5px;
`;

export const ItemAddButton = styled('button')(({theme}) => ({
	backgroundColor: 'transparent',
	border: 'none',
	cursor: 'pointer',
	padding: '8px 8px 0px 8px',
	height: '3rem',
	fontSize:'1rem',
	marginBottom: '12px',
	color: theme.palette.grey[900],
	position: 'relative',
	':hover' : {
		'::after': {
			display: 'block',
			content: '" "',
			width: '100%',
			position:'absolute',
			bottom:0,
			left: 0,
			borderBottom: `1px solid ${theme.palette.grey[700]}`
		}
		
	}
}))


export const EtcAddButton = styled('button')`
	border-radius: 4px;
	background-color: transparent;
	border: none;
	padding: 8px 8px;
	color: ${({ theme }) => theme.palette.primary.dark};
	:hover {
		background-color: ${({ theme }) => theme.palette.primary.lighter};
	}
`;

