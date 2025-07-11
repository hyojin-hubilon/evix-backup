// project import
import { MenuItems } from '@/types/menu';
import { OrderedListOutlined, AppstoreAddOutlined, DashboardOutlined, BarChartOutlined, SettingOutlined, QuestionCircleOutlined, DollarOutlined, LineChartOutlined, EditOutlined } from '@ant-design/icons';
const icons = {
    OrderedListOutlined,
    AppstoreAddOutlined,
	DashboardOutlined,
	BarChartOutlined,
	SettingOutlined,
	QuestionCircleOutlined,
	DollarOutlined,
	LineChartOutlined,
	EditOutlined
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
					title: 'Studies',
					type: 'item',
					url: '/study',
					icon: icons.OrderedListOutlined,
					breadcrumbs: false
				},
				{
					id: 'report',
					title: 'Report',
					type: 'item',
					url: '/report',
					icon: icons.LineChartOutlined,
					breadcrumbs: false,
					disabled: true
				},
				{
					id: 'builder',
					title: 'Builder',
					type: 'collapse',
					icon: icons.AppstoreAddOutlined,
					breadcrumbs: false,
					children: [
						{
							id: 'survey-list',
							title: 'Survey Design',
							type: 'item',
							url: '/survey',
							icon: icons.BarChartOutlined,
							breadcrumbs: false
						},
						{
							id: 'ecrf-list',
							title: 'eCRF Design',
							type: 'item',
							url: '/e-crf',
							icon: icons.EditOutlined,
							breadcrumbs: false
						}
					]
				},
				
			]	
		},
		{
			id: 'evix-info',
			title: 'evix-info',
			type: 'group',
			children: [
				{
					id: 'billing',
					title: 'Billing',
					type: 'item',
					url: '/billing',
					icon: icons.DollarOutlined,
					breadcrumbs: false,
					disabled: true
				},
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
