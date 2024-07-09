import 'i18next';
import '@i18n';

import ScrollTop from '@components/ScrollTop';
// project import
import Routes from '@/routes';
import ThemeCustomization from '@/themes';
import { CookiesProvider } from 'react-cookie';
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
    <CookiesProvider>
        <ThemeCustomization>
            <ScrollTop>
                <Routes />
            </ScrollTop>
        </ThemeCustomization>
    </CookiesProvider>
);

export default App;
