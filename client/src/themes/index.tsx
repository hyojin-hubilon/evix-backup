import { ReactNode, useMemo } from 'react';

// material-ui
import { CssBaseline, StyledEngineProvider, Theme, ThemeOptions } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import componentsOverride from './overrides';

// project import
import Palette from './palette';
import { alpha } from '@mui/material/styles';
import Typography from './typography';

// ==============================|| DEFAULT THEME - MAIN  ||============================== //
type Props = { children: ReactNode };

declare module '@mui/material/styles' {
    interface Theme {
        customShadows: {
            button: string;
            text: string;
            z1: string;
        };
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
        customShadows?: {
            button?: string;
            text?: string;
            z1: string;
        };
    }
}

declare module '@mui/material/styles/createMixins' {
    interface Mixins {
        appBar?: CSSProperties;
        button?: CSSProperties;
    }
}

export default function ThemeCustomization({ children }: Props) {
    const theme = Palette('light');

    const themeTypography = Typography(
        `"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif`
    );

    const themeOptions = useMemo<ThemeOptions>(
        () => ({
            breakpoints: {
                values: {
                    xs: 0,
                    sm: 768,
                    md: 1024,
                    lg: 1210,
                    xl: 1440,
                },
            },
            direction: 'ltr',
            mixins: {
                toolbar: {
                    minHeight: 60,
                    paddingTop: 8,
                    paddingBottom: 8,
                },
                appBar: {
                    minHeight: 80,
                },
                button: {
                    boxShadow: 'none',
                },
            },
            palette: theme.palette,
            customShadows: {
                button: `0 2px #0000000b`,
                text: `0 -1px 0 rgb(0 0 0 / 12%)`,
                z1: `0px 2px 8px ${alpha(theme.palette.grey[900], 0.15)}`,
            },
            typography: themeTypography,
        }),
        [theme, themeTypography]
    );

    const themes: Theme = createTheme(themeOptions);
    themes.components = componentsOverride(themes);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
}
