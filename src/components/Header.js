import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import { unsetUser } from '../store/actions/userActions';

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar
    }
}))

export function Header(props) {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (e, val) => {
        setValue(val);
    }

    const doLogout = () => {
        window.localStorage.removeItem('user');
        props.unsetUser();
    }

    const routes = ['/profile', '/chat'];
    const currentRoute = routes.indexOf(window.location.pathname);
    if (currentRoute !== value && currentRoute !== -1) {
        setValue(currentRoute);
    } 


    const tabs = (
        <Tabs className={classes.tabs} value={value} onChange={handleChange} indicatorColor="primary" centered>
            <Tab component={Link} to="/profile" label="Profile" disableRipple />
            <Tab component={Link} to="/chat" label="Chat" disableRipple />
            <Tab label="Logout" onClick={doLogout} />
        </Tabs>
    )

    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h5" color="secondary">Basic Chat Application</Typography>
                    {
                        props.isAuthenticated
                            ? tabs
                            : null
                    }
                </Toolbar>
            </AppBar>
            <div className={classes.toolbarMargin}></div>
        </React.Fragment>
    )
};

const mapDispatchToProps = (dispatch) => ({
    unsetUser: () => dispatch(unsetUser())
})

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.user.token,
    displayName: state.user.displayName
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);