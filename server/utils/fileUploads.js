import fs from 'fs'
import path from 'path';

import cloudinary from 'cloudinary'
const generateUniqueId = require('generate-unique-id');

export const uploadToLocal = ({ stream, filename, mimetype, encoding}) => {
     return new Promise((resolve, reject) => {
         const id = generateUniqueId();
         const localPath = path.resolve(__dirname, '../uploads', id);

         stream.pipe(fs.createWriteStream(localPath))
         .on('finish',() => {
             resolve({
                 message: "file uploaded locally",
                 filename: id,
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
export const uploadToCloudinary = async (stream, folder, imagePublicId) => {
    // if imagePublicId param is presented we should overwrite the image
    const options = imagePublicId ? { public_id: imagePublicId, overwrite: true } : { public_id: `${folder}/${uuid()}` };
  
    return new Promise((resolve, reject) => {
      const streamLoad = cloudinary.v2.uploader.upload_stream(options, (error, result) => {
        if (result) {
          resolve(result);
          console.log(resut);
        } else {
          reject(error);
        }
      });
  
      stream.pipe(streamLoad);
    });
  };


export const deleteFromCloudinary = async(imagePublicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.destroy(imagePublicId, (result, err)=>{
            if(result) resolve(result)
            else reject(err)
        })
    })
}


// uploader.upload
// uploader.upload_stream for stream upload

// basically cloudinary generates a public_id for each resource
// but we want to specify ours in case our client doesn't provide one

// our cloudinary write stream
// stream = createReadStream() // read stream