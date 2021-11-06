const ButtonPad = ({ size = 'single', value = 'number', onClick, id }) => {
  return (
    <div onClick={onClick} className={`button-pad button-pad--${size}`} id={id}>
      <span>{value}</span>
    </div>
  );
};

export default ButtonPad;
