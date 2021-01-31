import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    image_container: {
        width: "100%",
        position: "relative",
        cursor: "pointer"
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: "scale(1)",
        transition: "0.3s"
    },
    image_overlay: {
      width: "100%",
      height: "100%",
      backgroundColor: "#0000005e",
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      cursor: "pointer",

      fontSize: "1.2rem",
      display: "flex",
      color: "white",
      justifyContent: "center",
      alignItems: "center",
      opacity: 0,
      "&:hover":{
        opacity: 1,
      }
    }
}))

const Image = ({ image }) => {
  const imageRef = React.useRef(null);
  const classes = useStyles();
  function handleMouseOver(){
    imageRef.current.style.transform = "scale(0.9)"
  }
  function handleMouseOut(){
    imageRef.current.style.transform = "scale(1)"
  }
  return(
    <Box className={classes.image_container}>
      <img ref={imageRef} alt="image" src={image} className={classes.image} />
      <Box className={classes.image_overlay} onMouseOut={handleMouseOut} onMouseOver={handleMouseOver} >
        View Post
      </Box>
    </Box>
  )
};

export default Image;
