// material-ui
import { Box, Divider, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
// project import
import menuItem from '@/menu-items';
import NavItem from './NavItem';
import { IRootState } from '@/store/reducers';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {

	const { drawerOpen, openItem } = useSelector((state: IRootState) => state.menu);

	
    const navGroups = menuItem.items.map((item, index) => {
		if(item.type == 'group') {
			return ( 
				<Box key={index}>
				{
					item.children && item.children.map(child => {
						return (
							<>
								<NavItem key={child.id} item={child} level={1} />
								{
									child.children && child.children.map(subChild => <NavItem key={subChild.id} item={subChild} level={2} />)
								}
							</>
						)
					})
				}
				
				{index + 1 !== menuItem.items.length && <Divider sx={{mt: '1rem', mb: '1rem'}}/>}
				</Box>
			)
		}
		else return <NavItem key={item.id} item={item} level={1} />
	});
    
	return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};

export default Navigation;
