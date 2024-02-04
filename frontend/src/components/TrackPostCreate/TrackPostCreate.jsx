import { useState } from 'react';
import './TrackPostCreate.css';
import { useNavigate } from 'react-router-dom';
import { postTrack } from '../../store/trackPost';

const TrackPostCreate = ({onClose}) => {

  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [stems, setStems] = useState(null);
  const [image, setImage] = useState(null);
  const [toggleForm, setToggleForm] = useState(true);
  // const [errors, setErrors] = useState(null);
  const handleCreateForm = () => {
    setToggleForm(!toggleForm);
    if (!toggleForm) {
      setTitle('');
      setSubtitle('');
      setDescription('');
      setAudioFile(null);
      setStems(null);
      setImage(null);
    }
    onClose();
  };

  const handleSubmit = async () => {
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
  };

  return (
    <div className="createPage">
      {toggleForm && (
        <div className="TrackPostCreateContainer">
          <div id="create-form-header">
            <h1>Post a new Track!</h1>
            <button id="close-form-button" onClick={handleCreateForm}><i className="fa-solid fa-arrow-left"></i></button>
          </div>
          <p className="label">Title</p>
          <p className="descriptor">(Name the track headed for the shack!)</p>
          <div className="inputContainer">
            <textarea
              className="track-input"
              rows="2"
              cols="100"
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
              cols="100"
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
                them to evolve the project. Don&apos;t forget to include a version of
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
            <button id='create-track-button'type="submit" onClick={handleSubmit}>
              Create Track
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackPostCreate;
