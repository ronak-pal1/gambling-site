import { DeleteObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: process.env.AWS_REGION });

const deleteS3File = async (URL: string) => {
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: URL.split(`s3.${process.env.AWS_REGION}.amazonaws.com/`).pop(),
  };

  try {
    const data = await s3.send(new DeleteObjectCommand(params));

    console.log("The file is deleted");
    return data;
  } catch (e) {
    console.log("Error in deleting the file", e);
    return null;
  }
};

export default deleteS3File;
