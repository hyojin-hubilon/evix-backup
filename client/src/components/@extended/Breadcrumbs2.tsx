import Link, { LinkProps } from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {
  	Link as RouterLink,
  	useLocation
} from 'react-router-dom';


interface LinkRouterProps extends LinkProps {
  	to: string;
  	replace?: boolean;
}

function LinkRouter(props: LinkRouterProps) {
  	return <Link {...props} component={RouterLink as any} />;
}

const breadcrumbNameMap: { [key: string]: string } = {
	'/study': 'Study 목록',
	'/study/detail': 'Analysis & Summary'
};

const Breadcrumbs2 = () => {
  	const { pathname } = useLocation();
  	const pathnames = pathname.split('/').filter((x) => x);
	
	return (
    	<Breadcrumbs aria-label="breadcrumb" sx={{mb: 2}}>
			{pathnames.map((_value, index) => {
				const last = index === pathnames.length - 1;
				const to = `/${pathnames.slice(0, index + 1).join('/')}`;
				return last ? (
				<Typography key={to} fontWeight="600" color="common.black">
					{breadcrumbNameMap[to]}
				</Typography>
				) : (
				<LinkRouter underline="hover" color="inherit" to={to} key={to}>
					{breadcrumbNameMap[to]}
				</LinkRouter>
				);
			})}
    	</Breadcrumbs>
  );
}

export default Breadcrumbs2;