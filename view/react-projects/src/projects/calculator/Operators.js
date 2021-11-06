import ButtonPad from './ButtonPad';

// Operators
const Operators = ({ buttons, setOperator, getResult, clearBoard }) => {
  function onButtonPadClicked(button) {
    if (button.id === 'equals') {
      getResult();
    } else if (button.id === 'clear') {
      clearBoard();
    } else {
      setOperator(button.value);
    }
  }

  return buttons.map((button, i) => {
    return (
      <ButtonPad
        size={button.size}
        value={button.value}
        key={`btn#${button.value}-${i}`}
        id={button.id}
        onClick={() => onButtonPadClicked(button)}
      />
    );
  });
};

export default Operators;
