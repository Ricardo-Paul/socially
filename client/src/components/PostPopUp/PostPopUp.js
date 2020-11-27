import React, { Fragment } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Paper } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons';
import { List, ListItem, ListItemAvatar, ListItemText, Typography, Divider, ClickAwayListener } from '@material-ui/core';

const PostStyles = makeStyles({
    root:{
        zIndex: 900,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        position: "absolute",
        width: "30%"
    },
    media:{
        height: 500,
        objectFit: "cover"
    },
});

const PostPopUp = ({ closeModal, postImage }) => {
    const i = "https://res.cloudinary.com/socially/image/upload/v1604363431/samples/bike.jpg"
    const src="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"

    const classes = PostStyles();
    return(
        <ClickAwayListener onClickAway={closeModal}>
<Card className={classes.root}>
            <CardHeader
            avatar={
                <Avatar>
                    A
                </Avatar>
            }
            action={
                <IconButton>
                 <MoreVert />
                </IconButton>
            }
            title={'Alex Xavier'}
            subheader={'1 hour ago'}
            />
            <CardContent> Content goes here </CardContent>
            <CardMedia className={classes.media} image={postImage} title={'post picture'} />
            <Paper className={classes.paper}>
                <List>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt="user avatar" src={i} />
                        </ListItemAvatar>
                        <ListItemText 
                        primary={"Ali Conner"}
                        secondary={
                            <Fragment>
                                <Typography
                                component="span"
                                variant="body2"
                                >
                                    2 days ago
                                </Typography>
                                {'- That is perfectly accurate'}
                            </Fragment>
                        }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </List>
            </Paper>
        </Card>
        </ClickAwayListener>
    )
}

export default PostPopUp;

PostPopUp.propTypes = {
    closeModal: PropTypes.func.isRequired
}