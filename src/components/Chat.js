import React, { useState } from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

import OnlineUser from './OnlineUser';
import Message from './Message';

import ClientSocket from '../utils/clientsocket';
let socket = undefined;

const useStyles = makeStyles(theme => ({
    container: {
        width: 980,
        marginLeft: 'auto',
        marginRight: 'auto',
        height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`
    },
    gridContainer: {
        minHeight: '100%'
    },
    chatContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    chatDisplay: {
        overflow: 'hidden',
        overflowY: 'scroll'

    },
    chatBox: {
        width: '100%'
    }
}))


export function Chat(props) {
    if (!socket) {
        socket = new ClientSocket();
    }
    const classes = useStyles();

    const [message, setMessage] = useState('');

    const sendMessage = () => {
        if (message.trim() !== '') {
            socket.sendMessage(message);
            setMessage('');
        }
    }

    const sendMessageKeyDown = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    }
    console.log(props.messages.length)

    return (
        <div className={classes.container}>
            <Grid container alignItems="stretch" className={classes.gridContainer}>
                <Grid item xs={9}>
                    <Box display="flex" p={1} flexDirection="column" height="100%">
                        <Box flexGrow={1} p={1} className={classes.chatDisplay}>
                            <Grid container>
                                {
                                    props.messages.map((message, i) => {
                                        return (<Message key={`message_${i}`} {...message} userKey={props.userKey}/>)
                                    })
                                }
                            </Grid>
                        </Box>
                        <Box p={1} width="100%">
                            <Grid container justify="space-between" alignItems="center" spacing={3}>
                                <Grid item xs={10}>
                                    <TextField 
                                        className={classes.chatBox} 
                                        width="100%" 
                                        variant="outlined" 
                                        value={message} 
                                        autoFocus 
                                        onChange={(e) => {setMessage(e.target.value)}} 
                                        onKeyDown={sendMessageKeyDown}
                                    />
                                </Grid>
                                <Grid item xs={2}>
                                    <Button variant="contained" color="primary" onClick={sendMessage}>Send</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={3}>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">Online Users</Typography>
                            {props.online.map(online => (<OnlineUser key={online.senderKey} {...online}/>))}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = (state) => ({
    userKey: state.user.key,
    online: state.online,
    messages: state.messages
});

export default connect(mapStateToProps)(Chat);