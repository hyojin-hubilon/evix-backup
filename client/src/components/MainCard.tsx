import { forwardRef, ReactNode } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Card,
    CardContent,
    CardContentProps,
    CardHeader,
    CardHeaderProps,
    CardProps,
    Divider,
    Typography,
} from '@mui/material';

// project import
import Highlighter from './third-party/Highlighter';
import { Override } from '@utils/common';

// header style
const headerSX = {
    p: 2.5,
    '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' },
};

// ==============================|| CUSTOM - MAIN CARD ||============================== //

//MUI Card에서 extends하여 사용할 props
type CustomProps = {
    border?: boolean;
    boxShadow?: boolean;
    children?: ReactNode | string;
    content?: boolean;
    contentSX?: CardContentProps['sx'];
    darkTitle?: boolean;
    elevation?: number;
    secondary?: CardHeaderProps['action'];
    shadow?: string;
    sx?: CardProps['sx'];
    title?: ReactNode | string;
    codeHighlight?: boolean;
};

export type MainCardProps = Override<CardProps, CustomProps>;

const MainCard = forwardRef<typeof Card, MainCardProps>(
    (
        {
            border = true,
            boxShadow,
            children,
            content = true,
            contentSX = {},
            darkTitle,
            elevation,
            secondary,
            shadow,
            sx = {},
            title,
            codeHighlight,
            ...others
        },
        ref
    ) => {
        const theme = useTheme();
        boxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow;

        return (
            <Card
                elevation={elevation || 0}
                ref={ref}
                component="div"
                {...others}
                sx={{
                    border: border ? '1px solid' : 'none',
                    borderRadius: 2,
                    borderColor:
                        theme.palette.mode === 'dark'
                            ? theme.palette.divider
                            : theme.palette.grey.A800,
                    boxShadow:
                        boxShadow && (!border || theme.palette.mode === 'dark')
                            ? shadow || theme.customShadows.z1
                            : 'inherit',
                    ':hover': {
                        boxShadow: boxShadow ? shadow || theme.customShadows.z1 : 'inherit',
                    },
                    '& pre': {
                        m: 0,
                        p: '16px !important',
                        fontFamily: theme.typography.fontFamily,
                        fontSize: '0.75rem',
                    },
                    ...sx,
                }}
            >
                {/* card header and action */}
                {!darkTitle && title && (
                    <CardHeader
                        sx={headerSX}
                        titleTypographyProps={{ variant: 'subtitle1' }}
                        title={title}
                        action={secondary}
                    />
                )}
                {darkTitle && title && (
                    <CardHeader
                        sx={headerSX}
                        title={<Typography variant="h3">{title}</Typography>}
                        action={secondary}
                    />
                )}

                {/* card content */}
                {content && <CardContent sx={contentSX}>{children}</CardContent>}
                {!content && children}

                {/* card footer - clipboard & highlighter  */}
                {codeHighlight && (
                    <>
                        <Divider sx={{ borderStyle: 'dashed' }} />
                        <Highlighter codeHighlight={codeHighlight} main>
                            {children}
                        </Highlighter>
                    </>
                )}
            </Card>
        );
    }
);

export default MainCard;
