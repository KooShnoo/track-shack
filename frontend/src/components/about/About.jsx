import "./about.css";

const About = () => {
  return (
    <div className="splash-base">
      <div className="splash-container-about">
        <div className="right-container-about">
          <div className="about-info-container">
            <h1 id="about-header">THEshackers</h1>
            <div className="info-container">
              <div className="title-bio-container">
                <h1>David Maine: Project Manager</h1>
                <p>
                  David Maine is a software developer, Musician, Massage
                  Therapist, and cat lover.{" "}
                </p>
                <div className="links-container">
                  {/* <p>Links:</p> */}
                  <a href="https://github.com/David-Maine-Floated"><i id="github-icon" className="fa-brands fa-github"></i></a>
                  <a href="https://www.linkedin.com/in/david-maine-548886b2/">
                    <i id="linkedin-icon" className="fa-brands fa-linkedin"></i>
                  </a>
                </div>
              </div>
              <div className="img-container">
                <img src="/aboutPageAssets/David2.jpeg" alt="photo" />
              </div>
            </div>
            <div id="item-spacer"></div>
            <div className="info-container">
              <div className="title-bio-container">
                <h1>Cole Manel: Flex Engineer</h1>
                <p>
                Cole worked closely with both frontend and backend engineers to
                create responsive components that are both easy to use and
                styled well.{" "}
                </p>
                <div className="links-container">
                  {/* <p>Links:</p> */}
                  <a href="https://github.com/csmanel"><i id="github-icon" className="fa-brands fa-github"></i></a>
                  <a href="https://www.linkedin.com/in/cole-manel-93029327a/">
                    <i id="linkedin-icon" className="fa-brands fa-linkedin"></i>
                  </a>
                </div>
              </div>
              <div className="img-container">
                <img src="/aboutPageAssets/Cole.jpeg" alt="photo" />
              </div>
            </div>
            <div id="item-spacer"></div>
            <div className="info-container">
              <div className="title-bio-container">
                <h1>Ishan Chawla: Lead Backend Engineer</h1>
                <p>
                  David Maine is a software developer, Musician, Massage
                  Therapist, and cat lover.{" "}
                </p>
                <div className="links-container">
                  {/* <p>Links:</p> */}
                  <a href="https://github.com/KooShnoo/track-shack"><i id="github-icon" className="fa-brands fa-github"></i></a>
                  <a href="https://www.linkedin.com/in/ishan-chawla/"><i id="linkedin-icon" className="fa-brands fa-linkedin"></i></a>
                </div>
              </div>
              <div className="img-container">
                <img
                  src="/aboutPageAssets/Ishan.jpeg"
                  alt="photo"
                />
              </div>
            </div>
            <div id="item-spacer"></div>
            <div className="info-container">
              <div className="title-bio-container">
                <h1>Jake Tabor: Lead Frontend Engineer</h1>
                <p>
                  As Frontend Lead, Jake worked with the other roles to ensure that application functionality promoted 
                  a good user experience and that application styling maintained a consistent and professional apperance.  
                  {" "}
                </p>
                <div className="links-container">
                  {/* <p>Links:</p> */}
                  <a href="https://github.com/jtabor214"><i id="github-icon" className="fa-brands fa-github"></i></a>
                  <a href="https://www.linkedin.com/in/jake-tabor-8913922b3/">
                    <i id="linkedin-icon" className="fa-brands fa-linkedin"></i>
                  </a>
                </div>
              </div>
              <div className="img-container">
                <img
                  src="/aboutPageAssets/Jake.jpeg"
                  alt="photo"
                />
              </div>
            </div>
            <div id="footer-spacer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
