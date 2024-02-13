import { useState } from "react";
import "./TrackPostCreate.css";
import { useNavigate } from "react-router-dom";
import { postTrack } from "../../store/trackPost";

const TrackPostCreate = ({ onClose }) => {
  const navigate = useNavigate();

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
  const [uploading, setUploading] = useState(false);
  const handleCreateForm = () => {
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
    if (file.type.match('image.*')) {
      setImageError("");
      setImage(file);
    } else {
      setImageError("Please upload a valid image file type, such as img, png, jpg");
    }
  };

  const handleAudioUpload = (file) => {
    if (file.type.match('audio.*')) {
      setAudioFileError("");
      setAudioFile(file);
    } else {
      setAudioFileError("Please upload a valid audio file type, such as mp3 or wav");
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
    if (isFormComplete()) {
      setUploading(true);
      let trackPostId = await postTrack(
        {
          title,
          subtitle,
          description,
          audioMasterSrc: audioFile.name,
          audioStemsSrc: stems.name,
          albumArtSrc: image?.name || null,
        },
        image || null,
        audioFile,
        stems
      );

      if (trackPostId) {
        navigate(`/trackPosts/${trackPostId}`);
      } else {
        console.log(trackPostId);
      }
      setUploading(false);
    } else {
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
            <h1>Post a new Track!</h1>
            <button id="close-form-button" onClick={handleCreateForm}>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
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
            <div className="submit-container">
              <button
                disabled={uploading}
                id="create-track-button"
                type="submit"
                onClick={handleSubmit}
              >
                {uploading? "uploading..." : "Create Track"}
              </button>
              <div className="submit-errors">
                <h2 className="error">{formError}</h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackPostCreate;
