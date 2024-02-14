import { useState } from "react";
import { postTrackReply } from "../../store/trackPostReply";
import { receiveAudioReply } from "../../store/trackPost";
import { useDispatch } from "react-redux";
import './audioResponseForm.css'

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
      console.log(error)
    }
  };

  return (
    <div className="createPage">
      <div className="TrackPostCreateContainer">
        <div id="create-response-header">
          <h1>Create an Audio Response!</h1>
          <h2 className="description">Whats an Audio Respone? It&apos;s a contribution to this project that you&apos;d like to make! Are you a drummer? Upload some drums? A singer? You know what to do!</h2>
          <button id="audio-response-button" type="submit" onClick={handleSubmit}>
            Upload Audio
          </button>
        </div>
        <p className="label">Description</p>
        <p className="descriptor">(Describe what your audio reply entails)</p>
        <div className="inputContainer description">
          <textarea
            className="track-input"
            id="description"
            rows="4"
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
