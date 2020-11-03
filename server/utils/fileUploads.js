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

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// public_id : image file name
const uploadToCloudinary = async (stream, folder, imagePublicId) => {

    // if client provide a public_id overwrite the default one
    // if no we generate one with uuid under a client chosen folder
    const options = imagePublicId? { public_id: imagePublicId, overwrite: true } :
    { public_id: `${folder}/${uuidv4()}`};


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

        // piping our read stream into the cloud write stream
        stream.pipe(cloud_stream)

    });
}

export default {
    uploadToLocal,
    uploadToCloudinary
}

// uploader.upload
// uploader.upload_stream for stream upload

// basically cloudinary generate a public_id for each resource
// but we want to specify ours in case our client doesn't provide

// our cloudinary write stream
// stream = createReadStream() // read stream