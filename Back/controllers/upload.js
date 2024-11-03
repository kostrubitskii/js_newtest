import AWS from 'aws-sdk';
import multer from 'multer';
import "dotenv/config";

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

export const uploadImage = upload.array('images', 5);
export const updateHero = upload.none();
