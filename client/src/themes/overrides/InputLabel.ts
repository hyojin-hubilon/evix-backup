// ==============================|| OVERRIDES - INPUT LABEL ||============================== //

export default function InputLabel(theme) {
    return {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: theme.palette.grey[600],
                },
                outlined: {
                    '&.MuiInputLabel-sizeSmall': {
                        lineHeight: '1em',
                    },
                    '&.MuiInputLabel-shrink': {
                        background: theme.palette.background.paper,
                        padding: '0 8px',
                        marginLeft: -6,
                        lineHeight: '1em',
                    },
                },
            },
        },
    };
}
