import userResolver from './userResolver'; //basically we are importing Query and Mutation
import postResolver from './postResolver';
import commentResolver from './commentResolver';


export default [
    userResolver,
    postResolver,
    commentResolver
]

