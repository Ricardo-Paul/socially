import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Card, CardMedia, CardContent, Avatar, IconButton, Divider, Popper } from '@material-ui/core';
import { MoreVert, ThumbUpAlt, Comment } from '@material-ui/icons';
import CardHeader from '@material-ui/core/CardHeader';

import { shadows } from '../../utils/theme';
import PostCardOptions from './PostCardOptions';


const postCardStyles = makeStyles({
    card:{
        marginTop: 20,
        maxWidth: "100%",
        boxShadow: shadows.md
    },
    cardData:{
        display: "flex",
        justifyContent: "space-between",
        padding: 5
    },
    icons:{
        display: "flex",
        justifyContent: "space-between"
    },
    media: {
        height: 190,
        objectFit: "cover"
    }
})

const PostCard = () => {

    const classes = postCardStyles();
    const src="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
    const avatar = "https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    // if anchorEl has any value set it to null
    // otherwise add the event currentTarget to it
    const handleClick  = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    }
    
    return(
        <>
        <Popper open={open} anchorEl={anchorEl} placement="bottom-end">
          <PostCardOptions />
        </Popper>

        <Card className={classes.card}>
            <CardHeader className={classes.header}
                avatar={<Avatar alt="user photo" src={avatar} />}
                title={'Ricardo Paul'}
                action={
                    <IconButton onClick={handleClick}>
                        <MoreVert />
                    </IconButton>
                }
                subheader={'5 hours ago'}
            />
            <CardContent>
                some content for the card some content for the card
            </CardContent>
            <CardMedia className={classes.media} image={src} />
            <div className={classes.footer}>
                <div className={classes.cardData}>
                    <h5> 17 likes </h5>
                    <h5> 9 comments </h5>
                </div>
                <Divider />
                <div className={classes.icons}>
                    <IconButton>
                        <ThumbUpAlt />
                    </IconButton>
                    <IconButton>
                        <Comment />
                    </IconButton>
                </div>
            </div>
        </Card>
        </>
    )
}

export default PostCard