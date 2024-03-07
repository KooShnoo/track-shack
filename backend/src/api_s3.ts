import { fromEnv } from "@aws-sdk/credential-providers";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { RequestHandler } from "express";
import { ITrackPostSchema } from "./models/TrackPost.ts";
import { serverLogger } from "./loggers.ts";

const REGION = 'us-east-1';
const BUCKET = 'track-shack';
const client = new S3Client({credentials: fromEnv(), region: REGION});

/**
 * gets a presigned url to upload a file to s3. 
 * 
 * to use, make a `PUT` request to the returned url with the file as the body.
 * @param filename name to be stored as the `key` in s3. length must be under 512.
 * @returns presigned url to be uploaded to
 */
export async function getUploadUrl(filename: string) {
  if (filename.length > 512) return null;
  const putCommand = new PutObjectCommand({Bucket: BUCKET, Key: filename});
  const url = await getSignedUrl(client, putCommand);
  return url;
}

/** gets a presigned url for a file from s3. */
export async function getFileUrl(filename: string) {
  const getCommand = new GetObjectCommand({
    Bucket: BUCKET, 
    Key: filename, 
    ResponseContentDisposition: `attachment; filename="${filename}"`,
});
  const url = await getSignedUrl(client, getCommand);
  return url;
}


/** gets a presigned url for a file from s3. */
export async function deleteFile(filename: string) {
  try {
    const deleteCommand = new DeleteObjectCommand({Bucket: BUCKET, Key: filename});
    await client.send(deleteCommand);
    return;
  } catch(err) {
    return err;
  }
}

const makeUniqueFilename = (filename: string) => `${new Date().toISOString()}_${crypto.randomUUID()}_${filename}`;

export const ensureUniqueTrackPostFilenames: RequestHandler = (req, res, next) => {
  try {
    const tp: ITrackPostSchema = req.body;
    if (tp.audioMasterSrc) tp.audioMasterSrc = makeUniqueFilename(tp.audioMasterSrc);
    if (tp.audioStemsSrc) tp.audioStemsSrc = makeUniqueFilename(tp.audioStemsSrc);
    if (tp.albumArtSrc) tp.albumArtSrc = makeUniqueFilename(tp.albumArtSrc);
    return next();
  } catch (e) {
    return res.status(422).json(e);
  }
};

export const ensureUniquePFPFilename: RequestHandler = (req, res, next) => {
  try {
    req.body.pfp_filename = makeUniqueFilename(req.body.pfp_filename);
    return next();
  } catch (e) {
    return res.status(422).json(e);
  }
};
