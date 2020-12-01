import { useApolloClient } from '@apollo/client';
import { CREATE_NOTIFICATION, DELETE_NOTIFICATION } from '../graphql/notification';
import { useStore } from '../store';

const useNotification = () => {
    const client = useApolloClient();
    const [{auth}] = useStore();

    /**
     * helper function that helps execute delete and create operation
     * 
     * @param {string} mutation mutation name
     * @param {object} variables variables for the mutaion
     */
    const mutate = async (mutation, variables) => {
        try{
            await client.mutate({
                mutation,
                variables:{
                    input: { ...variables }
                }
            });
        } catch(err){
            console.log(err)
        };
    }

    /**
     * we'll just need to pass our variables object to create
     * @param {object} param0 
     */
    const create = async ({senderId, receiverId, postId, notificationType, notificationTypeId}) => {
        try{
            await mutate(CREATE_NOTIFICATION,{
                senderId: auth.user.id,
                receiverId,
                postId,
                notificationType,
                notificationTypeId
            });
        } catch(err){
            console.log(err)
        }
    }

    const remove = async({ notificationId }) => {
        return mutate(DELETE_NOTIFICATION, {
            notificationId
        })
    }

    return { create, remove }
}