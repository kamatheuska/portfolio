const Board = ({ expression }) => {
  return (
    <div className="board display" id="display">
      <span>{expression}</span>
    </div>
  );
};

export default Board;
