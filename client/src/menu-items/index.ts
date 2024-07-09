// project import
import dashboard from './dashboard';
import studies from './studies';
import { MenuItems } from '@/types/menu';
import settings from './settings';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: MenuItems = {
    items: [dashboard, studies, settings],
};

export default menuItems;
