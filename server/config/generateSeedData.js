const _ = require('lodash');
const faker = require('faker');


const imageNames = ['bike.jpg', 'dessert.jpg', 'imagecon-group.jpg', 'sheep.jpg'];


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

            let random = _.sample(imageNames); //choose a random name
            let image = `/home/ricardo/Desktop/MongoDB/socially/server/uploads/${random}`; //retrieve it from
            let imagePublicId = random; // in a normal situation the id is unique

            const newPost = {
                title: faker.lorem.words(9),
                author: _.sample(users)._id, //select a random user
                image: image,
                imagePublicId: imagePublicId
            }
            posts.push(newPost)
        }
        return posts;
    }

}
export default seed;
// 