import AWS from "aws-sdk";

// Function to create a new S3 client
const createS3Client = () => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
  return new AWS.S3();
};

declare const globalThis: {
  s3Global: ReturnType<typeof createS3Client>;
} & typeof global;

// Use an existing S3 client if it exists, otherwise create a new one
const s3 = globalThis.s3Global ?? createS3Client();

export default s3;

// Optionally, in development, ensure the same S3 client is reused
if (process.env.NODE_ENV !== "production") {
  globalThis.s3Global = s3;
}
