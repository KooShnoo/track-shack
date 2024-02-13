import { useEffect, useState } from "react";
import "../../TrackPostCreate/TrackPostCreate.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateTrack } from "../../../store/trackPost";

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
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (track) {
      setTitle(track.title);
      setSubtitle(track.subtitle);
      setDescription(track.description);
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

  const isFormComplete = () => title && subtitle && description

  const handleSubmit = async () => {
    if (!isFormComplete()) {
      setFormError(
        "Please complete the entire form before submitting!\
         Default artwork will be used if none is provided."
      );
      return;
    }
    setUploading(true);
    await updateTrack(
      {
        _id: trackId,
        title,
        subtitle,
        description,
        ...audioFile?.name && {audioMasterSrc: audioFile?.name},
        ...stems?.name && {audioStemsSrc: stems?.name},
        ...image?.name && {albumArtSrc: image?.name},
      },
      image || null,
      audioFile || null,
      stems || null
      );
      setUploading(false);
      navigate(`/`);
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
                  <p>Upload Updated Master</p>
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
                  <p>Upload Updated Artwork</p>
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
                  <p>Upload Updated Stems</p>
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
              disabled={uploading}
                id="create-track-button"
                type="submit"
                onClick={handleSubmit}
              >
                {uploading? "uploading..." : "Edit Track"}
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
