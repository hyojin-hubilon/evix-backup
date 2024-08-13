import { TextField as MuiTextField, styled } from "@mui/material";

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 10px;
`;

export const TextField = styled(MuiTextField)(({theme}) => ({
	display: 'flex',
	flexGrow: 1,
	marginLeft: '0.5rem',
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

export const Label = styled('label')`
	width: 100%;
	display:flex;
  	cursor: pointer;
	align-items: center;
`;


export const CheckboxContainer = styled('div')`
  display: flex;
  align-items:center;
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
			display: 'inline-block',
			width: '20px',
			height: '20px',
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
				left: '6px',
				top: '3px',
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


export const EtcContainer = styled('div')`
	width: 90%;
	display: flex;
	padding-left:12px;
	align-items: center
`