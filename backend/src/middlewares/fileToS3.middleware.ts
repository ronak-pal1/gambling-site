import { NextFunction, Request, Response } from "express";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import asyncHandler from "../utils/asyncHandler";
import deleteS3File from "../utils/deleteS3File";

const s3 = new S3Client({ region: process.env.AWS_REGION });

export enum S3PATHS {
  "QR" = "qr-codes",
  "PLAYER_IMG" = "player-images",
  "TEAM_IMG" = "team-images",
}

export const fileToS3 = (path: S3PATHS) => {
  return asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      if (req.file) {
        // now once the file is loaded on the server we will upload it to aws s3
        const filePath: string = req.file.path;
        const fileContent = fs.readFileSync(filePath);
        const previousURL: string = req.body.previousURL;
        const contentType = "application/png";

        try {
          if (previousURL) {
            const deleteResponse = await deleteS3File(previousURL);
          }

          const data = await s3.send(
            new PutObjectCommand({
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: `${path}/${req.file.filename}`,
              Body: fileContent,
              ContentType: contentType,
            })
          );
          const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${path}/${req.file.filename}`;

          // Deleting the file from local storage
          fs.unlink(filePath, (err) => {
            if (err) console.log("Error in deleting the file", err);
          });

          req.fileURL = url;
          next();
        } catch (e) {
          console.log("Error while uploading to s3", e);
          res.status(400).send("Error while uploading");
        }
      } else {
        res.status(400).send("No file uploaded");
      }
    }
  );
};
