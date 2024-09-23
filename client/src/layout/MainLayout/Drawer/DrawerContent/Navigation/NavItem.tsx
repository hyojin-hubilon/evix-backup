import { useEffect } from 'react';
import { LinkProps, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import {
    Avatar,
    Chip,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Theme,
    Typography,
	useTheme
} from '@mui/material';

// project import
import { activeItem } from '@store/reducers/menu';
import { IRootState } from '@store/reducers';
import { Override } from '@utils/common';
import { MenuItem } from '@/types/menu';

// ==============================|| NAVIGATION - LIST ITEM ||============================== //

type CustomProps = {
    item: MenuItem;
    level: number;
};

export type MainCardProps = Override<LinkProps, CustomProps>;

const NavItem = ({ item, level }: CustomProps) => {
    const theme: Theme = useTheme();
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const { pathname } = useLocation();

    const { drawerOpen, openItem } = useSelector((state: IRootState) => state.menu);

    const itemHandler = (item) => {
        navigation(item.url);
        dispatch(activeItem({ openItem: [item.id] }));
    };
    const Icon = item.icon;
    const itemIcon = Icon ? <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} /> : '';
    const isSelected = openItem.findIndex((id) => id === item.id) > -1;
    // active menu item on page load
    useEffect(() => {
        if (item.url && pathname.includes(item.url)) {
            dispatch(activeItem({ openItem: [item.id] }));
        }
        // eslint-disable-next-line
    }, [pathname]);

    const textColor = 'text.primary';
    const iconSelectedColor = 'primary.main';

    return (
        <ListItemButton
            disabled={item.disabled}
            onClick={() => itemHandler(item)}
            selected={isSelected}
            sx={{
                zIndex: 1201,
                pl: drawerOpen ? `${level * 28}px` : 1.5,
                py: !drawerOpen && level === 1 ? 1.25 : 1,
				'&.Mui-disabled' : {
					opacity: 1,
					'.MuiListItemIcon-root, .MuiListItemText-root' : {
						opacity:0.38
					}

				},
                ...(drawerOpen && {
                    '&:hover': {
                        bgcolor: 'primary.lighter',
                    },
                    '&.Mui-selected': {
                        bgcolor: 'primary.lighter',
                        borderRight: `2px solid ${theme.palette.primary.main}`,
                        color: iconSelectedColor,
                        '&:hover': {
                            color: iconSelectedColor,
                            bgcolor: 'primary.lighter',
                        },
                    },
                }),
                ...(!drawerOpen && {
                    '&:hover': {
                        bgcolor: 'transparent',
                    },
                    '&.Mui-selected': {
                        '&:hover': {
                            bgcolor: 'transparent',
                        },
                        bgcolor: 'transparent',
                    },
                }),
				overflow: 'hidden'
            }}
        >
            {item.icon && (
                <ListItemIcon
                    sx={{
                        minWidth: 28,
                        color: isSelected ? iconSelectedColor : textColor,
                        ...(!drawerOpen && {
                            borderRadius: 1.5,
                            width: 36,
                            height: 36,
                            alignItems: 'center',
                            justifyContent: 'center',
                            '&:hover': {
                                bgcolor: 'secondary.lighter',
                            }
                        }),
                        ...(!drawerOpen &&
                            isSelected && {
                                bgcolor: 'primary.lighter',
                                '&:hover': {
                                    bgcolor: 'primary.lighter',
                                },
                            }),
						overflow: 'hidden'
                    }}
                >
                    {itemIcon}
                </ListItemIcon>
            )}
            {(drawerOpen || (!drawerOpen && level !== 1)) && (
                <ListItemText
                    primary={
                        <Typography
                            variant="h6"
                            sx={{ color: isSelected ? iconSelectedColor : textColor }}
                        >
                            {item.title}
                        </Typography>
                    }
                />
            )}
            {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
                <Chip
                    color={item.chip.color}
                    variant={item.chip.variant}
                    size={item.chip.size}
                    label={item.chip.label}
                    avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
                />
            )}
			{(drawerOpen || (!drawerOpen && level !== 1)) && item.disabled && (
                <Chip
                    color="warning"
                    size="small"
                    label="COMING SOON"
					sx={{fontSize: '0.6rem',
						opacity: 1,
					}}
                />
            )}
        </ListItemButton>
    );
};

export default NavItem;
