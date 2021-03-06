import React, { Fragment } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_POSTS } from "../../graphql/user";
import PropTypes from "prop-types"
import { USER_PAGE_POSTS_LIMIT } from "../../constants/DataLimit";
// import InfiniteScrolling from './../../components';
import PostCard from "../../components/Postcard/PostCard";
import InfiniteScrolling from "../../components/InfiniteScrolling";
import PostSkeleton from "../../components/PostSkeleton";
import AppDialog from "../../components/AppDialog";
import PostPopUp from "../../components/PostPopUp";

const ProfilePosts = ({ username }) => {
  const [postId, setPostId] = React.useState(null);
  const openModal = (postId) => setPostId(postId);
  const closeModal = () => setPostId(null);

const variables = { username, limit: USER_PAGE_POSTS_LIMIT };

const { data, loading, networkStatus, fetchMore } = useQuery(GET_USER_POSTS, {
    notifyOnNetworkStatusChange: true,
    variables
});

if(loading &&  networkStatus === 1) return <PostSkeleton />

const { posts, count } = data.getUserPosts;

return(
    <InfiniteScrolling 
    data={posts}
    fetchMore={fetchMore}
    count={parseInt(count, 10)}
    variables={variables}
    dataKey="getUserPosts.posts"
    >
        {
            (data) => {
                const showNextLoading = data.length !== count && loading && networkStatus === 3;
                return(
                    <Fragment>
                        {
                        data.map(post => (
                            <Fragment>
                              <AppDialog open={postId === post.id} onClose={closeModal}>
                                <PostPopUp id={post.id} closeModal={closeModal} />
                              </AppDialog> 

                              <PostCard
                                title={post.title}
                                image={post.image}
                                fullName={post.author.fullName}
                                username={post.author.username}
                                avatar={post.author.image}
                                openModal={() => openModal(post.id)} //save the post.id in a state var
                                likeNumber={post.likes.length}
                                commentNumber={post.comments.length}
                                likes={post.likes}
                                postId={post.id}
                                postAuthor={post.author}
                                imagePublicId={post.imagePublicId}
                                comments={post.comments}
                              />
                            </Fragment>
                            ))
                        }
                    { showNextLoading && <h3> Loading... </h3> }
                    </Fragment>
                )
            }
        }
    </InfiniteScrolling>
)
};


ProfilePosts.propTypes = {
username: PropTypes.string.isRequired
}

export default ProfilePosts;