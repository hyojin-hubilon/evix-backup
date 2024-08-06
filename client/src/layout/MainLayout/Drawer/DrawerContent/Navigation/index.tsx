// material-ui
import { Box, Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
import menuItem from '@/menu-items';
import NavItem from './NavItem';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
    const navGroups = menuItem.items.map((item) => <NavItem key={item.id} item={item} level={1} />);
    return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
