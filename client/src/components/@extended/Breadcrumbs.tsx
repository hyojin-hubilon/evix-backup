import Link, { LinkProps } from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
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
	'study': 'Study',
	'/survey': 'Survey',
	'settings' : 'Settings'
};

type BreadCrumbsType = {
	sub: string;
}

const Breadcrumbs = ({sub} : BreadCrumbsType) => {
  	const { pathname } = useLocation();
  	const pathnames = pathname.split('/').filter((x) => x);
	

	// console.log(pathnames);
	
	return (
		<MuiBreadcrumbs aria-label="breadcrumb" sx={{mb: 2}}>
			
			<LinkRouter underline="hover" color="inherit" to={`/${pathnames[0]}`}>
				{breadcrumbNameMap[pathnames[0]]}
			</LinkRouter>
			
			<Typography fontWeight="600" color="common.black" textOverflow="ellipsis" maxWidth="200px" overflow="hidden" whiteSpace="nowrap">
				{ sub }
			</Typography>

			{/* {pathnames.map((_value, index) => {
				const last = index === pathnames.length - 1;
				const to = `/${pathnames.slice(0, index + 1).join('/')}`;
				return last ? (
				<Typography key={to} >
					{breadcrumbNameMap[to]}
				</Typography>
				) : (
				<LinkRouter underline="hover" color="inherit" to={to} key={to}>
					{breadcrumbNameMap[to]}
				</LinkRouter>
				);
			})} */}
    	</MuiBreadcrumbs>
  );
}

export default Breadcrumbs;