const buttonsConfig = {
  numbers: [
    { value: '1', id: 'one' },
    { value: '2', id: 'two' },
    { value: '3', id: 'three' },
    { value: '4', id: 'four' },
    { value: '5', id: 'five' },
    { value: '6', id: 'six' },
    { value: '7', id: 'seven' },
    { value: '8', id: 'eight' },
    { value: '9', id: 'nine' },
  ],
  operators: [
    { type: 'operator', value: '+', id: 'add' },
    { type: 'operator', value: '-', id: 'subtract' },
    { type: 'operator', value: '*', id: 'multiply' },
    { type: 'operator', value: '/', id: 'divide' },
    { type: 'operator', value: '=', id: 'equals', size: 'double' },
    { type: 'operator', value: 'AC', id: 'clear', size: 'double' },
  ],
  others: {
    zero: { value: '0', id: 'zero', size: 'double' },
    decimal: { value: '.', id: 'decimal' },
  },
};

export const initialState = () => ({
  cleared: true,
  board: '0',
  result: '0',
  showResult: false,
});

export default buttonsConfig;
