import React from "react";
import { Box, IconButton, makeStyles, Typography } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import { UPLOAD_USER_PHOTO } from "../../graphql/user";
import { useApolloClient } from "@apollo/client";
import { useStore } from "../../store";

const ProfileStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: 10
    },
    image: {
        width: 200,
        height: 200,
        marginTop: -100,
        borderRadius: "50%",
        border: "7px solid #ffffff"
    },
    info: {
        display: "flex",
        width: 600,
        justifyContent: "space-between"
    },
    imgContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        position: "relative"
    },
    uploadIcon: {
        backgroundColor: "#2896e4",
        position: "absolute",
        color: "#fbfbfb",
        right: 0,
        bottom: 0
    }
}))

const ProfileInfo = () => {
    const avatar = "https://material-ui.com/static/images/avatar/2.jpg";
    const classes = ProfileStyles();
    const inputRef = React.useRef(null);
    const [image, setImage] = React.useState("");
    const client = useApolloClient();
    const [{auth}] = useStore();

    const handleIconClick = () => inputRef.current.click();
        
    const handleFileChange = async (e) => {
        const image = e.target.files[0];
        if(!image) return;
        try{
            const { data } = await client.mutate({
                mutation: UPLOAD_USER_PHOTO,
                variables:{
                    input: {
                        userId: auth.user.id,
                        image: image,
                        isCover: false,
                        imagePublicId: "userphoto"
                    }
                }
            });
            console.log(data);
        }catch(err){
            console.log(err)
        }
    }

    return(
        <Box className={classes.root}>
            <Box className={classes.imgContainer}>
                <img 
                src={auth.user.image} 
                className={classes.image}
                />
                <input 
                accept="image/x-png,image/jpeg"
                ref={inputRef} 
                type="file" 
                style={{display:"none"}}
                onChange={handleFileChange}
                />
                <IconButton 
                className={classes.uploadIcon}
                onClick={handleIconClick}
                >
                    <PhotoCamera />
                </IconButton>
            </Box>
            <Box>
                <h1 style={{textAlign: "center"}} > Alex Xavier </h1>
                <Box className={classes.info}>
                    <Typography> Posts </Typography>
                    <Typography> Following </Typography>
                    <Typography> Followers </Typography>
                </Box>
            </Box>
        </Box>
    )
}

export default ProfileInfo;