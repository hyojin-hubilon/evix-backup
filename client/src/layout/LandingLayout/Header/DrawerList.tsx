import { useNavigate } from "react-router";
import { Link as ReactRouterLink } from 'react-router-dom';

import { Box, List, ListItem, ListItemButton, Button, Divider, Link} from "@mui/material";

type Props = {
	handleDrawerToggle: () => void;
}

const DrawerList = ({handleDrawerToggle} : Props) => {
	const navigate = useNavigate();
	
	const toLoginPage = () => {
		navigate("/login");
		handleDrawerToggle();
	};

	const toDemoPage = () => {
		navigate("/apply");
		handleDrawerToggle();
	};
  
	const linkList = [
		{ text: "Home", url : "/"},
		{ text: "Product", url : "/"},
		{ text: "Case", url : "/"},
		{ text: "Price", url : "/"},
		{ text: "Support", url : "/support"},
	];

	return (
		<Box sx={{ width: 250 }} role="presentation">
			<List>
				{linkList.map((link) => (
				<ListItem key={link.text} disablePadding>
					<ListItemButton>
						<Link component={ReactRouterLink} to={link.url} underline="none"  onClick={handleDrawerToggle}>
							{link.text}
						</Link>
					</ListItemButton>
				</ListItem>
				))}
			</List>
			<Divider />
			<List>
			<ListItem>
				<Box display="flex" gap={2}>
				<Button variant='contained' onClick={toDemoPage} sx={{fontSize: "0.9rem"}}>Demo</Button>
				<Button variant='contained' sx={{backgroundColor: '#091C3D', fontSize: "0.9rem"}} onClick={toLoginPage}>Login</Button>
				</Box>
			</ListItem>
			</List>
		</Box>
	);
}


export default DrawerList;