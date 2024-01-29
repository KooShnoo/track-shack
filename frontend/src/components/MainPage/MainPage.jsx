import audio_one from '../../../src/assets/audio/audio_one.wav';
import AudioPlayer from '../audio/audio';

function MainPage() {
  return (
    <>
      <p>Twitter Clone</p>
      <AudioPlayer src={audio_one} />

      <footer></footer>
    </>
  );
}

export default MainPage;
