import { Component } from 'react';
import Board from './Board';
import buttonsConfig, { initialState } from './config';
import Numpad from './Numpad';
import Operators from './Operators';
import {
  evaluate,
  generateBoard,
  getLastTerm,
  hasRepeatedDecimal,
  hasRepeatedZero,
  isOperator,
  sliceLastTerm,
} from './utils';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, initialState());
    this.getResult = this.getResult.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.setBoardValue = this.setBoardValue.bind(this);
    this.setDecimalValue = this.setDecimalValue.bind(this);
    this.setZero = this.setZero.bind(this);
    this.setOperator = this.setOperator.bind(this);
  }

  getResult() {
    this.setState((prevState) => {
      const result = '' + evaluate(prevState.board);
      debugger; // eslint-disable-line
      return {
        ...prevState,
        board: result,
        showResult: true,
        result,
      };
    });
  }

  clearBoard() {
    this.setState(() => Object.assign({}, initialState()));
  }

  setBoardValue(value) {
    this.setState((prevState) => ({
      ...prevState,
      cleared: false,
      showResult: false,
      board: generateBoard(value, prevState.cleared ? '' : prevState.board),
    }));
  }
  setZero() {
    this.setState((prevState) => {
      const lastTerm = getLastTerm(prevState.board);
      if (hasRepeatedZero(lastTerm, '0')) return prevState;
      return {
        ...prevState,
        showResult: false,
        board: generateBoard('0', prevState.board),
      };
    });
  }
  setOperator(operator) {
    this.setState((prevState) => {
      let board = prevState.board;
      const lastTerm = getLastTerm(board);
      if (isOperator(lastTerm)) {
        board =
          operator === '-'
            ? generateBoard(
                `${lastTerm}${operator}`,
                sliceLastTerm(board),
                true
              )
            : generateBoard(operator, sliceLastTerm(board));
      } else {
        board = generateBoard(operator, board);
      }
      return {
        ...prevState,
        board,
        showResult: false,
      };
    });
  }

  setDecimalValue() {
    this.setState((prevState) => {
      const lastTerm = getLastTerm(prevState.board);
      if (hasRepeatedDecimal(lastTerm, '.')) return prevState;
      return {
        ...prevState,
        showResult: false,
        board: generateBoard('.', prevState.board),
      };
    });
  }

  render() {
    const { result, showResult, board } = this.state;
    return (
      <div className="calculator">
        <header>
          <h1 className="title is-1 is-size-5-mobile">Calculator</h1>
        </header>
        <div className="calculator__container">
          <Board expression={showResult ? result : board} />
          <div className="calculator__grid">
            <Operators
              setOperator={this.setOperator}
              getResult={this.getResult}
              clearBoard={this.clearBoard}
              buttons={buttonsConfig.operators}
            />
            <Numpad
              setBoardValue={this.setBoardValue}
              setDecimalValue={this.setDecimalValue}
              setZero={this.setZero}
              digits={buttonsConfig.numbers}
              zero={buttonsConfig.others.zero}
              decimal={buttonsConfig.others.decimal}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
