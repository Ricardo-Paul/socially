import { Box, IconButton, makeStyles } from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";
import React from "react";
import { useStore } from "../../store";
import defaultCover from "./background2.jpg";

const CoverStyles = makeStyles((theme) => ({
  background: {
    height: 210,
    width: "100%",
    backgroundImage: `url(${defaultCover})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  uploadIcon: {
    borderRadius: 1,
    marginTop: 5,
    marginLeft: 5,
    backgroundColor: "#2896e4",
    color: "#fbfbfb",
  },
}));

const CoverPhotoUpload = ({ user }) => {
  const classes = CoverStyles();
  const inputEl = React.useRef(null);
  const [{ auth }] = useStore();
  const isAuthUser = user.username === auth.user.username;

  const handleIconClick = () => {
    inputEl.current.click();
  };

  return (
    <Box className={classes.background}>
      <input
        style={{ display: "none" }}
        ref={inputEl}
        type="file"
        accept="image/x-png,image/jpeg"
        id="cover-image"
      />

      <label>
        {isAuthUser && (
          <IconButton className={classes.uploadIcon} onClick={handleIconClick}>
            <PhotoCamera />
          </IconButton>
        )}
      </label>
    </Box>
  );
};

export default CoverPhotoUpload;
