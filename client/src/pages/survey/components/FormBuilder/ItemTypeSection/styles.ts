
import { TextField as MuiTextField, styled } from "@mui/material";

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';


export const Container = styled('div')<{ $isFocused: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  font-size: 14px;
  padding-left: 12px;
  :hover {
    & .MuiInputBase-root {
      ::before {
        border-bottom: none;
      }
      :not(.Mui-disabled) {
        border-bottom: ${({ $isFocused, theme }) =>
          $isFocused ? `1px solid ${theme.palette.grey[700]}` : "none"} !important;
      }
      .Mui-disabled {
        border-bottom: ${({ $isFocused, theme }) =>
          $isFocused ? `1px dotted ${theme.palette.grey[700]}` : "none"} !important;
      }
    }
  }

  & .MuiInputBase-root {
    font-size: 14px;
    ::before {
      border-bottom: none !important;
    }
    ::after {
      border-bottom: ${({ theme }) => `2px solid ${theme.palette.primary.main}`};
    }
  }
`;

export const TextField = styled(MuiTextField)<{ $isFocused: boolean }>`
  width: 637px;
  height: 30px;
  padding: 12px 8px;
`;

export const DeleteIcon = styled(DeleteOutlineIcon)`
  width: 25px;
  height: 25px;
  padding: 8px;
  cursor: pointer;
  :hover {
    border-radius: 100%;
    background-color: ${({ theme }) => theme.palette.grey[500]};
  }
`;

export const Sqare = styled(CropSquareIcon)`
  width: 23px;
  height: 23px;
`;

export const Circle = styled(CircleOutlinedIcon)`
  width: 23px;
  height: 23px;
`;

export const NumberSpan = styled('span')`
  width: 23px;
  height: 23px;
  text-align: center;
  box-sizing: border-box;
  padding-top: 5px;
`;

export const ItemAddButton = styled('button')`
  background-color: transparent;
  border: none;
  height: 30px;
  padding: 4px 0 5px 0;
  margin: 12px 8px;
  color: ${({ theme }) => theme.palette.grey[900]};
  :hover {
    padding-bottom: 4px;
    border-bottom: ${({ theme }) => `1px solid ${theme.palette.grey[700]}`};
  }
`;

export const EtcAddButton = styled('button')`
  border-radius: 4px;
  background-color: transparent;
  border: none;
  padding: 8px 8px;
  color: ${({ theme }) => theme.palette.primary.dark};
  :hover {
    background-color: ${({ theme }) => theme.palette.primary.lighter};
  }
`;

export const ContentDndHandle = styled('div')<{ $isFocused: boolean }>`
  display: ${({ $isFocused }) => ($isFocused ? "flex" : "none")};
  position: absolute;
  top: 0;
  left: 0;
  min-height: 60%;
  top: 10px;
  width: 10px;
  height: 60%;
  z-index: 20;
  border-radius: 4px;
  :hover {
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`;


