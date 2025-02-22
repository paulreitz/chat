import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
    card: {
        marginBottom: 15
    },
    cardOther: {
        marginBottom: 15,
        backgroundColor: theme.palette.grey['300']
    },
    header: {
        padding: 5
    },
    avatar: {
        width: theme.spacing(3),
        height: theme.spacing(3)
    }
}));

export default function Message(props) {
    const classes = useStyles();

    const right = props.userKey === props.senderKey;

    return (
        <Grid item xs={12}>
            <Grid container justify={right? 'flex-end' : 'flex-start'}>
                <Grid item>
                    <Card className={right? classes.card : classes.cardOther}>
                        <CardHeader
                            className={classes.header}
                            avatar={<Avatar className={classes.avatar} src={`images/avatars/${props.avatar}`} />}
                            title={props.displayName}
                        />
                        <CardContent>
                            <Typography variant="body1">{props.message}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
}