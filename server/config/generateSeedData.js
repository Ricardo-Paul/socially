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
}
export default seed;