import models from '../models';
const {  User, Post } = models;
import { users, posts } from './seedData';
import seed from './generateSeedData';

import mongoose from 'mongoose';
// const dotenv = require('dotenv').config();

const MONGO_URL = 'mongodb://127.0.0.1:27017'
const DB_NAME = process.env.DB_NAME;

(async () => {
    try{
        mongoose.connect(`${MONGO_URL}/${DB_NAME}`)
        .then(() => console.log(`Connected for seeding: ${DB_NAME}`));

        
        const userCount = await User.find().countDocuments();
        if(userCount > 10) return console.log(`Records are enough: DB hit > 10 users`);

        const customUser = await User.findOne({username:'ricky'});
        // erasing dummy data
        const namequery = { username: {$ne: customUser.username} };
        const count = await User.find(namequery).countDocuments();
        await User.deleteMany(namequery);
        console.log(`${count} Users deleted`);


        await Post.deleteMany({ author: { $ne: customUser._id } });
        console.log(`Posts Deleted`)


        // seeding users
        const users = seed.genereateDummyUsers();
        const seededUsers = await User.insertMany(users)
        console.log(`User seeded`)
        // console.log(`Dummy Users:: Number: ${seededUsers.length}`, seededUsers);


        // seeding posts
        const posts = seed.generateDummyPosts(seededUsers);
        const seededPosts = await Post.insertMany(posts);
        console.log(`Post Seeded`);
        // console.log(`seeded posts`, seededPosts)


    mongoose.connection.close();

    } catch(err){
        console.error(err)
    }
})();