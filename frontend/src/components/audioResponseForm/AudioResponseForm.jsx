import { useState } from "react";
import "./TrackPostCreate.css";
// import { useNavigate } from "react-router-dom";
// import { postTrack } from "../../store/trackPost";
import { postTrackReply } from "../../store/trackPostReply";
import { receiveAudioReply } from "../../store/trackPost";

const AudioResponseForm = () => {
  const [description, setDescription] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [stems, setStems] = useState(null);
  const dispatch = useDispatch()


  const handleSubmit = async () => {
    try {
        const audioResponse = await postTrackReply(
          {
            description,
            audioMasterSrc: audioFile.name,
            audioStemsSrc: stems.name,
          },
          audioFile,
          stems
        );
        if(audioResponse) {
          dispatch(receiveAudioReply(audioResponse))
        }

    } catch (error) {
        console.log('AUDIO RESPONSE', error)
    }
  };

  return (
    <div className="createPage">
      <div className="TrackPostCreateContainer">
        <div id="create-form-header">
          <h1>Create an Audio Response!</h1>
          <button type="submit" onClick={handleSubmit}>
            Create Track
          </button>
        </div>
        <p className="label">Title</p>
        <p className="descriptor">(Name the track headed for the shack!)</p>
        <div className="inputContainer">
        </div>
        <p className="label">SubTitle</p>
        <p className="descriptor">(Let us know what your project needs!)</p>
        <p className="label">Description</p>
        <p className="descriptor">(Tell us about your project!)</p>
        <div className="inputContainer description">
          <textarea
            className="track-input"
            id="description"
            rows="4"
            cols="100"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="inputDescriptions">
          <div className="file-descriptor">
            <p className="master-text">
              (Upload a version of your song for listeners and potential
              collaborators to hear)
            </p>
          </div>
          <div className="file-descriptor">
            <p className="stems-text">
              ( Upload your stems so collaborators can download them and use
              them to evolve the project. Don't forget to include a version of
              the master too)
            </p>
          </div>
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
            <div className="image">
              <label htmlFor="image" className="audio-label">
                <p>Upload Artwork</p>
                <input
                  type="file"
                  id="image"
                  className="track-input-file"
                  onChange={(e) => setImage(e.target.files[0])}
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
