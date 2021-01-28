import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar
    }
}))

export function Header(props) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h5" color="secondary">Basic Chat Application</Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbarMargin}></div>
        </React.Fragment>
    )
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.user.token,
    displayName: state.user.displayName
});

export default connect(mapStateToProps)(Header);