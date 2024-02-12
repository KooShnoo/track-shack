import { useEffect, useState } from "react";
import "../../TrackPostCreate/TrackPostCreate.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

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
  const [formError, setFormError] = useState("");
  const [imageError, setImageError] = useState("");
  const [audioFileError, setAudioFileError] = useState("");
  const navigate = useNavigate();

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

  const handleImageUpload = (file) => {
    const validImageTypes = ["img", "png", "jpg"];
    let type = file.name.split(".")[1];
    if (validImageTypes.includes(type)) {
      setImageError("");
      setImage(file);
    } else {
      setImageError("Please upload a valid image file type: img, png, jpg");
    }
  };

  const handleAudioUpload = (file) => {
    const validAudioTypes = ["wav", "mp3"];
    let split = file.name.split(".");
    let type = split[split.length - 1];
    if (validAudioTypes.includes(type)) {
      setAudioFileError("");
      setAudioFile(file);
    } else {
      setAudioFileError("Please upload a valid audio file type: mp3, wav");
    }
  };

  const isFormComplete = () => {
    if (
      title !== "" &&
      subtitle !== "" &&
      description !== "" &&
      audioFile !== null &&
      stems !== null
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = async () => {
    debugger;
    if (isFormComplete()) {
      debugger;
      //   await updateTrack(
      //     {
      //       title,
      //       subtitle,
      //       description,
      //       audioMasterSrc: audioFile.name,
      //       audioStemsSrc: stems.name,
      //       albumArtSrc: image?.name || null,
      //     },
      //     image || null,
      //     audioFile,
      //     stems
      //   );
      //     navigate(`/trackPosts/${trackId}`);
    } else {
      debugger;
      setFormError(
        "Please complete the entire form before submitting! Default artwork will be used if none is provided."
      );
    }
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
                <p className="error">{audioFileError}</p>
                <label className="audio-label" htmlFor="audioFile">
                  <p>Upload Master</p>
                  <input
                    // value={audioFile}
                    className="track-input-file"
                    type="file"
                    id="audioFile"
                    onChange={(e) => handleAudioUpload(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
            <div className="file-input-container">
              <div className="image">
                <p className="error">{imageError}</p>
                <label htmlFor="image" className="audio-label">
                  <p>Upload Artwork</p>
                  <input
                    // value={image}
                    type="file"
                    id="image"
                    className="track-input-file"
                    onChange={(e) => handleImageUpload(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
            <div className="file-input-container">
              <div className="stems">
                <p className="error"> </p>
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
            <div className="submit-container">
              <button
                id="create-track-button"
                type="submit"
                onClick={handleSubmit}
              >
                Create Track
              </button>
              <div className="submit-errors">
                <h2 className="edit-error">{formError}</h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackPostEdit;
