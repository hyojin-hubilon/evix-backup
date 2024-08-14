import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import {
    EditOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ProfileTab = ({ onLogout }) => {
    const theme = useTheme();
    const [selectedIndex, setSelectedIndex] = useState(-1);
	const navigate = useNavigate();

    const handleListItemClick = (event, index) => {
        event.preventDefault();
        setSelectedIndex(index);
    };

	const handleMoveSetting = () => {
		navigate('/settings');
	}

    return (
        <List
            component="nav"
            sx={{
                p: 0,
                '& .MuiListItemIcon-root': {
                    minWidth: 32,
                    color: theme.palette.grey[500],
                },
            }}
        >
            <ListItemButton
                selected={selectedIndex === 0}
                onClick={handleMoveSetting}
            >
                <ListItemIcon>
                    <EditOutlined />
                </ListItemIcon>
                <ListItemText primary="Settings" />
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 1} onClick={onLogout}>
                <ListItemIcon>
                    <LogoutOutlined />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItemButton>
        </List>
    );
};

export default ProfileTab;
