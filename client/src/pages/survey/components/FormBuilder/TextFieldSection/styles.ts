import { InputTypes } from '@/store/reducers/survey';
import { TextField as MuiTextField, styled } from '@mui/material';

export const TextField = styled(MuiTextField)<{
	$isTitle: boolean;
	$isFocused: boolean;
	$inputType: string;
  }>`
	width: ${({ $isTitle, $inputType }) => {
	if ($isTitle) return "100%";
	if ($inputType === InputTypes.WRITE) return "365px";
		return "620px";
	}};

	div {
	font-size: 14px;

	::before {
		border-bottom: ${({ $isTitle, $isFocused, theme }) => {
			if ($isTitle) {
				return $isFocused ? `1px solid ${theme.palette.grey[900]}` : "none";
			}
			return `1px dotted ${theme.palette.grey[900]}`;
		}} !important;
	}

	::after {
		border-bottom: ${({ theme }) => `2px solid ${theme.palette.primary.main}`};
	}
}
`;

