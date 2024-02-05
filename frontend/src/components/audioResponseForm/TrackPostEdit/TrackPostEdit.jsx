import { useEffect, useState } from "react";
import "../../TrackPostCreate/TrackPostCreate.css";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import { postTrack } from "../../store/trackPost";

const TrackPostEdit = ({ onClose }) => {
  const { trackId } = useParams();
  const track = useSelector((state) => state.trackPosts[trackId]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [stems, setStems] = useState(null);
  const [image, setImage] = useState(null);
  const [toggleForm, setToggleForm] = useState(true);

  useEffect(() => {
    if (track) {
      setTitle(track.title);
      setSubtitle(track.subtitle);
      setDescription(track.description);
      setAudioFile(track.audioMasterSrc);
      setStems(track.audioStemsSrc);
      setImage(track.albumArtSrc);
    }
  }, [track]);

  const handleEditForm = () => {
    setToggleForm(!toggleForm);
    if (!toggleForm) {
      setTitle("");
      setSubtitle("");
      setDescription("");
      setAudioFile(null);
      setStems(null);
      setImage(null);
    }
    onClose();
  };

  const handleSubmit = async () => {
    // let trackPostId = await postTrack(
    //   {
    //     title,
    //     subtitle,
    //     description,
    //     audioMasterSrc: audioFile.name,
    //     audioStemsSrc: stems.name,
    //     albumArtSrc: image?.name || null,
    //   },
    //   image || null,
    //   audioFile,
    //   stems
    // );
    // if (trackPostId) {
    //   navigate(`/trackPosts/${trackPostId}`);
    // } else {
    //   console.log(trackPostId);
    // }
  };

  return (
    <div className="createPage">
      {toggleForm && (
        <div className="TrackPostCreateContainer">
          <div id="create-form-header">
            <h1>Edit Your Track!</h1>
            {/* <button id="close-form-button" onClick={handleEditForm}>
              <i className="fa-solid fa-arrow-left"></i>
            </button> */}
          </div>
          <p className="label">Title</p>
          <p className="descriptor">(Name the track headed for the shack!)</p>
          <div className="inputContainer">
            <textarea
              className="track-input"
              rows="2"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <p className="label">SubTitle</p>
          <p className="descriptor">(Let us know what your project needs!)</p>
          <div className="inputContainer">
            <textarea
              className="track-input"
              rows="2"
              id="subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>
          <p className="label">Description</p>
          <p className="descriptor">(Tell us about your project!)</p>
          <div className="inputContainer description">
            <textarea
              className="track-input"
              id="description"
              rows="4"
              
              value={description}
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
                them to evolve the project. Don&apos;t forget to include a
                version of the master too)
              </p>
            </div>
          </div>
          <div className="inputs">
            <div className="file-input-container">
              <div className="master">
                <label className="audio-label" htmlFor="audioFile">
                  <p>Upload Master</p>
                  <input
                    // value={audioFile}
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
                    // value={image}
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
                    // value={stems}
                    className="track-input-file"
                    type="file"
                    id="stems"
                    onChange={(e) => setStems(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
            <button
              id="create-track-button"
              type="submit"
              onClick={handleSubmit}
            >
              Post Track
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackPostEdit;
