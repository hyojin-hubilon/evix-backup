// project import
import dashboard from './dashboard';
import studies from './studies';
import { MenuItems } from '@/types/menu';
import settings from './settings';
import survey from './survey';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: MenuItems = {
    items: [dashboard, studies, survey, settings],
};

export default menuItems;
