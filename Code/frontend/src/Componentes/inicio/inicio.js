import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch, Route, Link, Redirect, BrowserRouter } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import DescriptionIcon from '@material-ui/icons/Description';
import Formulario from '../formulario/formulario';
import ProcessTable from '../tablaEstudiantes/tablaEstudiantes';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 2,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        paddingTop: '-2000px',
        paddingLeft: 20
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
}));



const DrawerMenu = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const [prefersDarkMode, setTema] = React.useState(true);

    const themeType = React.useMemo(
        () =>
            createTheme({
                palette: {
                    type: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <ThemeProvider theme={themeType}>

            <div className={classes.root}>
                <CssBaseline />
                <BrowserRouter>
                    <Drawer
                        variant="permanent"
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open,
                            }),
                        }}
                    >

                        <List className={clsx(classes, { [classes.hide]: open, })}>
                            <ListItem button onClick={handleDrawerOpen}>
                                <ListItemIcon edge="start" style={{ paddingBottom: '4px', paddingTop: '4px' }}>
                                    <MenuIcon color="inherit"
                                        aria-label="open drawer"
                                    />
                                </ListItemIcon>
                            </ListItem>
                        </List>

                        <div className={clsx(classes, { [classes.hide]: !open, })}>
                            <div className={classes.toolbar}>
                                <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                                </IconButton>
                            </div>
                        </div>
                        <Divider />
                        <List>
                            <Link to='ListaEstudiantes' className={classes.link}>
                                <ListItem button key='ListaEstudiantes'>
                                    <ListItemIcon><ListAltIcon /></ListItemIcon>
                                    <ListItemText primary='Lista de Estudiantes' />
                                </ListItem>
                            </Link>

                            <Link to='Formulario' className={classes.link}>
                                <ListItem button key='Formulario'>
                                    <ListItemIcon><DescriptionIcon /></ListItemIcon>
                                    <ListItemText primary='Crear Estudiante' />
                                </ListItem>
                            </Link>

                        </List>
                        <Divider />
                    </Drawer>
                    <main className={classes.content} style={{ paddingRight: '18px' }}>
                        <Route exact path='/ListaEstudiantes'>
                            <ProcessTable />
                        </Route>
                        <Route exact path='/Formulario'>
                            <Formulario />
                        </Route>
                        <Route path='/' exact>
                            <Redirect to="/ListaEstudiantes" />
                        </Route>
                        <Route path='/Inicio' exact>
                            <Redirect to="/ListaEstudiantes" />
                        </Route>
                        <Route path='/Inicioform' exact>
                            <Redirect to="/Formulario" />
                        </Route>
                          
                    </main>
                </BrowserRouter>
            </div >
        </ThemeProvider>
    );
}

export default DrawerMenu;