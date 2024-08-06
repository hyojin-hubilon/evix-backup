// project import
import { MenuItems } from '@/types/menu';
import { OrderedListOutlined, AppstoreAddOutlined, DashboardOutlined } from '@ant-design/icons';
import PollIcon from '@mui/icons-material/Poll';
const icons = {
    OrderedListOutlined,
    AppstoreAddOutlined,
	DashboardOutlined,
	PollIcon
};


// ==============================|| MENU ITEMS ||============================== //

const menuItems: MenuItems = {
    items: [
		{
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard',
            icon: icons.DashboardOutlined,
            breadcrumbs: false,
        },
		{
			id: 'study-list',
            title: 'Study',
            type: 'item',
            url: '/study',
            icon: icons.OrderedListOutlined,
            breadcrumbs: false
		},
		{
            id: 'survey-list',
            title: 'Survey',
            type: 'item',
            url: '/survey',
            icon: icons.PollIcon,
            breadcrumbs: false
        },
		{
            id: 'settings',
            title: 'Settings',
            type: 'item',
            url: '/settings',
            icon: icons.DashboardOutlined,
            breadcrumbs: false,
        },
	],
};

export default menuItems;
