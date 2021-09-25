import ButtonPad from './ButtonPad';

const Numpad = ({
  digits,
  zero,
  decimal,
  setBoardValue,
  setDecimalValue,
  setZero,
}) => {
  let numButtons = digits.map((button, i) => (
    <ButtonPad
      onClick={() => setBoardValue(button.value)}
      size={button.size}
      value={button.value}
      id={button.id}
      key={`btn#${button.value}-${i}`}
    />
  ));
  return (
    <div className="numpad">
      {numButtons}
      <ButtonPad
        onClick={() => setZero()}
        size={zero.size}
        value={zero.value}
        id={zero.id}
      />
      <ButtonPad
        onClick={() => setDecimalValue()}
        size={decimal.size}
        value={decimal.value}
        id={decimal.id}
      />
    </div>
  );
};

export default Numpad;
