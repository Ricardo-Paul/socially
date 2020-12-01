import { useApolloClient } from '@apollo/client';
import { CREATE_NOTIFICATION, DELETE_NOTIFICATION } from '../graphql/notification';
import { useStore } from '../store';

const useNotification = () => {
    const client = useApolloClient();
    const [{auth}] = useStore();

    /**
     * helper function that handles create or delete operation
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

     //notificationType: notificationTypeId //we send both key and value
    const create = async ({receiver, postId, notificationType, notificationTypeId}) => {
        try{
            await mutate(CREATE_NOTIFICATION,{
                senderId: auth.user.id, //the current user
                receiverId: receiver.id, // post author id
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

    const toggle = ({
        receiver,
        postId,
        notificationType,
        notificationTypeId,
        hasDone,
      }) => {
        const type = notificationType.toLowerCase();
        const isNotified = receiver.notifications.find(
          n => n[type] && hasDone && n[type].id === hasDone.id
        );
        const notificationId = isNotified ? isNotified.id : null;
        const operation = notificationId ? 'delete' : 'create';
        const options = {
          create: {
            mutation: CREATE_NOTIFICATION,
            variables: {
              senderId: auth.user.id,
              receiverId: receiver.id,
              postId,
              notificationType,
              notificationTypeId,
            },
          },
          delete: {
            mutation: DELETE_NOTIFICATION,
            variables: { notificationId: notificationId },
          },
        };

        return mutate(options[operation].mutation, options[operation].variables);
    }


    return { create, remove, toggle }
}

export default useNotification;

// ctrl h (search and replace)
// ctrh shift f (search in entire project)