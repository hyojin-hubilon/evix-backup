// material-ui
import { styled } from "@mui/system";
import Drawer from "@mui/material/Drawer";

// project import
import { drawerWidth } from "@/config";

const openedMixin = (theme) => ({
    width: drawerWidth,
    borderRight: `1px solid ${theme.palette.divider}`,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
    boxShadow: "none",
    variant: "div",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: 60,
    borderRight: "none",
    boxShadow: theme.customShadows.z1,
    variant: "div",
});

// ==============================|| DRAWER - MINI STYLED ||============================== //
const MiniDrawerStyled = styled(Drawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
    const openOrClose = open ? openedMixin(theme) : closedMixin(theme);
    return {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        openOrClose,
        "& .MuiDrawer-paper": openOrClose,
    };
});

export default MiniDrawerStyled;
