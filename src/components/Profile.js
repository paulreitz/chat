import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setDisplayName, setAvatar } from '../store/actions/userActions';
import { makeStyles } from '@material-ui/styles';
import { serverCall } from '../utils/server';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    },
    displayName: {
        display: 'flex'
    },
    edit: {
        color: 'gray',
        marginLeft: 10,
        fontSize: 22,
        cursor: 'pointer'
    },
    check: {
        color: 'green',
        paddingTop: 20,
        marginLeft: 10,
        cursor: 'pointer'
    },
    close: {
        color: 'red',
        paddingTop: 20,
        marginLeft: 10,
        cursor: 'pointer'
    },
    loading: {
        marginLeft: 10,
        marginTop: 5
    },
    loadDisplay: {
        marginTop: 5,
        marginLeft: 5
    }
}));

export function Profile(props) {
    const classes = useStyles();
    const created = new Date(props.user.createdAt);

    const [displayState, setDisplayState] = useState('display');
    const [currentDisplayName, setCurrentDisplayName] = useState(props.user.displayName);

    const updateDisplayName = () => {
        setDisplayState('loading');
        const data = {
            display: currentDisplayName
        };
        serverCall('user/display', data)
        .then(result => {
            const newUser = props.user;
            newUser.displayName = currentDisplayName;
            props.setDisplayName(currentDisplayName);
            try {
                const userString = JSON.stringify(newUser);
                window.localStorage.setItem('user', userString);
            }
            catch(e) {
                console.log(e);
            }
            setDisplayState('display');
        })
        .catch(error => {
            console.log(error);
            setDisplayState('display');
        })
    }

    const updateKeyDown = (e) => {
        if (e.key === 'Enter') {
            updateDisplayName();
        }
    }

    const displayName = () => {
        switch(displayState) {
            case 'display': 
                return (
                    <div className={classes.displayName}>
                        <Typography variant="body1">Display Name: {props.user.displayName}</Typography>
                        <Edit className={classes.edit} onClick={() => {setDisplayState('edit')}} />
                    </div>
                )
            case 'edit':
                return (
                    <div className={classes.displayName}>
                        <TextField id="displayName" label="Edit Display Name" value={currentDisplayName} autoFocus onChange={(e) => {setCurrentDisplayName(e.target.value)}} onKeyDown={updateKeyDown} />
                        <Check className={classes.check} onClick={() => updateDisplayName()} />
                        <Close className={classes.close} onClick={() => setDisplayState('display')} />
                    </div>
                )
            case 'loading':
                return (
                    <div className={classes.displayName}>
                        <Typography variant="h6">Updating Display Name: </Typography>
                        <Typography variant="body1" className={classes.loadDisplay}>{currentDisplayName}</Typography>
                        <CircularProgress className={classes.loading} color="primary" size={20} />
                    </div>
                )
            default: 
                return (
                    <Typography variant="body1">{props.user.displayName}</Typography>
                )
        }
    }

    const userDisplay = (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h5">{props.user.name}</Typography>
            </Grid>
            <Grid item xs={12}>
                {displayName()}
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
    setDisplayName: (displayName) => dispatch(setDisplayName(displayName)),
    setAvatar: (avatar) => dispatch(setAvatar(avatar))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);