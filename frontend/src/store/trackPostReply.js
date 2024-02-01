// @ts-check

import jwtFetch from './jwt';
import { awsUploadFile } from './trackPost';

/**
 * 
 * @param {number} trackPostId
 * @param {import('../../../backend/src/models/TrackPostReply').ITrackPostReplySchema} trackPostReply
 * @param {File} master 
 * @param {File} stems 
 */
export const postTrackReply = async (trackPostId, trackPostReply, master, stems) => { 
  const res = await (async () => {
      try {
          return await jwtFetch(`api/trackPosts/${trackPostId}`, {method: 'POST', body: JSON.stringify(trackPostReply)});
      } catch {
          return null;
      }})();
  if (!res) return null;
  /** @type {import('../../../backend/src/models/TrackPost').TpReplyResponseForUpload | {error: string}} */
  const soba = await res.json()
  if ('error' in soba) return null;
  await Promise.all([
      awsUploadFile(soba.audioMasterUploadURL, master),
      awsUploadFile(soba.audioStemsUploadURL, stems),
      // soba.albumArtUploadURL && albumpic && awsUploadFile(soba.albumArtUploadURL, albumpic),
  ]);
  return soba.id
}