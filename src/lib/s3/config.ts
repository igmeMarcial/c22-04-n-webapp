import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const S3_CONFIG = {
  allowedFileTypes: [
    "image/jpeg",
    "image/png",
    "video/mp4",
    "video/quicktime"
  ],
  maxFileSize: 1073741824, // 1GB
  urlExpirationSeconds: 60,
};