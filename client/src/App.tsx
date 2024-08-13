import 'i18next';
import '@i18n';

import ScrollTop from '@components/ScrollTop';
// project import
import Routes from '@/routes';
import ThemeCustomization from '@/themes';
import { CookiesProvider } from 'react-cookie';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ConfirmationServiceProvider } from './components/ui/ConfirmDialog/ConfirmDialogContext';

import 'react-multi-carousel/lib/styles.css';


// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
    <CookiesProvider>
		<ConfirmationServiceProvider>
			<ThemeCustomization>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<ScrollTop>
						<Routes />
					</ScrollTop>
				</LocalizationProvider>
			</ThemeCustomization>
		</ConfirmationServiceProvider>
    </CookiesProvider>
);

export default App;
