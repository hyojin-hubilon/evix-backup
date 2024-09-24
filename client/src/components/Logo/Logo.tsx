import logo from '@assets/images/evixdct_logo.svg';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

type LogoProps = {
    width?: number | string;
};
const Logo = ({ width = 170 }: LogoProps) => {
    const [boxWidth, setBoxWidth] = useState<number | string>(width);

    useEffect(() => {
        setBoxWidth(width);
    }, [width]);

    return (
        <Box width={boxWidth} sx={{display: 'flex', alignItems:'center'}}>
            <img src={logo} alt="evix-DCT" width="100%" />
        </Box>
    );
};

export default Logo;
