import { useState, useImperativeHandle, useRef, forwardRef } from 'react';

async function playAudio(audioElement) {
  try {
    if (!audioElement.ended) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
    await audioElement.play();
  } catch (e) {
    console.error(e);
  }
}


function Drumpad({ audioSrc, id, text, changeDisplay }, ref) {
  const [isActive, setIsActive] = useState(false);
  const padRef = useRef();

  async function playAudioWithRef() {
    const audioElement = padRef.current;
    await playAudio(audioElement);
  }

  function toggleActiveDrumpad() {
    setIsActive(true);
    setTimeout(() => setIsActive(false), 300);
  }

  async function triggerDrumpad() {
    playAudioWithRef();
    toggleActiveDrumpad();
    changeDisplay();
  }

  useImperativeHandle(ref, () => ({ triggerDrumpad }));

  return (
    <figure
      className={`
        drum-pad
        ${ isActive ? "drum-pad--is-active" : ""}
      `}
      id={id}
      onClick={triggerDrumpad}
    >
      <audio
        className="clip"
        id={text}
        ref={padRef}
        src={audioSrc}
      />
      <span className="drum-pad__text">
        {text}
      </span>
    </figure>
  );
}

export default forwardRef(Drumpad);