import models from '../models';

// Queries are GET/fetch requests
const Query = {

}

// Mutations are analogous to POST request
// they are meant to cause writes in the db
const Mutation = {
    signup: async (root, { input: { fullName, email } }) => {
        const User = models.User;
        const createdUser = new User({
            fullName,
            email
        }).save();
        console.log('User Added')
        return createdUser;
    }
}

export default {
    Query,
    Mutation
}