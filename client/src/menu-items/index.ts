// project import
import { MenuItems } from '@/types/menu';
import { OrderedListOutlined, AppstoreAddOutlined, DashboardOutlined, BarChartOutlined, SettingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
const icons = {
    OrderedListOutlined,
    AppstoreAddOutlined,
	DashboardOutlined,
	BarChartOutlined,
	SettingOutlined,
	QuestionCircleOutlined
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
			id: 'evix-info',
			title: 'evix-info',
			type: 'group',
			children: [
				{
					id: 'help',
					title: 'Help',
					type: 'item',
					url: '/help',
					icon: icons.QuestionCircleOutlined,
					breadcrumbs: false,
				},
				{
					id: 'settings',
					title: 'Settings',
					type: 'item',
					url: '/settings',
					icon: icons.SettingOutlined,
					breadcrumbs: false,
				},
			]
		}
	],
};

export default menuItems;
