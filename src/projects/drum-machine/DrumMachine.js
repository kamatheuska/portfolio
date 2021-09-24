import { useState, createRef } from 'react';

import { useEventListener } from 'utils/events';
import Cuboid from 'components/Cuboid';

import Drumpad from './Drumpad';
import allPads from './pads';


export default function DrumMachine() {
  const [displayText, setDisplayText] = useState('...');

  const pads = allPads.map(({ text, audioSrc, id, displayName }, i) => {
    const padRef = createRef();
    const triggerDrumpad = () => padRef.current.triggerDrumpad();

    return {
      key: text.toLowerCase(),
      element: (
        <Drumpad
          audioSrc={audioSrc}
          id={id}
          key={`drumpad-${i}`}
          changeDisplay={() => setDisplayText(displayName)}
          ref={padRef}
          text={text}
        />
      ),
      triggerDrumpad,
    }
  });

  const padElements = pads.map(pad => pad.element)

  useEventListener('keydown', ({ key }) => {
    const matchPadByKey = pads.find(pad => pad.key === key);

    if (matchPadByKey) {
      matchPadByKey.triggerDrumpad();
    }
  });

  return (
    <div className="drum-machine">
      <div className="centered-layout">
        <header>
          <h1 className="title is-1" >Drum Machine</h1>
        </header>
        <Cuboid>
          <div className="drum-machine__box" id="drum-machine">
            <div className="drum-machine__drum-pads">
              { padElements }
            </div>
            <div className="drum-machine__display" id="display">
              <div>
                <span>{ displayText }</span>
              </div>
            </div>
          </div>
        </Cuboid>
      </div>
    </div>
  );
}