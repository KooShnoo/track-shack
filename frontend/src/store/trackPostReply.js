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
          return await jwtFetch(`/api/trackPosts/${trackPostId}/reply`, {method: 'POST', body: JSON.stringify(trackPostReply)});
      } catch (error){
        //   return null;
        let response = await error.json()
        console.log(response)
      }})();
  if (!res) return null;
  /** @type {import('../../../backend/src/models/TrackPost').TpReplyResponseForUpload | {error: string}} */
  const response = await res.json()
  if ('error' in response) return null;
  await Promise.all([
      awsUploadFile(response.audioMasterUploadURL, master),
      awsUploadFile(response.audioStemsUploadURL, stems),
      // soba.albumArtUploadURL && albumpic && awsUploadFile(soba.albumArtUploadURL, albumpic),
  ]);
  return response.trackPostReply 
}

