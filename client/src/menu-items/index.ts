// project import
import { MenuItems } from '@/types/menu';
import { OrderedListOutlined, AppstoreAddOutlined, DashboardOutlined, BarChartOutlined, SettingOutlined } from '@ant-design/icons';
import PollIcon from '@mui/icons-material/Poll';
import SettingsIcon from '@mui/icons-material/Settings';
const icons = {
    OrderedListOutlined,
    AppstoreAddOutlined,
	DashboardOutlined,
	PollIcon,
	SettingsIcon,
	BarChartOutlined,
	SettingOutlined
};


// ==============================|| MENU ITEMS ||============================== //

const menuItems: MenuItems = {
    items: [
		{
			id: 'evix-dashboard',
			title: 'evix-dashboard',
			type: 'group',
			children: [
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
					icon: icons.BarChartOutlined,
					breadcrumbs: false
				},
			]	
		},
		
		{
            id: 'settings',
            title: 'Settings',
            type: 'item',
            url: '/settings',
            icon: icons.SettingOutlined,
            breadcrumbs: false,
        },
	],
};

export default menuItems;
