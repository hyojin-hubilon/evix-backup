import config from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { activeItem } from '@store/reducers/menu';

// material-ui
import { ButtonBase, SxProps, Theme } from '@mui/material';

// project import
import Logo from './Logo';
import { IRootState } from '@/store/reducers';

// ==============================|| MAIN LOGO ||============================== //

type Props = {
	sx?: SxProps<Theme>;
	to?: string;
}
const LogoSection = ({ sx, to } : Props) => {
  const { defaultId } = useSelector((state: IRootState) => state.menu);

  const dispatch = useDispatch();
  return (
    <ButtonBase
      disableRipple
      component={Link}
      onClick={() => dispatch(activeItem({ openItem: [defaultId] }))}
      to={!to ? config.defaultPath : to}
      sx={sx}
    >
      <Logo />
    </ButtonBase>
  );
};

export default LogoSection;
