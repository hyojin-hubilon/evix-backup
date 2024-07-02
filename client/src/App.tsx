import 'i18next';
import '@i18n';

import ScrollTop from '@components/ScrollTop';
// project import
import Routes from '@/routes';
import ThemeCustomization from '@/themes';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
    <ThemeCustomization>
        <ScrollTop>
            <Routes />
        </ScrollTop>
    </ThemeCustomization>
);

export default App;
