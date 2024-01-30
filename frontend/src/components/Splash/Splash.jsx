import './Splash.css';

const SplashPage = () => {
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
          <div className="feed-container">
            <p>The index list of posts will go here</p>
          </div>
        </div>
        <div className="right-container">
          <p>trending posts will go here?</p>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
