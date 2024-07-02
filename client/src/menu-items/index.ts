// project import
import pages from './pages';
import dashboard from './dashboard';
import studies from './studies';
import support from './support';
import { MenuItems } from '@/types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: MenuItems = {
    items: [dashboard, studies, pages, support],
};

export default menuItems;
