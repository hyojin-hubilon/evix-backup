// assets
import { MenuItem } from '@/types/menu';
import { FileAddOutlined } from '@ant-design/icons';
import PollIcon from '@mui/icons-material/Poll';
import AddchartIcon from '@mui/icons-material/Addchart';

// icons
const icons = {
	PollIcon,
	AddchartIcon
};

// ==============================|| MENU ITEMS - Survey ||============================== //

const studies: MenuItem = {
    id: 'survey',
    title: 'Survey',
    type: 'group',
    children: [
        {
            id: 'survey-list',
            title: 'Survey 목록',
            type: 'item',
            url: '/survey',
            icon: icons.PollIcon,
            breadcrumbs: false
        },
        {
            id: 'new-survey',
            title: 'Survey 생성',
            type: 'item',
            url: '/survey/new',
            icon: icons.AddchartIcon,
            breadcrumbs: false,
        },
    ],
};

export default studies;
