import React from "react";
import {
  MenuList,
  MenuItem,
  Paper,
  ClickAwayListener,
  Button,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { generatePath } from "react-router-dom";
import * as Routes from "../../routes";
import { useStore } from "../../store";
import { Delete, FileCopy, PersonAdd } from "@material-ui/icons";
import Follow from "../Follow";

const PostCardOptions = ({ closeMenu, postId, postAuthor, deletePost }) => {
  const [{ auth }] = useStore();

  const font = { fontSize: 12 };
  //TODO: REPLACE REACT_APP_CLIENT_URL when deployed,
  const copyUrl = () => {
    let absUrl = `${process.env.REACT_APP_CLIENT_URL}${generatePath(
      Routes.POST,
      {
        id: postId,
      }
    )}`;
    navigator.clipboard.writeText(absUrl);
    closeMenu();
  };

  // if the current user id matches the post author id
  const isUserPost = postAuthor.id === auth.user.id;

  return (
    <>
      <ClickAwayListener onClickAway={closeMenu}>
        <Paper elevation={3}>
          {/* <MenuList> */}
            <Button style={font} onClick={copyUrl}>
              {" "}
              <FileCopy style={{marginRight: 10}} />
              Copy URL
            </Button>
            {isUserPost && (
              <Button style={font} onClick={deletePost}>
                {" "}
                <Delete style={{marginRight: 10}} />
                Delete
              </Button>
            )}
            {!isUserPost && 
            // <Button style={font}> 
            //  {/* <PersonAdd style={{marginRight: 10}} /> */}
               <Follow user={postAuthor} />
            // </Button>
            }
          {/* </MenuList> */}
        </Paper>
      </ClickAwayListener>
    </>
  );
};

export default PostCardOptions;

PostCardOptions.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  postAuthor: PropTypes.object.isRequired, // author of the post (postAuthor)
  deletePost: PropTypes.func.isRequired,
};
