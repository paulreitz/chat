import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';
import Check from '@material-ui/icons/Check';
import Block from '@material-ui/icons/Block';

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
    registerContainer: {
        borderRight: '1px solid black'
    },
    form: {
        width: 300,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    title: {
        textAlign: 'center',
        marginBottom: 15
    },
    field: {
        marginBottom: 10,
        paddingLeft: 24
    },
    check: {
        color: 'green',
        paddingTop: 10,
        paddingLeft: 10
    },
    block: {
        paddingTop: 10,
        paddingLeft: 10
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dialog: {
        backgroundColor: 'white',
        textAlign: 'center',
        padding: '36px 54px',
        borderRadius: 15
    },
    dialogText: {
        marginBottom: 24
    }
}));

export default function Landing(props) {
    const classes = useStyles();

    const [registerUserName, setRegisterUserName] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerVerify, setRegisterVerify] = useState('');
    const [registerCode, setRegisterCode] = useState('');
    const [verified, setVerified] = useState(false);

    const [loginUserName, setLoginUserName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');

    const verify = (a, b) => {
        setVerified(a && a === b);
    }

    const doRegister = () => {
        if (verified && registerUserName && registerCode) {
            setLoadingMessage('Registering, please wait...');
            setLoading(true);
        }
    }

    const doLogin = () => {
        if (loginUserName && loginPassword) {
            setLoadingMessage('Loging in...');
            setLoading(true);
        }
    }

    const register = (
        <div className={classes.form}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5" className={classes.title}>Register</Typography>
                </Grid>
                <Grid item xs={12} className={classes.field}>
                    <TextField id="name" label="User Name" onChange={(e) => setRegisterUserName(e.target.value)} />
                </Grid>
                <Grid item xs={12} className={classes.field}>
                    <TextField id="password" label="Password" type="password" onChange={(e) => {setRegisterPassword(e.target.value); verify(e.target.value, registerVerify);}} />
                </Grid>
                <Grid item xs={12} className={classes.field}>
                    <TextField id="verify" label="Verify Password" type="password" onChange={(e) => {setRegisterVerify(e.target.value); verify(registerPassword, e.target.value);}} />
                    {
                        verified 
                        ? (<Check className={classes.check} />)
                        : (<Block color="error" className={classes.block} />)
                    }
                </Grid>
                <Grid item xs={12} className={classes.field}>
                    <TextField id="code" label="Activation Code" onChange={(e) => {setRegisterCode(e.target.value)}} />
                </Grid>
                <Grid item xs={12} className={classes.field}>
                    <Button variant="contained" color="primary" onClick={doRegister}>Register</Button>
                </Grid>
            </Grid>
        </div>
    );

    const login = (
        <div className={classes.form}>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5" className={classes.title}>Login</Typography>
                </Grid>
                <Grid item xs={12} className={classes.field}>
                    <TextField id="lname" label="User Name" onChange={(e) => {setLoginUserName(e.target.value)}} />
                </Grid>
                <Grid item xs={12} className={classes.field}>
                    <TextField id="lpassword" label="Passwrod" onChange={(e) => {setLoginPassword(e.target.value)}} />
                </Grid>
                <Grid item xs={12} className={classes.field}>
                    <Button variant="contained" color="primary" onClick={doLogin}>Login</Button>
                </Grid>
            </Grid>
        </div>
    )

    return (
        <React.Fragment>
            <div className={classes.container}>
                <Grid container>
                    <Grid item xs={12} sm={6} className={classes.registerContainer}>
                        {register}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        {login}
                    </Grid>
                </Grid>
            </div>
            <Modal open={loading} className={classes.modal}>
                <div className={classes.dialog}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h5" className={classes.dialogText}>{loadingMessage}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <CircularProgress />
                        </Grid>
                    </Grid>
                </div>
            </Modal>
        </React.Fragment>
    )
}