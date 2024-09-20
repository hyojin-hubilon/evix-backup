import { Box, Card, styled } from "@mui/material";
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';


export const Container = styled('div')`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 16px;
`;

export const SCard = styled(Card)(({theme}) => ({
	display: 'flex',
  	flexDirection: 'column',
  	// border: needToCompleteRequired ? `1px solid ${theme.palette.error.main}` : 0,
  	borderRadius: '8px',
  	backgroundColor: 'white',
  	minHeight: '131px',
	width: '100%',
  	padding: '1.7rem',
	boxSizing: 'border-box',
}));


export const RequireMark = styled('span')(({theme}) => ({
	paddingLeft: '4px',
  	fontSize: '16px',
  	color: theme.palette.error.main
}))


export const SelectContainer = styled(Box, {
	shouldForwardProp: (prop) => prop !== "$isfocused"
})<{$isfocused?: boolean}>(({$isfocused, theme}) => ({
	position: 'relative',
	display: 'flex',
	width: '100%',
	alignItems: 'center',
	fontSize: '0.9rem',
	
	':hover': {
		'& .MuiInputBase-root': {
			'::before' : {
				borderBottom: "1px solid transparent !important"
			},
			':not(.Mui-disabled)' : {
				'borderBottom': $isfocused ? `1px solid ${theme.palette.grey[700]}!important` : "1px solid transparent !important"
			},
			'.Mui-disabled' : {
				'borderBottom': $isfocused ? `1px dotted ${theme.palette.grey[700]} !important` : "1px solid transparent !important"
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