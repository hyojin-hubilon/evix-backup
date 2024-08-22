import { Box, TextField as MuiTextField, styled } from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';

export const Container = styled(Box, {
	shouldForwardProp: (prop) => prop !== "$isfocused"
})<{$isfocused?: boolean}>(({$isfocused, theme}) => ({
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
