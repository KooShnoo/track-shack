import { useState } from "react";

import { postTrackReply } from "../../store/trackPostReply";
import { receiveAudioReply } from "../../store/trackPost";
import { useDispatch } from "react-redux";

const AudioResponseForm = ({trackId, setShowForm}) => {
  const [description, setDescription] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [stems, setStems] = useState(null);
  const dispatch = useDispatch()


  const handleSubmit = async () => {
    try {
        const audioResponse = await postTrackReply(trackId,
          {
            description,
            audioMasterSrc: audioFile.name,
            audioStemsSrc: stems.name,
          },
          audioFile,
          stems
        );
        if(audioResponse) {
          dispatch(receiveAudioReply([audioResponse, trackId]))
          setDescription('')
          setAudioFile(null)
          setStems(null)
          setShowForm('')
        }

    } catch (error) {

    }
  };

  return (
    <div className="createPage">
      <div className="TrackPostCreateContainer">
        <div id="create-form-header">
          <h1>Create an Audio Response!</h1>
          <button type="submit" onClick={handleSubmit}>
            Create Audio Response
          </button>
        </div>
        <p className="label">Description</p>
        <p className="descriptor">(Describe what your audio reply entails)</p>
        <div className="inputContainer description">
          <textarea
            className="track-input"
            id="description"
            rows="4"
            cols="100"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="inputs">
          <div className="file-input-container">
            <div className="master">
              <label className="audio-label" htmlFor="audioFile">
                <p>Upload Master</p>
                <input
                  className="track-input-file"
                  type="file"
                  id="audioFile"
                  onChange={(e) => setAudioFile(e.target.files[0])}
                />
              </label>
            </div>
          </div>
          <div className="file-input-container">
            <div className="stems">
              <label className="audio-label" htmlFor="stems">
                <p>Upload Stems</p>
                <input
                  className="track-input-file"
                  type="file"
                  id="stems"
                  onChange={(e) => setStems(e.target.files[0])}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioResponseForm;
