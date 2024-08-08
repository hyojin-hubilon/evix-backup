import { Box, styled, Typography } from "@mui/material";

export const GreyBox = styled(Box)(({theme}) => ({
	backgroundColor: theme.palette.grey[50],
	borderRadius: '1rem',
	padding: '1rem',
	height: '100%',
	border: `1px solid ${theme.palette.grey[200]}`
}))

export const H5LengthSixteen = styled(Typography)`
	max-width: 240px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;
