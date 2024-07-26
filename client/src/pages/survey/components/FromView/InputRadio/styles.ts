import { TextField as MuiTextField, styled } from "@mui/material";

export const RadioContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 4px;
`;

export const Radio = styled('input')(({theme}) => ({
	cursor: 'pointer',
	appearance: 'none',
	marginTop: '-3px',
	verticalAlign: 'middle',
	border: `2px solid ${theme.palette.grey[500]}`,
	borderRadius: '50%',
	width: '20px',
	height: '20px',
	':checked': {
	  	border:  `6px solid ${theme.palette.primary.main}`
	}
}))

export const Label = styled('label')`
  align-items: center;
  cursor: pointer;
  padding-left: 12px;
`;

export const TextField = styled(MuiTextField)(({theme}) => ({
	width: '200px',
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
 
