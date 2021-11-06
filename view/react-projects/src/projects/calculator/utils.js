/* eslint no-eval: 0 */

export const isNum = (n) => /\d+/.test(n);
export const isOperator = (n) => /[+,-,*,/,=](?!\d)/.test(n) || n === 'AC';
export const hasRepeatedZero = (term, newArg) => term === '0' && newArg === '0';
export const hasRepeatedDecimal = (term, newArg) =>
  newArg === '.' && term.match(/\./);
export const getLastTerm = (board) => board.split(' ').slice(-1)[0];
export const sliceLastTerm = (board) => board.split(' ').slice(0, -1)[0];
export const hasTermsWithRepeatedZero = ({ firstTerm, secondTerm }, newArg) => {
  return secondTerm
    ? hasRepeatedZero(secondTerm, newArg)
    : firstTerm
    ? hasRepeatedZero(secondTerm, newArg)
    : false;
};

export const hasRepeatedDecimalPoint = ({ firstTerm, secondTerm }, newArg) => {
  return secondTerm
    ? hasRepeatedDecimal(secondTerm, newArg)
    : firstTerm
    ? newArg && hasRepeatedDecimal(firstTerm, newArg)
    : false;
};

export const generateBoard = (value, board, hasMultipleOperations = false) => {
  const isLastCharOperator = isOperator(board.slice(-1));
  const isValueOperator = isOperator(value);

  if (isLastCharOperator && isValueOperator) return board;
  if (isLastCharOperator || isValueOperator) return `${board} ${value}`;

  return `${board}${value}`;
};

export const evaluate = eval;
