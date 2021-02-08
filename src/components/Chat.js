import React from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

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
        overflowY: 'scroll'

    }
}))


export default function Chat(props) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Grid container alignItems="stretch" className={classes.gridContainer}>
                <Grid item xs={10}>
                    <Box display="flex" p={1} flexDirection="column" height="100%">
                        <Box flexGrow={1} p={1} className={classes.chatDisplay}></Box>
                        <Box p={1} width="100%">
                            <Grid container justify="space-between" alignItems="center" spacing={3}>
                                <Grid item xs={10}>
                                    <TextField width="100%" variant="outlined"></TextField>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button variant="contained" color="primary">Send</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={2}>
                
                </Grid>
            </Grid>
        </div>
    )
}