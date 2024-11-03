import AWS from "aws-sdk";
import { v4 as uuid } from "uuid";
import "dotenv/config";

const { S3 } = AWS;
const s3 = new S3({
  region: process.env.AWS_REGION || "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const AWS_S3_BUCKET = process.env.AWS_BUCKET_NAME || "demo-nest";

export const uploadFile = async (file) => {
  const { originalname, buffer, mimetype } = file;

  const uniqueFileName = `${uuid()}-${originalname}`;

  const params = {
    Bucket: AWS_S3_BUCKET,
    Key: uniqueFileName,
    Body: buffer,
    ACL: "public-read",
    ContentType: mimetype,
    ContentDisposition: "inline",
  };

  try {
    const s3Response = await s3.upload(params).promise();
    return s3Response.Location;
  } catch (error) {
    console.error("Помилка при завантаженні файлу на S3:", error);
    throw new Error("Не вдалося завантажити файл");
  }
};
