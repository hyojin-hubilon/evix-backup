// assets
import { MenuItem } from '@/types/menu';
import { LoginOutlined, MailOutlined, ProfileOutlined } from '@ant-design/icons';
// import { jwtDecode } from "jwt-decode";
// import { getCookie, getDecodedToken } from "@utils/Cookie";

// icons
const icons = {
    LoginOutlined,
    ProfileOutlined,
    MailOutlined,
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages: MenuItem = {
    id: 'authentication',
    title: 'Authentication',
    type: 'group',
    children: [
        {
            id: 'login1',
            title: 'Login',
            type: 'item',
            url: '/login',
            icon: icons.LoginOutlined,
            target: false,
        },
        {
            id: 'register1',
            title: 'Register',
            type: 'item',
            url: '/register',
            icon: icons.ProfileOutlined,
            target: false,
        },
        {
            id: 'form1',
            title: 'ApplyFreeTrialForm',
            type: 'item',
            url: '/apply',
            icon: icons.ProfileOutlined,
            target: false,
        },
        {
            id: 'invite',
            title: 'Invite(임상시원 연구원 초대)',
            type: 'item',
            url: '/invite',
            icon: icons.MailOutlined,
        },
    ],
};

export default pages;
