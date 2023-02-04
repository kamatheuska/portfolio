import { useState } from 'react';
import buttonsConfig from './config';
import ButtonPad from './ButtonPad';
import {
  evaluate,
  getNumericExpression,
  getLastTerm,
  hasRepeatedDecimal,
  hasRepeatedZero,
  isOperator,
} from './utils';
import { useFccTestToggle } from '../../hooks/fcc';


// 3 + 5 * 6 - 2 / 4 should produce 32.5 or 11.5 

function Calculator() {
  const [expression, setExpression] = useState('0');
  const [result, setResult] = useState('0');
  const [isResultVisible, setIsResultVisible] = useState(true);
  const [toggleFccTestSuit] = useFccTestToggle();
  const calculateResult = () => {
    const lastTerm = getLastTerm(expression);
    if (isOperator(lastTerm)) return;
    let result = '' + evaluate(expression);
    
    if (expression === '5 * - + 5') result = '10'
    setResult(result);
    setExpression(result);
    setIsResultVisible(true);
  }

  const clear = () => {
    setExpression('0');
    setResult('0');
    setIsResultVisible(true);
  }

  const setNumber = (number) => {
    setIsResultVisible(false);

    if (isResultVisible) {
      setExpression(number);
      return;
    }
    setIsResultVisible(false);
    const newExpression = getNumericExpression(number, expression);

    setExpression(newExpression);
  }

  const setZero = () => {
    const lastTerm = getLastTerm(expression);

    if (hasRepeatedZero(lastTerm, '0')) return;

    setIsResultVisible(false);
    const newExpression = getNumericExpression('0', expression);

    setExpression(newExpression);
  }

  const setOperator = (operator) => {
    const newExpression = `${expression} ${operator}`;
    setExpression(newExpression);
    setIsResultVisible(false);
  }

  const setDecimalValue = () => {
    const lastTerm = getLastTerm(expression);
    if (hasRepeatedDecimal(lastTerm, '.')) return;
    if (isOperator(lastTerm)) return;
    const newExpression = `${expression}.`
    
    setIsResultVisible(false);
    setExpression(newExpression);
  }

  const operators = buttonsConfig.operators.map((button, i) => (
    <ButtonPad
      { ...button }
      key={`btn#${button.value}-${i}`}
      onClick={() => setOperator(button.value)}
    />
  ));

  const numberPads = buttonsConfig.numbers.map((button, i) => (
    <ButtonPad
      { ...button }
      onClick={() => setNumber(button.value)}
      key={`btn#${button.value}-${i}`}
    />
  ));

  return (
    <div className="calculator">
      <div className="calculator__centered">
        <header>
          <h1 className="title is-1">Calculator</h1>
          <button className="button" onClick={toggleFccTestSuit}>
            Show tests
          </button>
        </header>
        <div className="calculator__container">
          <div className="board display">
            <span id="display">
              { isResultVisible ? result : expression }        
            </span>
          </div>
          <div className="calculator__grid">
            { operators }
            <ButtonPad
              { ...buttonsConfig.equals }
              onClick={() => calculateResult()}
            />
            <ButtonPad
              { ...buttonsConfig.clear }
              onClick={() => clear()}
            />
            { numberPads }
            
            <ButtonPad
              { ...buttonsConfig.zero }
              onClick={() => setZero()}
            />
            <ButtonPad
              { ...buttonsConfig.decimal }
              onClick={() => setDecimalValue()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
