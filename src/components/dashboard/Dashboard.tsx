import React, { useState } from "react";

import { styled, createTheme, ThemeProvider } from "@mui/material/styles";

// CSS & Drawer
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";

// New Bar
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

// Material Lists
import List from "@mui/material/List";

// Icons
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';

// Material Grids & Box
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

// List for the menu
import { MenuItems } from "./MenuItems";

// Width for the drawer menu
const drawerWidth: number = 240;

// Props from AppBar
interface AppBarProps extends MuiAppBarProps {
    open?: boolean
}

// App Bar
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => (
    {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        ...[open && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        }]
    }
))

// Drawer Menu
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
        "& .MuiDrawer-paper": {
            position: "relative",
            whiteSpace: "nowrap",
            width: drawerWidth,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            }),
            boxSizing: "border-box",
            ...(!open && {
                overflow: "hidden",
                transition: theme.transitions.create("width", {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen
                }),
                width: theme.spacing(7),
                // Breakpoint to Media Queries of CSS in different display sizes (Responsive Design)
                [theme.breakpoints.up("sm")]: {
                    width: theme.spacing(9)
                }
            })
        }
    })
)

// Define Theme
const myTheme = createTheme();

// Dashboard Content
export const Dashboard = () => {
    const [open, setOpen] = useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    }

    return (
        <ThemeProvider theme={myTheme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                { /* App Bar */}
                <AppBar position="absolute" open={open}>
                    {/* Toolbar */}
                    <Toolbar sx={{ pr: "24px"}}>
                        {/* ICON TO TOGGLE DRAWER MENU */}
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: "36px",
                                ...(open && {
                                    display: "none"
                                })
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{
                                flexGrow: 1
                            }}
                        >
                            Code Verification Katas
                        </Typography>
                        {/* ICON to show Notifications */}
                        <IconButton>
                            <Badge badgeContent={10} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>

                        {/* ICON to show Notifications */}
                        <IconButton color="inherit">
                            <LogoutIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: "flex",
                            align: "center",
                            justifyContent: "flex-end",
                            px: [1]
                        }}
                    >
                        {/* ICON to hide the Menu */}
                        <IconButton color="inherit" onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    {/* List of menu items*/}
                    <List component="nav">
                        { MenuItems }
                    </List>
                </Drawer>
                {/* Dashboard Content */}
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) => theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900],
                        flexGrow: 1,
                        height: "100vh",
                        overflow: "auto"
                    }}
                >
                    {/* Toolbar */}
                    <Toolbar />
                    {/* Container with the content */}
                    <Container maxWidth="lg" sx={{ mt:4, mb:4 }}>
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper sx={{
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                height: 240
                            }}>
                            </Paper>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}