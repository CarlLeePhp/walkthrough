import { useState } from "react";
import { AppBar, Button, List, ListItem, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const midLinks = [
    { title: 'Department', path: 'department' },
    { title: 'Backs', path: 'backs' },
    { title: 'Procedure/Area', path: 'procedure' },
]

const rightLinks = [
    { title: 'Login', path: '/login' },
    { title: 'Register', path: '/register' },
]

const navStyles = { color: 'inherit', typography: 'h6', '&:hover': { color: 'grey.500' }, '&.active': { color: 'text.secondary' }, textDecoration: 'none' }

export default function Header() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar>
                <Typography variant="h5" component={NavLink} to='/' sx={navStyles}>Wakthrough</Typography>
                <List sx={{ display: 'flex' }}>
                    <ListItem component={Button} sx={navStyles} onClick={handleMenu}>
                        Data
                    </ListItem>
                </List>
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {midLinks.map(({ title, path }) => (
                        <MenuItem component={NavLink} to={path} key={path} sx={navStyles}>
                            {title}
                        </MenuItem>
                    ))}
                </Menu>
                <span style={{ marginLeft: 'auto' }}></span>
                <List sx={{ display: 'flex' }}>
                    {rightLinks.map(({ title, path }) => (
                        <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                            {title}
                        </ListItem>
                    ))}
                </List>
            </Toolbar>
        </AppBar>
    )
}