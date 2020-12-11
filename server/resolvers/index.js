import userResolver from './userResolver'; //basically we are importing Query and Mutation
import postResolver from './postResolver';
import commentResolver from './commentResolver';
import likeResolver from './likeResolver';

import followResolver from './followResolver';
import notiResolver from './notiResolver';
import messageResolver from './messageResolver';

export default [userResolver, postResolver, commentResolver, likeResolver, followResolver, notiResolver, messageResolver];
