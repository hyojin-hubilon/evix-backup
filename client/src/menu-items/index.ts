// project import
import pages from './pages';
import dashboard from './dashboard';
import studies from './studies';
import support from './support';
import { MenuItems } from '@/types/menu';
import settings from './settings';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: MenuItems = {
    items: [dashboard, studies, pages, support, settings],
};

export default menuItems;
