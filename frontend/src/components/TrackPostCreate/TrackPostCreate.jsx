import { useState } from "react";
import "./TrackPostCreate.css";
import { createTrack } from "../../store/trackPost";
import { useDispatch, useSelector } from "react-redux";
import { useEffect} from "react";
import { useNavigate } from "react-router-dom";

const TrackPostCreate = () => {
  const currentUser = useSelector(state => state.session.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [title, setTitle] = useState("");
  const [subTitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [stems, setStems] = useState(null);
  const [image, setImage] = useState(null)
  const [errors, setErrors] = useState(null)



  // useEffect(() => {
  //   setAuthorId(currentUser.id)
  // }, [dispatch])
  
  // if(!currentUser) {
  //   navigate("/")
  // }

  const handleSubmit = () => {

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append('description', description);
    formData.append('audioFile', audioFile);
    formData.append('stems', stems);
    formData.append('image', image);


      let response = dispatch(createTrack(formData))
      if(response.ok) {
        console.log('creation successfull')
        //redirect to show page
      } else {
        console.log(response)
      }

}



  return (
    <div className="createPage">
      <div className="TrackPostCreateContainer">
        <h1>Create A New TRACK For Your SHACK</h1>
        <p className="label">Title</p>
        <p className="descriptor">
          (Name the track headed for the shack!)
        </p>
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
        <p className="descriptor">
          (Let us know what your project needs!)
        </p>
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
        <p className="descriptor">
          (Tell us about your project!)
        </p>
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
                Upload Master!
                <input
                  className="track-input file"
                  type="file"
                  id="audioFile"
                  onChange={(e) => setAudioFile(e.target.files[0])}
                />
              </label>
            </div>
          </div>
          <div className="file-input-container">
            <div className="image">
                <label htmlFor="image" className="audio-label">Upload Artwork!
                <input type="file" id="image" className="track-input file" onChange={e => setImage(e.target.files[0])} />
                </label>
            </div>
          </div>
          <div className="file-input-container">
            <div className="stems">
              <label className="audio-label" htmlFor="stems">
                Upload Stems!
                <input
                  className="track-input file"
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

export default TrackPostCreate;
