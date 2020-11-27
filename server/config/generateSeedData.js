const _ = require('lodash');
const faker = require('faker');


const cloudImages = [
    "https://res.cloudinary.com/socially/image/upload/v1604363431/samples/bike.jpg",
    "https://res.cloudinary.com/socially/image/upload/v1604363429/samples/sheep.jpg",
    "https://res.cloudinary.com/socially/image/upload/v1604363439/samples/cloudinary-group.jpg",
    "https://res.cloudinary.com/socially/image/upload/v1604363435/samples/ecommerce/car-interior-design.jpg"
];


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

            let random = _.sample(cloudImages)

            const newPost = {
                title: faker.lorem.words(9),
                author: _.sample(users)._id, //select a random user
                image: random, //we set image and imagePublicId to the same value 
                imagePublicId: random
            }
            posts.push(newPost)
        }
        return posts;
    }

}
export default seed;
// 