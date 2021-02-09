import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    container: {
        marginBottom: 4
    },
    content: {
        display: 'flex'
    },
    name: {
        marginLeft: 8,
        paddingTop: 4
    }
}))

export default function OnlineUser(props) {
    const classes = useStyles();

    return (
        <Grid item xs={12} className={classes.containers}>
            <Card>
                <CardContent className={classes.content}>
                    <Avatar alt={props.displayName} src={`images/avatars/${props.avatar}`} />
                    <Typography className={classes.name} variant="h6">{props.displayName}</Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}