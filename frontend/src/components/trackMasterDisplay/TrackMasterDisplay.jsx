import './trackMasterDisplay.css';
import FaceSmall from './Face_Small.jpg';

const TrackMasterDisplay = ({track}) => {
  return (
    <div>
      <div className="track-info-container">
        <div className="track-items">
          <div className="description-container">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Nesciunt, quos. Error, dolore eius sit cupiditate labore
              consequuntur omnis fugiat veritatis rem voluptatum numquam
              repellat. Itaque tempore voluptates, aspernatur dolore voluptas
              inventore deleniti aliquid ipsum atque fuga? Rem mollitia
              repudiandae expedita dolorem culpa minus ullam. Eveniet, quod!
              Debitis iusto maxime eaque assumenda modi fuga ducimus quo itaque
              laboriosam non obcaecati, accusamus in quia voluptatem
              perspiciatis eum facere minus iure provident nostrum quam
              distinctio error. Dolores sapiente vero quasi consectetur
              repudiandae! Quae veritatis vitae cupiditate. Vitae illum sint
              deleniti officia, sed nemo dicta excepturi ipsa eum porro sequi
              repellat vel aperiam odit!
            </p>
          </div>
          <div className="image-container">
            <img src={FaceSmall} alt="" />
          </div>
        </div>
        <div className="button-container">
          <button>Download</button>
        </div>
      </div>
    </div>
  );
};

export default TrackMasterDisplay;
