import React from "react";

// Material List Components
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

// Material Icon Components
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BarChartIcon from '@mui/icons-material/BarChart';

export const MenuItems = (
    <React.Fragment>
        {/* Dashboard to Katas Button */}
        <ListItemButton>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Katas"/>
        </ListItemButton>

        {/* Users */}
        <ListItemButton>
            <ListItemIcon>
                <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary="Users"/>
        </ListItemButton>

        {/* Ranking */}
        <ListItemButton>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Ranking"/>
        </ListItemButton>
    </React.Fragment>

    
)