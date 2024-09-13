import { Card, styled } from "@mui/material";

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
