import { TextField as MuiTextField, styled } from "@mui/material";

export const RadioContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 10px;
  align-item: center;
`;

export const Container = styled('div')`
  display:flex;
  align-item: center;
`;


export const Radio = styled('input')(({theme}) => ({
	cursor: 'pointer',
	appearance: 'none',
	marginLeft: 0,
	marginRight: 0,
	border: `2px solid ${theme.palette.grey[500]}`,
	borderRadius: '50%',
	width: '20px',
	height: '20px',
	boxSizing: 'border-box',
	':checked': {
	  	border:  `6px solid ${theme.palette.primary.main}`
	},
}))

export const Label = styled('label')`
  cursor: pointer;
  padding-left: 12px;
	width: 90%;
`;

export const TextField = styled(MuiTextField)(({theme}) => ({
	display: 'flex',
	flexGrow: 1,
	marginLeft: '0.5rem',
	'div' : {
	  fontSize: '14px',
	  '::before' : {
		borderBottom: `1px solid ${theme.palette.grey[500]} !important`
	  },
	  '::after' : {
		borderBottom: `2px solid ${theme.palette.primary.main}`
	  }
	}
}))
 
export const EtcContainer = styled('div')`
	display: flex;
	align-items: center
`