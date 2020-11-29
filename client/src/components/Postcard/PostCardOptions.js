import React from "react";
import { MenuList, MenuItem, Paper, ClickAwayListener, Typography } from "@material-ui/core";
import PropTypes from 'prop-types';
import { generatePath } from 'react-router-dom';
import * as Routes from '../../routes';
import { useStore } from '../../store';
import { DELETE_POST } from '../../graphql/post';
import { GET_AUTH_USER } from '../../graphql/user';
import { GET_FOLLOWED_POSTS } from '../../graphql/post';
import { HOME_PAGE_POSTS_LIMIT } from '../../constants/DataLimit';

// accessing the client directly use this handy hook
import { useApolloClient } from '@apollo/client';



const PostCardOptions = ({ closeMenu, postId, postAuthor, imagePublicId }) => {
  const [{auth}] = useStore();
  const client = useApolloClient();
 
  const font={fontSize: 12}
  // REPLACE REACT_APP_CLIENT_URL when deployed,
  const copyUrl = () => {
    let absUrl = `${process.env.REACT_APP_CLIENT_URL}${generatePath(Routes.POST,{
      id: postId
    })}`
    navigator.clipboard.writeText(absUrl);
    closeMenu();
  };

  // if the current user id matches the post author id
  const isUserPost = postAuthor.id === auth.user.id
  const deletePost = async () => {
    console.log(postAuthor.id, auth.user.id);
    try{
      await client.mutate({
        mutation: DELETE_POST,
        variables: { input: { id: postId, imagePublicId}}
      },{ refetchQueries:[
        {query: GET_AUTH_USER},
        {query: GET_FOLLOWED_POSTS, variables:{ userId: auth.user.id, skip: 0, limit: HOME_PAGE_POSTS_LIMIT }},

      ] })
    }catch(err){
      console.log(err)
    }
  }

  

  return (
    <>
    <ClickAwayListener onClickAway={closeMenu}>
    <Paper elevation={3}>
        <MenuList>
          <MenuItem style={font} onClick={copyUrl}> Copy URL </MenuItem>
          { isUserPost && <MenuItem style={font} onClick={deletePost}> Delete </MenuItem>}
          { !isUserPost && <MenuItem style={font}> Follow </MenuItem> }
        </MenuList>
      </Paper>
    </ClickAwayListener>
    </>
  );
};

export default PostCardOptions;

PostCardOptions.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  postAuthor: PropTypes.string.isRequired, // author of the post (postAuthor)
  imagePublicId: PropTypes.string.isRequired // used to delete the image associated to a post
}