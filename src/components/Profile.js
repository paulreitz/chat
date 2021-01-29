import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../store/actions/userActions';
import { makeStyles } from '@material-ui/styles';
import { serverCall } from '../utils/server';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Edit from '@material-ui/icons/Edit';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
    container: {
        [theme.breakpoints.up('md')]: {
            width: 980,
            marginTop: 24
        },
        width: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    heading: {
        textAlign: 'center'
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 5
    }
}));

export function Profile(props) {
    const classes = useStyles();
    const created = new Date(props.user.createdAt);

    const displayName = (
        <Typography variant="body1">Display Name: {props.user.displayName}</Typography>
    )

    const userDisplay = (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h5">{props.user.name}</Typography>
            </Grid>
            <Grid item xs={12}>
                {displayName}
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body1">Since {created.toLocaleDateString()}</Typography>
            </Grid>
        </Grid>
    )

    return (
        <div className={classes.container}>
            <Grid container>
                <Grid item xs={2}>
                    <Avatar alt='avatar' src={`images/avatars/${props.user.avatar}`} className={classes.avatar} variant="square" />
                </Grid>
                <Grid item xs={10}>
                    {userDisplay}
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapDispatchToProps = (dispatch) => ({
    setUser: (userData) => dispatch(setUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);