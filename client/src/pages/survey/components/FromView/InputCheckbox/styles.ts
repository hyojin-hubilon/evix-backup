import { TextField as MuiTextField, styled } from "@mui/material";

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const TextField = styled(MuiTextField)(({theme}) => ({
	width: '200px',

  	'div' : {
    fontSize: '14px',

    '::before': {
      'borderBottom': `1px solid ${theme.palette.grey[700]} !important`,
    },

    '::after' : {
      'borderBottom':`2px solid ${theme.palette.primary.main}`
    }
  }
}))

export const CheckboxContainer = styled('div')`
  align-items: center;
`;

export const Checkbox = styled('input')(({theme}) => ({
	display: 'none',

  '+ label' : {
		cursor: 'pointer',
		position: 'relative',
		'> span' : {
			paddingLeft: '12px'
		},

		'::before' : {
			content: '""',
			marginTop:'2px',
			display: 'inline-block',
			width: '17px',
			height: '17px',
			border: `2px solid ${theme.palette.grey[500]}`,
			borderRadius: '4px',
			verticalAlign: 'top'
		}
	},

  	':checked' : {
    	'+ label' : {
			'::before' : {
				content: '""',
				backgroundColor: theme.palette.primary.main,
				borderColor: theme.palette.primary.main,		  
			},

			'::after' : {
				content: '""',
				display:'block',
				position:'absolute',
				left: '5px',
				top: '2px',
				width:'7px',
				height: '10px',
				border: 'solid white',
				borderWidth: '0 2px 2px 0',
				webkitTransform: 'rotate(45deg)',
				transform: 'rotate(45deg)'
			}
    	}
  }
}))