// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Chip } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import LogoSection from '@components/Logo';

// ==============================|| DRAWER HEADER ||============================== //
type Props = {
    open: boolean;
};

const DrawerHeader = ({ open }: Props) => {
    const theme = useTheme();

    return (
        <DrawerHeaderStyled theme={theme} open={open}>
            <Stack direction="row" spacing={1} alignItems="center">
                <LogoSection />
                <Chip
                    label={import.meta.env.PACKAGE_VERSION}
                    size="small"
                    sx={{ height: 16, '& .MuiChip-label': { fontSize: '0.625rem', py: 0.25 } }}
                />
            </Stack>
        </DrawerHeaderStyled>
    );
};

export default DrawerHeader;
