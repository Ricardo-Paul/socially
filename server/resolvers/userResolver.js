import models from '../models';

const Query = {

}

const Mutation = {
    signup: async (root, { input: { fullName, email }}, { User }) => {
        try{
            // const User = models.User;
            const createdUser = new User({
                fullName,
                email
            }).save()
            return createdUser;
        } catch(err) {
            console.error(err)
        }
    }
}

export default {
    Query,
    Mutation
}