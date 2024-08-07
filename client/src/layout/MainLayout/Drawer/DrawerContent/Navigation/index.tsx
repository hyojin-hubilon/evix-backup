// material-ui
import { Box, Divider, Typography } from '@mui/material';

// project import
import menuItem from '@/menu-items';
import NavItem from './NavItem';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
    const navGroups = menuItem.items.map((item) => {
		if(item.type == 'group') {
			return ( 
				<>
				{
					item.children && item.children.map(child => {
						return <NavItem key={child.id} item={child} level={1} />
					})
				}
				
				<Divider sx={{mt: '1rem', mb: '1rem'}}/>
				</>
			)
		}
		else return <NavItem key={item.id} item={item} level={1} />
});
    return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
