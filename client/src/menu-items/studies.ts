// assets
import { MenuItem } from '@/types/menu';
import { OrderedListOutlined, AppstoreAddOutlined } from '@ant-design/icons';

// icons
const icons = {
    OrderedListOutlined,
    AppstoreAddOutlined,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const studies: MenuItem = {
    id: 'study',
    title: 'Studies',
    type: 'group',
    children: [
        {
            id: 'study-list',
            title: 'Study 목록',
            type: 'item',
            url: '/study/list',
            icon: icons.OrderedListOutlined,
            breadcrumbs: false,
        },
        {
            id: 'new-study',
            title: 'Study 생성',
            type: 'item',
            url: '/study/new',
            icon: icons.AppstoreAddOutlined,
            breadcrumbs: false,
        },
    ],
};

export default studies;
