import { Box, Card, styled } from '@mui/material';

export const Container = styled('div')`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 16px;
`;

export const SCard = styled(Card, {
	shouldForwardProp: (prop) => prop !== "needToCompleteRequired"
})<{ needToCompleteRequired:'Y' | 'N'}>(({needToCompleteRequired, theme}) => ({
	display: 'flex',
  	flexDirection: 'column',
  	border: needToCompleteRequired == 'Y' ? `1px solid ${theme.palette.error.main}` : 0,
  	borderRadius: '8px',
  	backgroundColor: 'white',
  	minHeight: '131px',
	width: '100%',
  	padding: '1.7rem',
	boxSizing: 'border-box',
}));


export const TitleHighlight = styled('div')(({theme}) => ({
	position: 'absolute',
  	top: 0,
  	left: 0,
	backgroundColor: theme.palette.primary.main,
	minWidth: '100%',
	width: '100%',
	height: '10px',
	zIndex: '20'	
}))

export const RequiredSection = styled('div')`
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 30px;
`;

export const RequiredSpan = styled('span')(({theme}) => ({
	fontSize: '12px',
  	color: theme.palette.error.main
}))


export const RequireMark = styled('span')(({theme}) => ({
	paddingLeft: '4px',
  	fontSize: '16px',
  	color: theme.palette.error.main
}))