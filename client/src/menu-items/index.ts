// project import
import pages from './pages';
import dashboard from './dashboard';
import utilities from './utilities';
import support from './support';
import { MenuItems } from '@/types/menu';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: MenuItems = {
  items: [dashboard, pages, utilities, support]
};

export default menuItems;
