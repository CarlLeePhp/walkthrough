import { AppBar, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const midLinks = [
    { title: 'Department', path: 'department' },
]

const rightLinks = [
    { title: 'Login', path: '/login' },
    { title: 'Register', path: '/register' },
]

const navStyles = { color: 'inherit', typography: 'h6', '&:hover': { color: 'grey.500' }, '&.active': { color: 'text.secondary' }, textDecoration: 'none' }

export default function Header() {
    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar>
                <Typography variant="h5" component={NavLink} to='/' sx={navStyles}>Wakthrough</Typography>
                <List sx={{ display: 'flex' }}>
                    {midLinks.map(({ title, path }) => (
                        <ListItem component={NavLink} to={path} key={path} sx={navStyles}>
                            {title}
                        </ListItem>
                    ))}
                </List>
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