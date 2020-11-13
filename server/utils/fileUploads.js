import fs from 'fs'
import path from 'path';

import cloudinary from 'cloudinary'
import { v4 as uuidv4 } from 'uuid';

const uploadToLocal = ({ stream, filename, mimetype, encoding}) => {
     return new Promise((resolve, reject) => {
         const localPath = path.resolve(__dirname, '../uploads', filename);

         stream.pipe(fs.createWriteStream(localPath))
         .on('finish',() => {
             resolve({
                 message: "file uploaded locally",
                 filename,
                 mimetype,
                 encoding,
                 localPath
             })
         })
         .on('error', (err)=>{
             reject(err)
         })
     })
};

/**
 * 
 * @param {string} filename filename will be resolved from the image promise
 */

const deleteFromLocal = ({ filename }) => {
    const filePath = path.resolve(__dirname, '../uploads', filename)
        fs.unlink(filename, (err) => {
            if(err) throw new Error(err)
            console.log(`file deleted`)
        });
}

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// public_id : image file name
const uploadToCloudinary = async (stream, folder, imagePublicId) => {

    // if client provides a public_id overwrite the default one
    // if no we generate one with uuid under a client chosen folder
    const options = imagePublicId? { public_id: imagePublicId, overwrite: true } :
    { public_id: `${folder}/${uuidv4()}`};

    // options only have the public_id value
     return new Promise((resolve, reject) => {
       const cloud_stream = cloudinary.v2.uploader.upload_stream(options, (result, error) => {
            if(result){
                console.log(result)
                resolve(result)
            } else {
                console.warn(error)
                reject(error)
            }
        });

        // piping our read stream to the cloud write stream
        stream.pipe(cloud_stream)

    });
};


const deleteFromCloudinary = async(imagePublicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.destroy(imagePublicId, (result, err)=>{
            if(result) resolve(result)
            else reject(err)
        })
    })
}

export default {
    uploadToCloudinary,
    deleteFromCloudinary
}

// uploader.upload
// uploader.upload_stream for stream upload

// basically cloudinary generates a public_id for each resource
// but we want to specify ours in case our client doesn't provide one

// our cloudinary write stream
// stream = createReadStream() // read stream