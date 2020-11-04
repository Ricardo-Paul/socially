const _ = require('lodash');
const faker = require('faker');

const seed = {
    genereateDummyUsers: function(){
        let users = [];
        for( let i=0; i<10; i++ ){
            const newUser = {
                fullName: faker.fake("{{name.firstName}} {{name.lastName}}"),
                email: faker.internet.email(),
                username: faker.internet.userName(),
                password:"fakeuser00"
            }
            users.push(newUser);
        }
        return users;
    },

    generateDummyPosts: function(users){
        let posts = []
        for(let i=0; i<15; i++){
            const newPost = {
                title: faker.lorem.words(9),
                author: _.sample(users)._id
            }
            posts.push(newPost)
        }
        return posts;
    }

}
export default seed;