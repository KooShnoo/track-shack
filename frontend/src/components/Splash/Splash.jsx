import { useEffect, useState } from 'react';
import TrackPostCreate from '../TrackPostCreate/TrackPostCreate';
import TrackPostsIndex from '../TrackIndex/TrackPostsIndex';
import './Splash.css';
import { useDispatch } from 'react-redux';
import { getTracks } from '../../store/trackPost';

const SplashPage = () => {
  const [toggleForm, setToggleForm] = useState(false);
  const dispatch = useDispatch()
  const handleCreateForm = () => { 
    setToggleForm(!toggleForm);
  };

  useEffect(() => {
    dispatch(getTracks())
  },[dispatch])

  return (
    <div className="splash-base">
      <div className="splash-container">
        <div className="left-container">
          <form id="search-container" action="" /* onSubmit={handleSearch} */>
            <input
              id="search-bar"
              placeholder="Search for genres or instruments"
              /*value={query} 
              onChange={(e) => setQuery(e.target.value)}*/
            ></input>
            <button id="search-button" type="submit">
              <i
                className="fa-solid fa-magnifying-glass"
                style={{ color: '#dadde2' }}
              ></i>
            </button>
          </form>
          <div className='user-options-container'>
            <div>
              <button id="create-form-button" onClick={handleCreateForm}>
                Post a Track
              </button>
            </div>
          </div>
          <div className="feed-container">
            {<TrackPostsIndex />}
          </div>
        </div>
        <div className="right-container">
          {toggleForm && <TrackPostCreate />}
        </div>
      </div>
    </div>
  );
};

export default SplashPage;