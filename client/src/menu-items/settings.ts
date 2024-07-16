// assets
import { MenuItem } from '@/types/menu';
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const settings: MenuItem = {
    id: 'settings',
    title: 'Settings',
    type: 'group',
    children: [
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

export default settings;